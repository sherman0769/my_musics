const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),a=JSON.parse(fs.readFileSync(path.join(__dirname,'album.json'),'utf8').replace(/^\uFEFF/,''));
const site=require(path.join(root,'albumData.js')),album=site.albumsData.find(a=>a.id==='city-lights');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
if(site.albumsData.length!==4||album.tracks.length!==20)throw Error('Album or track count');
const rows=album.tracks.map((t,i)=>{const d=a.tracks[i].downloads[0],file=path.join(root,t.audioSrc),data=fs.readFileSync(file);if(sha(data)!==d.sha256||d.fullDecodeExit!==0||Math.abs(d.duration-d.decodedSeconds)>.15)throw Error('Audio integrity '+t.id);if(!t.lyrics||!t.story||!t.sourceUrl)throw Error('Missing metadata '+t.id);return{id:t.id,title:t.title,bytes:data.length,sha256:d.sha256,duration:d.duration}});
const report={verifiedAt:new Date().toISOString(),album:album.albumTitle,artist:album.artist,albumCount:site.albumsData.length,trackCount:rows.length,totalSeconds:rows.reduce((s,t)=>s+t.duration,0),totalAudioBytes:rows.reduce((s,t)=>s+t.bytes,0),allAudioFullDecodePassed:true,allPublishedCopiesHashMatched:true,browserDownloadFinalized:false,tracks:rows};
fs.writeFileSync(path.join(__dirname,'release-validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({...report,tracks:undefined}));

