const fs=require('node:fs'),path=require('node:path');
const ap=path.join(__dirname,'album.json'),a=JSON.parse(fs.readFileSync(ap,'utf8').replace(/^\uFEFF/,''));
const events=JSON.parse(fs.readFileSync(path.join(__dirname,'download-events.json'),'utf8').replace(/^\uFEFF/,''));
if(a.tracks.length!==20||a.tracks.some(t=>t.downloads?.length!==1)||events.length!==20)throw Error('20 files and download events required');
a.status='release_prepared';a.updatedAt=new Date().toISOString();a.selection='A version for all 20 songs';
a.downloadMethod='One native Suno MP3 unlock per selected song; preserve source files, validate full decode, duration and byte-identical SHA-256 copies.';
for(const t of a.tracks){const e=events.find(e=>e.id===t.id),d=t.downloads[0];if(!e||e.attempts!==1||d.fullDecodeExit!==0)throw Error('Receipt incomplete '+t.id);const p=path.join(__dirname,'transactions',`${t.id}-download-intent.json`),j=JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));Object.assign(j,{status:d.browserDownloadFinalized?'download_verified':'verified_copy_available_browser_finalization_unconfirmed',successfulUnlockActions:1,downloadEventConfirmed:e.event,sourcePreserved:true,fileReceipt:`${t.id}-download-A.json`,updatedAt:a.updatedAt,uiReceipt:e});fs.writeFileSync(p,JSON.stringify(j,null,2));fs.writeFileSync(path.join(__dirname,t.downloadDirectory,'README.txt'),`${t.title}\n選定 A 版；MP3 完整解碼通過。\n檔案：${path.basename(d.path)}\nSHA-256：${d.sha256}\n`);}
fs.writeFileSync(ap,JSON.stringify(a,null,2));
fs.writeFileSync(path.join(__dirname,'歌曲連結與進度.md'),`# ${a.title}｜${a.artist}\n\n20 首均選定 A 版，下載副本完整解碼與 SHA-256 比對通過。\n\n|曲序|歌名|選定版本|本機 MP3|\n|---|---|---|---|\n`+a.tracks.map(t=>`|${t.id}|${t.title}|[Suno A](${t.providerResults[0].url})|[下載](${t.downloads[0].path})|`).join('\n')+'\n');
console.log('20 download transactions finalized');
