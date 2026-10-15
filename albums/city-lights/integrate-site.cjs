const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'../..');
const album=require(path.join(root,'cityLightsAlbum.js'));if(album.tracks.length!==20||album.tracks.some(t=>!fs.existsSync(path.join(root,t.audioSrc))))throw Error('20 audio files required');
const updates={
 'albumData.js':s=>s.replace("typeof module !== 'undefined' && module.exports ? require('./slowDaysAlbum.js') : window.slowDaysAlbumData","typeof module !== 'undefined' && module.exports ? require('./slowDaysAlbum.js') : window.slowDaysAlbumData,\n  typeof module !== 'undefined' && module.exports ? require('./cityLightsAlbum.js') : window.cityLightsAlbumData"),
 'index.html':s=>s.replace('<script src="albumData.js?v=5"></script>','<script src="cityLightsAlbum.js?v=1"></script>\n  <script src="albumData.js?v=6"></script>'),
 'sw.js':s=>s.replace('glimmer-boundaries-v17','glimmer-boundaries-v18').replace("'./albumData.js?v=5',","'./albumData.js?v=6',\n  './cityLightsAlbum.js?v=1',\n  './assets/images/city-lights/cover.png',")
};
if(fs.readFileSync(path.join(root,'albumData.js'),'utf8').includes("require('./cityLightsAlbum.js')"))throw Error('Already integrated');fs.mkdirSync(path.join(__dirname,'backups'),{recursive:true});
for(const [file,change]of Object.entries(updates)){const p=path.join(root,file),s=fs.readFileSync(p,'utf8'),next=change(s);if(s===next)throw Error('Expected integration point absent '+file);fs.copyFileSync(p,path.join(__dirname,'backups',file),fs.constants.COPYFILE_EXCL);fs.writeFileSync(p,next)}console.log('Fourth album integrated; pre-change working files preserved');
