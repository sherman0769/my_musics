const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

const TRACK_IDS = Array.from({ length: 14 }, (_, index) => String(index + 1));

function send(response, statusCode, payload) {
  response.writeHead(statusCode, JSON_HEADERS);
  response.end(JSON.stringify(payload));
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
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

async function getStats(config) {
  const visitsResult = await redisRequest(config, '/get/glimmer:visits');
  const trackResults = await Promise.all(
    TRACK_IDS.map((trackId) => redisRequest(config, `/get/glimmer:track:${trackId}`))
  );

  return {
    configured: true,
    visits: Number(visitsResult.result || 0),
    tracks: Object.fromEntries(
      TRACK_IDS.map((trackId, index) => [trackId, Number(trackResults[index].result || 0)])
    ),
  };
}

async function incrementVisit(config) {
  await redisRequest(config, '/incr/glimmer:visits');
  return getStats(config);
}

async function incrementTrack(config, trackId) {
  if (!TRACK_IDS.includes(String(trackId))) {
    return { error: 'Invalid trackId' };
  }

  await redisRequest(config, `/incr/glimmer:track:${trackId}`);
  return getStats(config);
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
      message: 'UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not configured.',
    });
  }

  try {
    if (request.method === 'GET') {
      return send(response, 200, await getStats(config));
    }

    if (request.method !== 'POST') {
      return send(response, 405, { error: 'Method not allowed' });
    }

    const body = readBody(request);
    if (body.event === 'visit') {
      return send(response, 200, await incrementVisit(config));
    }

    if (body.event === 'play') {
      const result = await incrementTrack(config, body.trackId);
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
