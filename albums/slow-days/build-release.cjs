const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),a=JSON.parse(fs.readFileSync(path.join(__dirname,'album.json'),'utf8').replace(/^\uFEFF/,''));
const stories=[
'清晨仍然忙碌，但今天決定坐下來把早餐吃完。從繫鞋帶到聽見鄰桌的笑聲，這首開場曲把注意力交還給眼前的生活。',
'早餐店換了價目表，老朋友的位子卻一直留著。把總說不完的「改天」寫成一個確定的星期六，讓重逢真正發生。',
'錯過一班公車以後，終於看見路邊修傘的小店與牽老狗散步的人。慢下來的路程，也可以成為一天最值得記住的部分。',
'兩把椅子、兩杯水、一盆等待新葉的薄荷。沒有安排的星期天，因為有人並肩坐著，就已經足夠。',
'一頓晚餐差點被手機裡的消息打散。把手機翻面，重新問一句「剛才那件事，從頭說好嗎」，是這首歌最小也最重要的轉折。',
'忙完一整天回家，迎接人的不是追問，而是一句「洗個手吧」。多年以後，曾被照顧的人也學會站在爐火前等門開。',
'媽媽每天問的幾句話，聽久了容易以為只是重複。這次不急著掛電話，才聽見她其實想把相處的時間留長一些。',
'爸爸把電風扇的螺絲排在餅乾盒旁。以前嫌修理太慢，現在願意坐下來遞工具，讓陪伴跟著扇葉一起慢慢轉。',
'在市場提著兩把青菜回家，開始懂得幸福可以很具體。它可能只是一碗魚湯，也可能是有人一起商量晚餐。',
'相簿留下了照片，家人補上照片以外的故事。翻到最後，大家決定替今天也拍一張，讓平常的笑聲繼續被記得。',
'老朋友見面，不必交出一份漂亮的成績單。倒一杯茶、說說最近，仍能接得住彼此的沉默與笑容。',
'夜歸的車窗外是陌生燈火，門內卻留著溫水與拖鞋。簡短的訊息與放輕的腳步，說著兩個人彼此體諒的心意。',
'忘記帶傘的普通一天，因為一起笑著淋雨而被記住。衣服會乾，雨也會停，那個同行的人仍然走在身旁。',
'一碗在打烊前重新煮起的麵，接住了晚歸的人。接受過陌生人的照顧以後，也想在下一個夜晚替別人多留一點溫暖。',
'越是親近的人，越容易被省略一句謝謝。從一副眼鏡到一頓飯，把習慣了的照顧重新看見，再用行動回應。',
'原本只想走到路口，卻一路聊到街燈亮起。熟悉的巷子每天都有一點新鮮，身旁的人讓平凡的路一直走不膩。',
'衣服還沒摺、杯子還沒洗，但今天的疲倦也值得被照顧。允許家有一點凌亂，讓休息不用先證明自己夠努力。',
'鏡子前發現幾根白髮，想起一起走過的年歲。留下或染掉都沒有關係，重要的是仍願意陪彼此出去曬曬太陽。',
'一切只是普通的星期五：買了橘子，收好了衣服，聽到家人平安的消息。這些小小的順利，已值得多煮一道菜慶祝。',
'把鑰匙放好，把沒做完的事留在筆記裡。專輯最後用一句晚安收尾，讓明天的問題留給明天，今天先安心睡下。'
];
const quotes=['把你的名字，多念一遍。','這次，把星期六留給重逢。','回家可以有好多方向。','風吹過來，就坐近一點。','你就在眼前，我想把話聽完。','今天做得不好，也能回來坐。','這次電話，讓我晚一點掛。','這回換我，坐在你的身旁。','兩把青菜，半袋晚霞。','照片沒拍到的，我也想記得。','不用帶著成績來說話。','我會輕輕把門關好。','衣服會乾，我們繼續同行。','明天換我，為誰多等一刻。','你給我的好，我都有放在心上。','再走一段，等路燈亮起。','這個家，也可以好好照顧你。','我喜歡你現在的模樣。','有人作伴，就是好日子。','不用在睡前，把人生想完。'];
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
if(a.tracks.length!==20||a.tracks.some(t=>!t.downloads?.some(d=>d.variant==='A'&&d.fullDecodeExit===0)))throw Error('Release gate: all 20 verified A versions required');
const tracks=a.tracks.map((t,i)=>{const d=t.downloads.find(d=>d.variant==='A');const source=path.join(__dirname,d.path);if(sha(source)!==d.sha256)throw Error('Hash mismatch '+t.id);const filename=`track${t.id}.mp3`;const destination=path.join(root,'assets/audio/slow-days',filename);fs.mkdirSync(path.dirname(destination),{recursive:true});if(fs.existsSync(destination)){if(sha(destination)!==d.sha256)throw Error('Existing different audio '+filename);}else fs.copyFileSync(source,destination,fs.constants.COPYFILE_EXCL);const s=Math.round(d.duration);return{id:i+1,title:t.title,filename,duration:`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`,audioSrc:`assets/audio/slow-days/${filename}`,image:'assets/images/slow-days/cover.png',quote:quotes[i],concept:['放慢腳步','記起家人','珍惜相伴','安心回家'][Math.floor(i/5)],story:stories[i],lyrics:t.lyrics,palette:{bg1:'#333b2c',bg2:'#544a38',bg3:'#171e19'},sunoPrompt:{style:t.style},sourceUrl:t.providerResults[0].url,sha256:d.sha256};});
const album={id:'slow-days',albumTitle:a.title,displayTitle:a.title,subtitle:'第三張音樂故事專輯',artist:a.artist,artistBio:'李詩民用自己的聲音，唱早餐、家人、老朋友，以及慢慢回家的路。這張 20 首的原創國語專輯，由木吉他、鋼琴與輕靈魂樂串起日常，從清晨的一句早安走到夜裡的一聲晚安。歌曲以 Suno V6 與本人確認的 Voice 製作。',coverImage:'assets/images/slow-days/cover.png',labelImage:'assets/images/slow-days/cover.png',artistImage:'assets/images/singer_3.jpg',releaseDate:'2026-09-15',status:'available',audioBasePath:'assets/audio/slow-days',downloadPage:'slow-days-downloads.html',tagline:'把時間留給早餐、家人、老朋友，和陪你慢慢回家的人。',changelogTitle:'Album Diary / 把日子唱慢一點',changelogIntro:'2026 年 9 月 15 日，20 首全新原創歌曲收錄。使用李詩民本人確認的 Voice 與 Suno V6 製作，每首選定一個版本，提供完整單曲與專輯下載。',tracks};
fs.writeFileSync(path.join(root,'slowDaysAlbum.js'),`// Generated from the verified slow-days release manifest.\nconst slowDaysAlbumData = ${JSON.stringify(album,null,2)};\nif(typeof module!=='undefined'&&module.exports)module.exports=slowDaysAlbumData;else window.slowDaysAlbumData=slowDaysAlbumData;\n`);
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const html=`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>把日子唱慢一點｜李詩民・專輯下載</title><meta name="description" content="李詩民《把日子唱慢一點》20 首原創國語歌曲，完整試聽與下載。"><style>body{margin:0;background:#f3eee4;color:#30392c;font:16px/1.8 system-ui}main{max-width:1000px;margin:auto;padding:48px 24px}.hero{display:grid;grid-template-columns:300px 1fr;gap:36px;align-items:center}img{width:100%;border-radius:10px}h1{font-size:38px;line-height:1.3}a{color:#375336}a.button{display:inline-block;background:#3e5b3c;color:white;text-decoration:none;padding:10px 18px;border-radius:6px;margin:4px 8px 4px 0}ol{padding:0;list-style:none}li{display:grid;grid-template-columns:48px 1fr auto;align-items:center;gap:18px;padding:20px 0;border-bottom:1px solid #d5d4c8}strong{font-size:20px}small{display:block;color:#717568}audio{width:100%;margin-top:10px}.num{font-size:22px;color:#8c917e}@media(max-width:650px){.hero{grid-template-columns:1fr}.hero img{max-width:300px}h1{font-size:30px}li{grid-template-columns:32px 1fr}li>a{grid-column:2}}</style><main><section class="hero"><img src="assets/images/slow-days/cover.png" alt="把日子唱慢一點專輯封面：陽台上的兩把木椅、茶杯與橘子"><div><small>李詩民 · 20 首原創國語歌曲 · 2026.09.15</small><h1>把日子唱慢一點</h1><p>${esc(album.tagline)}</p><a class="button" href="/?album=slow-days&track=1">進入黑膠播放器</a><a class="button" href="assets/audio/slow-days/slow-days-album.zip" download>下載整張專輯 ZIP</a><small>Suno V6 × 李詩民本人聲音 · AI 輔助音樂創作</small></div></section><ol>${tracks.map(t=>`<li><span class="num">${String(t.id).padStart(2,'0')}</span><div><strong>${esc(t.title)}</strong><small>${esc(t.quote)} · ${t.duration}</small><audio controls preload="none" src="${t.audioSrc}"></audio></div><a class="button" href="${t.audioSrc}" download="${String(t.id).padStart(2,'0')}-${esc(t.title)}.mp3">下載 MP3</a></li>`).join('')}</ol></main></html>`;
fs.writeFileSync(path.join(root,'slow-days-downloads.html'),html);
fs.writeFileSync(path.join(root,'assets/audio/slow-days/歌曲與來源.json'),JSON.stringify({album:a.title,artist:a.artist,model:'Suno V6',tracks:tracks.map(t=>({title:t.title,filename:t.filename,duration:t.duration,sourceUrl:t.sourceUrl,sha256:t.sha256}))},null,2));
console.log(JSON.stringify({tracks:tracks.length,sha256:sha(path.join(root,'slowDaysAlbum.js')),audioDirectory:'assets/audio/slow-days'}));


