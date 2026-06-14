const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

const DEFAULT_ALBUM_ID = 'glimmer-boundaries';
const DEFAULT_TRACK_IDS = Array.from({ length: 20 }, (_, index) => String(index + 1));

function send(response, statusCode, payload) {
  response.writeHead(statusCode, JSON_HEADERS);
  response.end(JSON.stringify(payload));
}

function getRedisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { token, url: url.replace(/\/$/, '') } : null;
}

async function redisRequest(config, path) {
  const redisResponse = await fetch(`${config.url}${path}`, {
    headers: {
      authorization: `Bearer ${config.token}`,
    },
  });

  if (!redisResponse.ok) {
    throw new Error(`Redis request failed: ${redisResponse.status}`);
  }

  return redisResponse.json();
}

function sanitizeAlbumId(albumId) {
  const normalized = String(albumId || DEFAULT_ALBUM_ID).trim().toLowerCase();
  return normalized.replace(/[^a-z0-9-]/g, '-') || DEFAULT_ALBUM_ID;
}

function normalizeTrackIds(trackIds) {
  const requestedTrackIds = typeof trackIds === 'string' ? trackIds.split(',') : trackIds;
  const ids = Array.isArray(requestedTrackIds) && requestedTrackIds.length > 0 ? requestedTrackIds : DEFAULT_TRACK_IDS;
  return [...new Set(ids.map((trackId) => String(trackId)).filter((trackId) => /^\d{1,3}$/.test(trackId)))];
}

function getStatsKeyPrefix(albumId) {
  const safeAlbumId = sanitizeAlbumId(albumId);
  return safeAlbumId === DEFAULT_ALBUM_ID ? 'glimmer' : `glimmer:${safeAlbumId}`;
}

async function getStats(config, albumId, trackIds) {
  const keyPrefix = getStatsKeyPrefix(albumId);
  const normalizedTrackIds = normalizeTrackIds(trackIds);
  const visitsResult = await redisRequest(config, `/get/${keyPrefix}:visits`);
  const trackResults = await Promise.all(
    normalizedTrackIds.map((trackId) => redisRequest(config, `/get/${keyPrefix}:track:${trackId}`))
  );

  return {
    configured: true,
    visits: Number(visitsResult.result || 0),
    tracks: Object.fromEntries(
      normalizedTrackIds.map((trackId, index) => [trackId, Number(trackResults[index].result || 0)])
    ),
  };
}

async function incrementVisit(config, albumId, trackIds) {
  const keyPrefix = getStatsKeyPrefix(albumId);
  await redisRequest(config, `/incr/${keyPrefix}:visits`);
  return getStats(config, albumId, trackIds);
}

async function incrementTrack(config, albumId, trackId, trackIds) {
  const normalizedTrackIds = normalizeTrackIds(trackIds);
  if (!normalizedTrackIds.includes(String(trackId))) {
    return { error: 'Invalid trackId' };
  }

  const keyPrefix = getStatsKeyPrefix(albumId);
  await redisRequest(config, `/incr/${keyPrefix}:track:${trackId}`);
  return getStats(config, albumId, normalizedTrackIds);
}

function readBody(request) {
  if (!request.body) return {};
  if (typeof request.body === 'string') {
  try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }
  return request.body;
}

export default async function handler(request, response) {
  const config = getRedisConfig();
  if (!config) {
    return send(response, 200, {
      configured: false,
      message: 'KV_REST_API_URL/KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN are not configured.',
    });
  }

    try {
    if (request.method === 'GET') {
      return send(response, 200, await getStats(config, request.query?.albumId, request.query?.trackIds));
    }

    if (request.method !== 'POST') {
      return send(response, 405, { error: 'Method not allowed' });
    }

    const body = readBody(request);
    if (body.event === 'visit') {
      return send(response, 200, await incrementVisit(config, body.albumId, body.trackIds));
    }

    if (body.event === 'play') {
      const result = await incrementTrack(config, body.albumId, body.trackId, body.trackIds);
      return send(response, result.error ? 400 : 200, result);
    }

    return send(response, 400, { error: 'Invalid event' });
  } catch (error) {
    return send(response, 500, {
      configured: true,
      error: 'Stats service unavailable',
    });
  }
}
