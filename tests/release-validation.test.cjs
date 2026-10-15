const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const http = require('node:http');
const { spawnSync } = require('node:child_process');
const helper = path.resolve(__dirname, '../scripts/lib/release-validation.cjs');
const { verifyRelease, verifyPublicRelease, emitReport } = require(helper);

function fixture(t) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const root = fs.mkdtempSync(path.join(tempRoot, 'my-musics-verifier-'));
  t.after(() => {
    // Delete only this test's freshly created fixture under the resolved temp root.
    assert.equal(path.dirname(root), tempRoot);
    assert.ok(path.basename(root).startsWith('my-musics-verifier-'));
    fs.rmSync(root, { recursive: true });
  });
  const write = (rel, bytes) => { const file = path.join(root, rel); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, bytes); };
  // Isolate fixtures from any module-type configuration in the user's home.
  write('package.json', JSON.stringify({ private: true, type: 'commonjs' }));
  const pcm = Buffer.alloc(4000), header = Buffer.alloc(44);
  header.write('RIFF'); header.writeUInt32LE(36 + pcm.length, 4); header.write('WAVEfmt ', 8);
  header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
  header.writeUInt32LE(8000, 24); header.writeUInt32LE(16000, 28); header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34); header.write('data', 36); header.writeUInt32LE(pcm.length, 40);
  const audio = Buffer.concat([header, pcm]), sha = crypto.createHash('sha256').update(audio).digest('hex');
  const tracks = [1, 2].map((id) => ({ id, title: `test ${id}`, audioSrc: `assets/audio/slow-days/track0${id}.wav`, lyrics: 'test lyrics', story: 'test story', sourceUrl: `https://example.invalid/song/${id}`, sha256: sha }));
  const album = { id: 'slow-days', albumTitle: 'fixture', artist: 'fixture', coverImage: 'cover.png', downloadPage: 'slow-days-downloads.html', tracks };
  const albums = [{ id: 'first' }, { id: 'second' }, album, { id: 'fourth' }];
  const ledger = { id: 'slow-days', tracks: tracks.map((track) => ({ id: String(track.id).padStart(2, '0'), title: track.title, selectedResult: `selected-${track.id}`, providerResults: [{ id: `selected-${track.id}`, url: track.sourceUrl }], downloads: [{ providerId: `selected-${track.id}`, path: `downloads/${track.id}.wav`, bytes: audio.length, sha256: sha, duration: 0.25, decodedSeconds: 0.25, fullDecodeExit: 0, browserDownloadFinalized: false }] })) };
  for (const track of tracks) { write(track.audioSrc, audio); write(`albums/slow-days/downloads/${track.id}.wav`, audio); }
  const save = () => write('albums/slow-days/album.json', JSON.stringify(ledger));
  save(); write('albumData.js', `module.exports = ${JSON.stringify({ albumsData: albums })};`);
  write('albums/slow-days/verify-release.cjs', `require(${JSON.stringify(helper)}).runReleaseCli(__dirname);`);
  for (const rel of ['slow-days-downloads.html', 'slowDaysAlbum.js', 'index.html', 'app.js', 'sw.js', 'cover.png', 'assets/audio/slow-days/slow-days-album.zip']) write(rel, 'fixture bytes');
  return { root, albums, album, ledger, audio, write, save, verify: () => verifyRelease({ root, albumId: 'slow-days', albums }) };
}

test('four albums pass fresh decode; an additional fifth album also passes', (t) => {
  const f = fixture(t);
  assert.equal(f.verify().albumCount, 4);
  f.albums.push({ id: 'fifth' });
  const report = f.verify();
  assert.equal(report.albumCount, 5);
  assert.equal(report.trackCount, 2);
  assert.equal(report.fullDecodePerformedThisRun, true);
  assert.equal(report.browserDownloadFinalized, false);
});

test('reordered ledger and an unselected first download do not change selection', (t) => {
  const f = fixture(t);
  f.ledger.tracks.reverse();
  f.ledger.tracks[0].downloads.unshift({ providerId: 'unselected', sha256: 'bad' });
  f.save();
  assert.equal(f.verify().status, 'passed');
});

test('duplicate album IDs fail', (t) => {
  const f = fixture(t); f.albums.push({ id: 'slow-days' });
  assert.throws(f.verify, /duplicate album ID/);
});

test('missing target album fails', (t) => {
  const f = fixture(t); f.albums.splice(2, 1);
  assert.throws(f.verify, /Album missing/);
});

