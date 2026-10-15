const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

function inside(root, relative) {
  assert(typeof relative === 'string' && relative.length > 0 && !path.isAbsolute(relative), 'Expected relative asset path');
  const resolved = path.resolve(root, relative), rel = path.relative(root, resolved);
  assert(rel !== '' && rel !== '..' && !rel.startsWith(`..${path.sep}`) && !path.isAbsolute(rel), `Path outside root: ${relative}`);
  return resolved;
}

function unique(items, key, label) {
  const ids = items.map(key);
  assert(ids.every(Boolean) && new Set(ids).size === ids.length, `Missing or duplicate ${label}`);
}

function loadAlbum(root, albumId, albums = require(path.join(root, 'albumData.js')).albumsData) {
  assert(Array.isArray(albums) && albums.length > 0, 'Album library missing');
  unique(albums, (a) => a.id, 'album ID');
  const album = albums.find((a) => a.id === albumId);
  assert(album && Array.isArray(album.tracks) && album.tracks.length > 0, `Album missing or empty: ${albumId}`);
  unique(album.tracks, (t) => String(t.id ?? ''), 'site track ID');
  unique(album.tracks, (t) => t.audioSrc, 'site audio path');
  return { album, albumCount: albums.length };
}

function decodeAudio(file) {
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', file], { encoding: 'utf8', shell: false });
  assert(!probe.error && probe.status === 0, `FFprobe failed: ${probe.error?.message || probe.stderr}`);
  const spec = JSON.parse(probe.stdout), stream = spec.streams?.find((s) => s.codec_type === 'audio');
  const duration = Number(spec.format?.duration);
  assert(stream && Number.isFinite(duration) && duration > 0, `Invalid audio: ${file}`);
  const dec = spawnSync('ffmpeg', ['-v', 'error', '-xerror', '-i', file, '-vn', '-progress', 'pipe:1', '-f', 'null', '-'], { encoding: 'utf8', shell: false });
  assert(!dec.error && dec.status === 0, `FFmpeg decode failed: ${dec.error?.message || dec.stderr}`);
  const decodedSeconds = Number([...dec.stdout.matchAll(/out_time_us=(\d+)/g)].at(-1)?.[1]) / 1e6;
  assert(dec.stdout.includes('progress=end') && Number.isFinite(decodedSeconds) && Math.abs(duration - decodedSeconds) <= 0.15, `Audio did not decode to ending: ${file}`);
  return { duration, decodedSeconds, codec: stream.codec_name, fullDecodeExit: dec.status };
}

function verifyRelease({ root, albumId, albums }) {
  const { album, albumCount } = loadAlbum(root, albumId, albums);
  const albumDir = inside(root, `albums/${albumId}`), ledger = readJson(path.join(albumDir, 'album.json'));
  assert(ledger.id === albumId && Array.isArray(ledger.tracks) && ledger.tracks.length === album.tracks.length, 'Ledger/site album or track count mismatch');
  unique(ledger.tracks, (t) => String(Number(t.id)), 'ledger track ID');
  // Match by stable track ID, never by array position or the first download entry.
  const rows = album.tracks.map((t) => {
    const source = ledger.tracks.find((entry) => Number(entry.id) === Number(t.id));
    assert(source && source.title === t.title, `Ledger track/title mismatch: ${t.id}`);
    assert(source.selectedResult, `Selected provider result missing: ${t.id}`);
    const downloads = source.downloads?.filter((d) => d.providerId === source.selectedResult) || [];
    assert(downloads.length === 1, `Selected download missing or ambiguous: ${t.id}`);
    const d = downloads[0], provider = source.providerResults?.find((p) => p.id === d.providerId);
    assert(provider?.url && provider.url === t.sourceUrl, `Provider URL mismatch: ${t.id}`);
    assert(t.lyrics?.trim() && t.story?.trim(), `Missing lyrics/story: ${t.id}`);
    assert(/^[a-f0-9]{64}$/.test(d.sha256) && t.sha256 === d.sha256, `Manifest SHA mismatch: ${t.id}`);
    assert(d.fullDecodeExit === 0 && Number.isFinite(d.duration) && d.duration > 0 && Number.isFinite(d.decodedSeconds) && Math.abs(d.duration - d.decodedSeconds) <= 0.15, `Historical decode evidence incomplete: ${t.id}`);
    const published = fs.readFileSync(inside(root, t.audioSrc)), archived = fs.readFileSync(inside(albumDir, d.path));
    assert(published.length === d.bytes && archived.length === d.bytes && sha256(published) === d.sha256 && sha256(archived) === d.sha256, `Audio integrity mismatch: ${t.id}`);
    const decoded = decodeAudio(inside(root, t.audioSrc));
    assert(Math.abs(decoded.duration - d.duration) <= 0.15, `Current duration differs from ledger: ${t.id}`);
    return { id: t.id, title: t.title, path: t.audioSrc, archivedPath: d.path, bytes: published.length, sha256: d.sha256, browserDownloadFinalized: d.browserDownloadFinalized === true, ...decoded };
  });
  return { verifiedAt: new Date().toISOString(), scope: 'local_release', status: 'passed', albumId, album: album.albumTitle, artist: album.artist, albumCount, trackCount: rows.length, totalSeconds: rows.reduce((n, t) => n + t.duration, 0), totalAudioBytes: rows.reduce((n, t) => n + t.bytes, 0), archivedAndPublishedCopiesHashMatched: true, fullDecodePerformedThisRun: true, allAudioFullDecodePassed: true, browserDownloadFinalized: rows.every((t) => t.browserDownloadFinalized), publicVerification: 'not_run', listeningAcceptance: 'not_run', tracks: rows };
}

