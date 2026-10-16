const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const project=path.resolve(__dirname,'../../..'),ids=['places-to-go','words-to-say'];
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const writeNew=(p,x)=>fs.writeFileSync(p,JSON.stringify(x,null,2),{flag:'wx'});
const [mode,albumId,trackId,...args]=process.argv.slice(2);if(!ids.includes(albumId))throw Error('Album whitelist');
const dir=path.join(project,'albums',albumId),p=path.join(dir,'album.json'),a=read(p),t=a.tracks.find(t=>t.id===trackId),now=new Date().toISOString();if(!t)throw Error('Track missing');
if(mode==='reserve'){
 if(t.generationAttempts||t.providerResults.length)throw Error('Already submitted');
 writeNew(path.join(dir,'transactions',trackId+'-generation-intent.json'),{trackId,submissionTitle:t.submissionTitle,provider:'Suno',account:a.account,model:a.model,voice:a.voice,lyrics:t.lyrics,style:t.style,reservedAt:now,status:'reserved_do_not_resubmit_without_reconciliation',maxGenerationRequests:1});
 t.status='submission_reserved'; console.log(JSON.stringify({title:t.submissionTitle,style:t.style,lyrics:t.lyrics}));
}else if(mode==='receipt'){
 const [credits,...urls]=args;if(urls.length!==2||urls.some(u=>!/^https:\/\/suno.com\/song\/[a-f0-9-]+$/.test(u)))throw Error('Need two observed song URLs');
 if(t.providerResults.length)throw Error('Receipt already recorded');
 t.providerResults=urls.map((url,i)=>({id:url.split('/').pop(),url,variant:i?'B':'A',observedAt:now}));t.generationAttempts=1;t.status='generated_pending_download';t.selectedResult=t.providerResults[0].id;t.generationObservedAt=now;
 writeNew(path.join(dir,'transactions',trackId+'-generation-receipt.json'),{trackId,observedAt:now,creditsAfter:Number(credits),providerResults:t.providerResults,selectedResult:t.selectedResult,selection:'first observed candidate; no listening requested',clicksConfirmed:1});
 a.creditsLatest=Number(credits);console.log(JSON.stringify({track:trackId,results:t.providerResults.length,credits:Number(credits)}));
}else if(mode==='download-reserve'){
 if(!t.selectedResult||t.downloads.length)throw Error('Not eligible');
 const existing=ids.flatMap(id=>fs.existsSync(path.join(project,'albums',id,'transactions'))?fs.readdirSync(path.join(project,'albums',id,'transactions')).filter(n=>n.endsWith('-download-intent.json')).map(n=>id+'/'+n):[]);
 if(existing.length>=40)throw Error('40 download cap');
 writeNew(path.join(dir,'transactions',trackId+'-download-intent.json'),{trackId,providerId:t.selectedResult,url:t.providerResults.find(r=>r.id===t.selectedResult).url,format:'mp3',status:'reserved_do_not_repeat_unknown',reservedAt:now,maxDistinctSongs:40,reservationNumber:existing.length+1});t.status='download_reserved';console.log(JSON.stringify({id:t.selectedResult,reserved:existing.length+1}));
}else if(mode==='collect'){
 const [source]=args;if(!fs.existsSync(path.join(dir,'transactions',trackId+'-download-intent.json')))throw Error('Missing intent');if(t.downloads.length)throw Error('Already collected');
 const stats=fs.statSync(source);if(!stats.size)throw Error('Empty source');
 const probe=cp.spawnSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_name,sample_rate,channels','-of','json',source],{encoding:'utf8'});if(probe.status!==0)throw Error(probe.stderr);const info=JSON.parse(probe.stdout);
 const decode=cp.spawnSync('ffmpeg',['-v','error','-i',source,'-f','null','-'],{encoding:'utf8'});if(decode.status!==0)throw Error(decode.stderr);
 const hash=sha(source),outDir=path.join(dir,'downloads',trackId);fs.mkdirSync(outDir,{recursive:true});const name=trackId+'-A-'+t.selectedResult+'.mp3',dest=path.join(outDir,name);fs.copyFileSync(source,dest,fs.constants.COPYFILE_EXCL);if(sha(dest)!==hash)throw Error('Copy mismatch');
 const result={variant:'A',format:'mp3',providerId:t.selectedResult,path:'downloads/'+trackId+'/'+name,sourcePath:source,bytes:stats.size,sha256:hash,duration:Number(info.format.duration),streams:info.streams,fullDecodeExit:0,fullDecodePerformedThisRun:true,browserDownloadFinalized:!source.endsWith('.crdownload'),recoveredFromBrowserTemporaryFile:source.endsWith('.crdownload'),verifiedAt:now,audio_presence:'unknown',vocals:'unknown',listeningPerformed:false};
 writeNew(path.join(dir,'transactions',trackId+'-download-receipt.json'),result);t.downloads.push(result);t.status='downloaded_selected_technical_pass_unreviewed';console.log(JSON.stringify(result));
}else throw Error('Unknown mode');
a.updatedAt=now;fs.writeFileSync(p,JSON.stringify(a,null,2));