test('track count mismatch fails', (t) => {
  const f = fixture(t); f.ledger.tracks.pop(); f.save();
  assert.throws(f.verify, /track count mismatch/);
});

test('changed archived bytes fail before accepting decode evidence', (t) => {
  const f = fixture(t), changed = Buffer.from(f.audio); changed[44] = 1;
  f.write('albums/slow-days/downloads/1.wav', changed);
  assert.throws(f.verify, /Audio integrity mismatch/);
});

test('provider URL mismatch fails', (t) => {
  const f = fixture(t); f.album.tracks[0].sourceUrl = 'https://example.invalid/wrong';
  assert.throws(f.verify, /Provider URL mismatch/);
});

test('missing decode ending evidence fails', (t) => {
  const f = fixture(t); delete f.ledger.tracks[0].downloads[0].decodedSeconds; f.save();
  assert.throws(f.verify, /Historical decode evidence incomplete/);
});

test('ambiguous selected downloads fail', (t) => {
  const f = fixture(t); f.ledger.tracks[0].downloads.push({ ...f.ledger.tracks[0].downloads[0] }); f.save();
  assert.throws(f.verify, /Selected download missing or ambiguous/);
});

test('paths outside the project fail', (t) => {
  const f = fixture(t); f.album.tracks[0].audioSrc = '../outside.wav';
  assert.throws(f.verify, /Path outside root/);
});

test('CLI stdout mode preserves historical report and creates no report', (t) => {
  const f = fixture(t), sentinel = 'historical bytes\n';
  f.write('albums/slow-days/release-validation.json', sentinel);
  const result = spawnSync(process.execPath, [path.join(f.root, 'albums/slow-days/verify-release.cjs')], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).trackCount, 2);
  assert.equal(fs.readFileSync(path.join(f.root, 'albums/slow-days/release-validation.json'), 'utf8'), sentinel);
  assert.deepEqual(fs.readdirSync(path.join(f.root, 'albums/slow-days')).sort(), ['album.json', 'downloads', 'release-validation.json', 'verify-release.cjs']);
});

test('all four real CLI entrypoints reject an existing output before work', (t) => {
  const f = fixture(t); f.write('sentinel.json', 'keep me');
  for (const id of ['slow-days', 'city-lights']) for (const mode of ['release', 'public']) {
    const script = path.resolve(__dirname, `../albums/${id}/verify-${mode}.cjs`);
    const args = [script, ...(mode === 'public' ? ['http://127.0.0.1:1/'] : []), '--output', path.join(f.root, 'sentinel.json')];
    const result = spawnSync(process.execPath, args, { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Refusing to overwrite/);
  }
  assert.equal(fs.readFileSync(path.join(f.root, 'sentinel.json'), 'utf8'), 'keep me');
});

test('exclusive output write protects a file created after argument parsing', (t) => {
  const f = fixture(t); f.write('sentinel.json', 'keep me');
  assert.throws(() => emitReport({ tracks: [] }, path.join(f.root, 'sentinel.json')), /EEXIST/);
  assert.equal(fs.readFileSync(path.join(f.root, 'sentinel.json'), 'utf8'), 'keep me');
});

async function serveFixture(t, f, exposeLedger = false) {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).slice(1);
    const file = path.resolve(f.root, rel);
    if (!file.startsWith(`${f.root}${path.sep}`) || (!exposeLedger && rel.startsWith('albums/')) || !fs.existsSync(file)) { res.writeHead(404).end(); return; }
    const bytes = fs.readFileSync(file);
    if (req.headers.range) {
      // This fixture response tests the verifier protocol, not media seeking.
      res.writeHead(206, { 'Content-Range': 'bytes 100000-100999/200000', 'Content-Length': 1000 }).end(Buffer.alloc(1000));
    } else { res.writeHead(200, { 'Content-Length': bytes.length }).end(req.method === 'HEAD' ? undefined : bytes); }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }));
  return `http://127.0.0.1:${server.address().port}/`;
}

test('public HTTP checks pass against an isolated local server', async (t) => {
  const f = fixture(t), base = await serveFixture(t, f);
  const report = await verifyPublicRelease({ root: f.root, albumId: 'slow-days', base });
  assert.equal(report.tracks.length, 2);
  assert.equal(report.internalLedger404, true);
  assert.equal(report.browserPlayback, 'not_run');
});

test('public HTTP checks reject exposed internal ledger', async (t) => {
  const f = fixture(t), base = await serveFixture(t, f, true);
  await assert.rejects(verifyPublicRelease({ root: f.root, albumId: 'slow-days', base }), /Internal ledger exposed/);
});