function parseArgs(args, needsBase = false) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output') {
      assert(!result.output && args[i + 1] && !args[i + 1].startsWith('--'), 'Usage: --output NEW_REPORT_PATH');
      result.output = path.resolve(args[++i]);
      assert(!fs.existsSync(result.output), `Refusing to overwrite existing report: ${result.output}`);
    } else if (needsBase && !result.base && !args[i].startsWith('--')) {
      result.base = new URL(args[i]).href;
      assert(['http:', 'https:'].includes(new URL(result.base).protocol), 'Expected HTTP(S) base URL');
    } else throw new Error(`Unexpected argument: ${args[i]}`);
  }
  assert(!needsBase || result.base, 'Public base URL required');
  return result;
}

function emitReport(report, output) {
  if (output) fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, { flag: 'wx' });
  console.log(JSON.stringify({ ...report, tracks: report.tracks.length, ...(output ? { reportPath: output } : {}) }, null, 2));
}

function runReleaseCli(albumDir) {
  try {
    const { output } = parseArgs(process.argv.slice(2));
    emitReport(verifyRelease({ root: path.resolve(albumDir, '../..'), albumId: path.basename(albumDir) }), output);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}

async function verifyPublicRelease({ root, albumId, base }) {
  const { album, albumCount } = loadAlbum(root, albumId), rows = [];
  const get = (relative, options) => fetch(new URL(relative, base), { ...options, signal: AbortSignal.timeout(30000) });
  for (let i = 0; i < album.tracks.length; i += 3) {
    rows.push(...await Promise.all(album.tracks.slice(i, i + 3).map(async (t) => {
      const response = await get(t.audioSrc), bytes = Buffer.from(await response.arrayBuffer());
      assert(response.ok && sha256(bytes) === t.sha256, `Public audio HTTP/SHA mismatch: ${t.id}`);
      return { id: t.id, status: response.status, bytes: bytes.length, sha256: sha256(bytes) };
    })));
  }
  const range = await get(album.tracks.at(-1).audioSrc, { headers: { Range: 'bytes=100000-100999' } });
  assert(range.status === 206 && (await range.arrayBuffer()).byteLength === 1000 && /^bytes 100000-100999\/\d+$/.test(range.headers.get('content-range') || ''), 'Range/seek response failed');
  const script = { 'slow-days': 'slowDaysAlbum.js', 'city-lights': 'cityLightsAlbum.js' }[albumId];
  assert(script && album.downloadPage, 'Public release paths missing');
  const pages = [];
  for (const relative of [album.downloadPage, script, 'index.html', 'app.js', 'albumData.js', 'sw.js', album.coverImage]) {
    const response = await get(relative), bytes = Buffer.from(await response.arrayBuffer());
    assert(response.ok && sha256(bytes) === sha256(fs.readFileSync(inside(root, relative))), `Public file differs from local: ${relative}`);
    pages.push({ path: relative, status: response.status, sha256: sha256(bytes) });
  }
  const zipPath = `assets/audio/${albumId}/${albumId}-album.zip`, zip = await get(zipPath, { method: 'HEAD' });
  const zipBytes = fs.statSync(inside(root, zipPath)).size;
  assert(zip.ok && Number(zip.headers.get('content-length')) === zipBytes, 'ZIP size mismatch');
  const privateCheck = await get(`albums/${albumId}/album.json`);
  assert(privateCheck.status === 404, 'Internal ledger exposed');
  return { verifiedAt: new Date().toISOString(), status: 'passed', scope: 'public_http', base, albumId, albumCount, tracks: rows, pages, range206: true, zip: { status: zip.status, bytes: zipBytes, verification: 'HEAD_size_only' }, internalLedger404: true, browserPlayback: 'not_run', listeningAcceptance: 'not_run' };
}

async function runPublicCli(albumDir) {
  try {
    const { output, base } = parseArgs(process.argv.slice(2), true);
    emitReport(await verifyPublicRelease({ root: path.resolve(albumDir, '../..'), albumId: path.basename(albumDir), base }), output);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = { verifyRelease, verifyPublicRelease, decodeAudio, emitReport, parseArgs, runReleaseCli, runPublicCli };
