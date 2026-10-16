// One-run local inventory writer. No git add/commit/push or provider operations.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const audit = 'reports/git-preparation/20261016T120028Z';
const production = 'reports/album-production/20261016T091134Z';
const datedDoc = 'docs/GIT_COMMIT_PLAN_20261016.md';
const whitelist = ['AGENTS.md', 'README.md', 'docs/MAINTENANCE.md', 'docs/GIT_COMMIT_PLAN.md'];
const docPaths = [...whitelist, 'docs/LOCAL_ALBUM_BRIDGE.md', datedDoc];
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const info = p => { const b = fs.readFileSync(p); return {path:p, bytes:b.length, sha256:sha(b)}; };
const json = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const git = (...args) => cp.execFileSync('git', args);
const put = (p, b) => fs.writeFileSync(p, b, {flag:'wx'});
const putJson = (p, x) => put(p, JSON.stringify(x, null, 2) + '\n');
const must = (value, message) => { if (!value) throw new Error(message); };
const base = json(audit + '/baseline.json').files;
const baseMap = new Map(base.map(x => [x.path, x]));
const preservation = base.map(old => {
  const now = fs.existsSync(old.path) ? info(old.path) : null;
  return {path:old.path, unchanged:!!now && old.bytes===now.bytes && old.sha256===now.sha256,
    allowedModification:whitelist.includes(old.path), before:old, after:now};
});
must(preservation.every(x => x.unchanged || (x.allowedModification && x.after)), 'Unexpected baseline modification');
const backups = whitelist.map(p => ({path:p, matchesBaseline:info(audit+'/before/'+p).sha256===baseMap.get(p).sha256}));
must(backups.every(x=>x.matchesBaseline), 'Backup mismatch');
const delivery = json(production+'/delivery-manifest-final.json').files.map(old => ({
  ...old, current:info(old.path), unchanged:info(old.path).sha256===old.sha256,
  permittedDocumentationUpdate:old.path==='README.md'
}));
must(delivery.length===267 && delivery.every(x=>x.unchanged || x.permittedDocumentationUpdate), 'Production manifest mismatch');
must(info(audit+'/before/README.md').sha256===delivery.find(x=>x.path==='README.md').sha256, 'README pre-edit backup does not match production manifest');
const originals=json(production+'/native-file-provenance.json').tracks.map(t=>({
  path:t.sourcePath, expectedSha256:t.sha256, ...info(t.sourcePath), matches:info(t.sourcePath).sha256===t.sha256
}));
must(originals.length===40 && originals.every(x=>x.matches), 'External original mismatch');
const audioEvidence=json(production+'/final-audio-and-preservation.json');
must(audioEvidence.tracks.length===40 && audioEvidence.tracks.every(x=>x.passed && x.fullDecodeExit===0 && x.fullDecodePerformedThisRun===true), 'Historical audio evidence incomplete');
const oldSummary=json(production+'/final-summary.json');
must(oldSummary.audioFullDecodePassed===40 && oldSummary.zipEntriesHashMatched===46 && oldSummary.regressionTestsPassed===15, 'Historical summary mismatch');
const head=git('rev-parse','HEAD').toString().trim();
must(head===fs.readFileSync(audit+'/head-before.txt','utf8').trim(), 'HEAD changed');
must(git('ls-files','--stage','-z').equals(fs.readFileSync(audit+'/index-entries-before.nul')), 'Index entries changed');
must(git('diff','--cached','--name-only').length===0, 'Index not empty');
const indexPath=git('rev-parse','--git-path','index').toString().trim();
must(sha(fs.readFileSync(indexPath))===info(audit+'/index-before.backup').sha256, 'Raw index changed');
const deferred=base.filter(x=>['reports/git-staging/','reports/git-commits/','reports/push-plan/'].some(p=>x.path.startsWith(p)));
must(deferred.length===55, 'Deferred set changed');
putJson(audit+'/deferred-files.json', {reason:'既有其他輪次未追蹤 Git 操作／推送規劃報告；原檔保留，不納本次兩專輯候選。',files:deferred});
const controls=[audit+'/commit-plan.json', ...[1,2,3].flatMap(n=>[audit+`/commit-0${n}-paths.txt`,audit+`/commit-0${n}-paths.nul`]), audit+'/validation.json'];
const future=[datedDoc, audit+'/preparation-checks.json', audit+'/驗收結果.md', ...controls];
function walk(d='') { const out=[]; for(const e of fs.readdirSync(d||'.',{withFileTypes:true})) {
  const p=(d?d+'/':'')+e.name;
  if(['.git','.vercel','node_modules'].includes(e.name)||e.name.startsWith('.env'))continue;
  if(e.isDirectory())out.push(...walk(p));else if(e.isFile())out.push(p);
} return out; }
const allPaths=[...new Set([...walk(),...future])].sort();
const runtimeNames=['albumData.js','index.html','sw.js','placesToGoAlbum.js','wordsToSayAlbum.js','places-to-go-downloads.html','words-to-say-downloads.html'];
const runtime=p=>runtimeNames.includes(p)||['assets/audio/places-to-go/','assets/audio/words-to-say/','assets/images/places-to-go/','assets/images/words-to-say/'].some(x=>p.startsWith(x));
const album=p=>['albums/places-to-go/','albums/words-to-say/'].some(x=>p.startsWith(x));
const ruleEvidence=p=>docPaths.includes(p)||p.startsWith(production+'/')||p.startsWith(audit+'/');
const groups=[
  {id:'01',message:'feat(albums): add places-to-go and words-to-say releases',reason:'成套保存兩張新專輯網站入口、模組、下載頁、40 首正式音檔、兩個 ZIP、來源資料與封面。',paths:allPaths.filter(runtime)},
  {id:'02',message:'chore(archive): preserve new album generation records',reason:'保存兩專輯帳本、80 候選備註、交易、40 份原始下載副本及唯讀驗證入口。',paths:allPaths.filter(album)},
  {id:'03',message:'chore(workflow): adopt local album bridge and preserve verification evidence',reason:'正式化已核准流程並保存製作／失敗證據、本次原版備份、提交白名單與驗收。',paths:allPaths.filter(ruleEvidence)}
];
must(groups[0].paths.length===53 && groups[1].paths.length===213, 'Runtime or ledger file count changed');
const selected=groups.flatMap(g=>g.paths); must(new Set(selected).size===selected.length, 'Duplicate candidates');
const count=selected.length;
const doc=`# 2026-10-16 Git 提交候選清單

日期：2026-10-16（台灣時間）。狀態：\`prepared_not_staged\`。目前分支 \`main\`，HEAD 為 \`${head}\`；暫存區為空。本次只完成規則採用與清單，未暫存、提交、推送或部署。

## 建議三組順序

| 組別 | 建議 commit message | 精確路徑數 | 內容 |
| --- | --- | ---: | --- |
${groups.map(g=>`| ${g.id} | \`${g.message}\` | ${g.paths.length} | ${g.reason} |`).join('\n')}

共 **${count} 個精確檔案路徑**，沒有重複。第一組網站檔須整組保存；第二組的兩個驗證入口依賴已提交的共用實作，實際驗證另需第一組正式音檔。第三組 README 引用前兩組成果，三組應依序完成。這是提案，尚未建立新提交。

## 精確清單與雜湊

- [完整 commit-plan.json](../${audit}/commit-plan.json)：逐檔 Git 狀態、bytes、完整 SHA-256、分組理由及驗收引用。
- 第一組：[paths.txt](../${audit}/commit-01-paths.txt)、[paths.nul](../${audit}/commit-01-paths.nul)。
- 第二組：[paths.txt](../${audit}/commit-02-paths.txt)、[paths.nul](../${audit}/commit-02-paths.nul)。
- 第三組：[paths.txt](../${audit}/commit-03-paths.txt)、[paths.nul](../${audit}/commit-03-paths.nul)。
- [本輪驗收](../${audit}/驗收結果.md)、[詳細核對](../${audit}/preparation-checks.json)、[凍結清單驗收](../${audit}/validation.json)。

TXT 為 UTF-8、逐行精確路徑，NUL 版可供未來授權後配合 Git literal pathspec 使用。未執行 git add，沒有目錄遞迴或萬用字元。未來若獲暫存授權，必須重新核對當時 SHA／bytes／狀態，不能直接套用過期清單。

一般候選均有完整 SHA-256。八個互相引用的控制檔（六份路徑檔、commit-plan.json、validation.json）以 \`control_artifact\` 標記，清單內自身 bytes／SHA 為 null，避免循環自我雜湊；validation.json 另記其餘七檔的最終 bytes／完整 SHA。validation.json 不假造自身雜湊，後續暫存前仍需取得當時完整 SHA。

## 原檔、失敗與既有報告

兩張新專輯的 40 份正式 MP3、40 份專案保存副本及兩個正式 ZIP 全部列入；使用者 Downloads 中另 40 份原檔保持原位，重新核對 SHA，但不在儲存庫路徑中。第三組保留第一版失敗 ZIP、PowerShell 5.1 失敗腳本、恢復意圖、逐次瀏覽器快照、原版備份及技術驗收。未重新打包、轉檔或刪除副本。最大單檔與各組 bytes 見 JSON；Git 物件實際壓縮／去重後大小未估算。

另有 **55 個既有未追蹤檔案**位於 reports/git-staging/、reports/git-commits/、reports/push-plan/，屬先前其他輪次 Git 作業的保存報告；見 [deferred-files.json](../${audit}/deferred-files.json) 的精確路徑、bytes 與完整 SHA。它們保持原樣，未混入這次候選，也未忽略或刪除。

原有三筆本機提交（9ca912e、1cdabe7、559d1db）保持原樣，不重複列為新增提交。舊 [2026-10-15 提案](GIT_COMMIT_PLAN.md) 原文及已完成狀態另存，沒有把歷史待決定欄位改寫成當時已採用。

## 可見性與驗收邊界

製作紀錄含帳號別名、作品／Voice ID、本機路徑及歷史點數。先前 2026-10-15 的遠端／部署規劃曾確認 GitHub 儲存庫為公開且 Git 推送可能觸發 Vercel 部署；本輪未連線重新查詢，當前遠端與自動部署設定不作新確認。\`.vercelignore\` 排除內部資料只控制部署，不控制 Git 遠端可見性。\`.env*\`、\`.vercel/\`、\`node_modules/\` 不列入候選；常見憑證樣式檢查只是有限掃描。

本輪重新核對基線、音檔／ZIP、原始下載、製作清單與證據雜湊，未重新解碼或試聽。保留前一製作輪 40 首完整解碼、46 項 ZIP 內容 SHA、15 項回歸測試及本機瀏覽器結果，並確認相關檔案／驗證實作未變；不可把沿用證據稱為本輪重跑。沒有 package.json，npm build／lint 不適用。人工聽感、實際人聲／聲音身分、手機與公開發布仍未驗收。

本次沒有新流程試行，只把使用者已核准的本機橋接方式正式納入 [AGENTS.md](../AGENTS.md) 與 [製作流程](LOCAL_ALBUM_BRIDGE.md)，範圍限本專案。
`;
put(datedDoc,doc);
// Read-only checks. Git status is requested without optional index refresh locks.
const statusRaw=cp.execFileSync('git',['--no-optional-locks','status','--porcelain=v1','-z','--untracked-files=all']).toString('utf8');
const statuses=new Map(statusRaw.split('\0').filter(Boolean).map(s=>[s.slice(3),s.slice(0,2)]));
const missingCoverage=[...statuses.keys()].filter(p=>!selected.includes(p)&&!deferred.some(x=>x.path===p));
must(missingCoverage.length===0,'Unclassified changed file: '+missingCoverage.join(', '));
const trackedDiff=cp.spawnSync('git',['diff','--check','--',...whitelist],{encoding:'utf8'});
must(trackedDiff.status===0,'Current documentation whitespace failure: '+trackedDiff.stdout+trackedDiff.stderr);
const links=[];
for(const p of docPaths){const text=fs.readFileSync(p,'utf8');for(const m of text.matchAll(/\[[^\]\n]*\]\(([^)]+)\)/g)) {
  const target=m[1].split('#')[0]; if(!target||/^[a-z]+:/i.test(target))continue;
  const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(p),decodeURIComponent(target)));
  links.push({source:p,target:resolved,exists:fs.existsSync(resolved)||future.includes(resolved)});
}}
must(links.every(x=>x.exists),'Broken documentation link');
const deployment=fs.readFileSync('.vercelignore','utf8');
const excluded=['AGENTS.md','albums/','reports/','docs/','scripts/','tests/'].map(p=>({path:p,present:deployment.split(/\r?\n/).some(x=>x.replace(/^\//,'').trim()===p||x.replace(/^\//,'').trim()===p.replace(/\/$/,''))}));
must(excluded.every(x=>x.present),'Deployment exclusion missing');
const findings=[];
const patterns=[['private_key',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],['github_token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/],['api_secret',/\bsk-(?:proj-)?[A-Za-z0-9_-]{32,}\b/]];
for(const p of selected.filter(p=>fs.existsSync(p)&&/\.(?:json|jsonl|md|js|cjs|html|ps1|patch|txt)$/.test(p)&&p!==audit+'/prepare-plan.cjs')){
  const s=fs.readFileSync(p,'utf8');for(const [name,re]of patterns)if(re.test(s))findings.push({path:p,pattern:name});
}
must(findings.length===0,'Credential-pattern finding (values intentionally not printed)');
const media=preservation.filter(x=>/\.(?:mp3|zip)$/.test(x.path));
const checks={createdAt:new Date().toISOString(),timezone:'Asia/Taipei',passed:true,baselineFiles:base.length,
  unchanged:preservation.filter(x=>x.unchanged).length,approvedModified:preservation.filter(x=>!x.unchanged).map(x=>x.path),
  preservation,backups,mediaUnchanged:{mp3:media.filter(x=>x.path.endsWith('.mp3')).length,zip:media.filter(x=>x.path.endsWith('.zip')).length,passed:media.every(x=>x.unchanged)},
  deliveryManifest:{checked:delivery.length,unchanged:delivery.filter(x=>x.unchanged).length,approvedDifference:'README.md',results:delivery},
  originals,links,deploymentExclusions:excluded,credentialPatternFindings:findings,credentialScan:'limited patterns, not a full security audit',
  head,indexEntriesUnchanged:true,rawIndexUnchanged:true,indexEmpty:true,documentationDiffCheckExit:trackedDiff.status,
  fullDecodePerformedThisRun:false,regressionTestsRunThisRun:false,packageJsonPresent:fs.existsSync('package.json'),
  historicalEvidence:{run:production,audioFullDecodePassed:40,zipEntriesHashMatched:46,regressionTestsPassed:15,filesHashPreserved:true},
  staged:false,committed:false,pushed:false,deployed:false};
putJson(audit+'/preparation-checks.json',checks);
const validationMd=`# 規則採用與提交清單驗收

日期：2026-10-16（台灣時間）。結論：本機橋接已正式納入本專案製作規則；三組共 ${count} 個精確候選，僅備妥清單。

- 基線 ${base.length} 檔：${checks.unchanged} 檔原樣保留，僅四份核准文件修改（AGENTS.md、README.md、docs/MAINTENANCE.md、docs/GIT_COMMIT_PLAN.md）；四份完整修改前備份 SHA 均符合基線。另新增兩份說明文件與本輪審查資料。
- 所有 200 個專案 MP3、5 個 ZIP（包含歷史失敗 ZIP）完整 SHA 未變；使用者下載目錄 40 份原始 MP3 重新核對相符。沒有轉檔、重下載或重新打包。
- 製作交付清單 267 檔中 266 檔完全相同，README 是本次核准的規則入口補充；修改前 README 備份與原製作交付 SHA 相符。
- 40 首完整解碼、46 項 ZIP 內容 SHA 與 15 項回歸測試是上一製作輪已通過證據，本輪只重新核對相關檔案／實作雜湊，未重跑解碼、測試或人工試聽。未宣稱實際人聲、聲音身分或藝術接受。
- 文件相對連結、核准文件 git diff --check、部署排除與有限常見憑證樣式檢查通過；逐檔覆蓋與控制檔凍結結果另見 validation.json。
- 55 份其他輪次未追蹤報告保留且另列 deferred-files.json。候選全為精確檔案；八份互相引用控制檔的循環雜湊例外公開記錄，validation.json 保存其餘七份控制檔的最終雜湊。
- HEAD 維持 ${head}，索引條目及索引原檔 SHA 不變，暫存區為空。未暫存、提交、推送、部署、連線查遠端或操作供應商。

本輪沒有新增自我優化試行；只正式採用先前通過的本機橋接，保留舊報告待採用狀態。優點是減少轉抄並保留讀回；取捨為兩個短期本機服務及每批設定核對，已依本次使用者授權寫入規則，不擴大至全局或後續生成授權。
`;
put(audit+'/驗收結果.md',validationMd);
for(const g of groups){put(audit+`/commit-${g.id}-paths.txt`,g.paths.join('\n')+'\n');put(audit+`/commit-${g.id}-paths.nul`,Buffer.from(g.paths.join('\0')+'\0'));}
const plannedGroups=groups.map(g=>({...g,files:g.paths.map(p=>({
  ...(controls.includes(p)?{path:p,bytes:null,sha256:null,control_artifact:true,reason:'Circular control reference; see validation.json for other seven controls.'}:info(p)),
  gitStatus:statuses.get(p)||'??',validation: audit+'/preparation-checks.json'
})),count:g.paths.length,normalFileBytes:g.paths.filter(p=>!controls.includes(p)).reduce((sum,p)=>sum+fs.statSync(p).size,0)}));
const plan={createdAt:new Date().toISOString(),dateTaiwan:'2026-10-16',status:'prepared_not_staged',head,branch:'main',
  groups:plannedGroups,totalPaths:count,controlsSelfHashException:controls,
  validation:audit+'/validation.json',deferredInventory:audit+'/deferred-files.json',
  excluded:['.git/','.vercel/','.env*','node_modules/','external Downloads originals (retained and hash checked)'],
  stagingAuthorization:false,commitAuthorization:false,pushAuthorization:false,deploymentAuthorization:false};
putJson(audit+'/commit-plan.json',plan);
// Final freeze: every normal file and every exact list is read back after output.
const reread=json(audit+'/commit-plan.json');
const fileChecks=reread.groups.flatMap(g=>g.files).filter(f=>!f.control_artifact).map(f=>({path:f.path,matches:info(f.path).sha256===f.sha256&&info(f.path).bytes===f.bytes}));
must(fileChecks.every(x=>x.matches),'Candidate changed after freeze');
for(const g of groups){const txt=fs.readFileSync(audit+`/commit-${g.id}-paths.txt`,'utf8').trimEnd().split('\n');const nul=fs.readFileSync(audit+`/commit-${g.id}-paths.nul`,'utf8').split('\0').filter(Boolean);must(JSON.stringify(txt)===JSON.stringify(g.paths)&&JSON.stringify(nul)===JSON.stringify(g.paths),'Path list readback mismatch');}
const ignored=cp.spawnSync('git',['check-ignore','--stdin','-z'],{input:Buffer.from(selected.join('\0')+'\0')});
must(ignored.status===1&&ignored.stdout.length===0,'Candidate unexpectedly ignored');
const maxFile=selected.filter(p=>!controls.includes(p)).map(info).sort((a,b)=>b.bytes-a.bytes)[0];
must(maxFile.bytes<100*1024*1024,'File exceeds 100 MiB');
must(git('rev-parse','HEAD').toString().trim()===head,'Final HEAD changed');
must(git('ls-files','--stage','-z').equals(fs.readFileSync(audit+'/index-entries-before.nul')),'Final index entries changed');
must(sha(fs.readFileSync(indexPath))===info(audit+'/index-before.backup').sha256,'Final raw index changed');
putJson(audit+'/validation.json',{createdAt:new Date().toISOString(),passed:true,status:'prepared_not_staged',
  groups:plannedGroups.map(g=>({id:g.id,count:g.count,normalFileBytes:g.normalFileBytes,message:g.message})),
  totalPaths:count,uniquePaths:new Set(selected).size,normalFileHashChecks:fileChecks.length,normalFilesAllMatch:true,
  controls:controls.filter(p=>p!==audit+'/validation.json').map(info),selfHash:null,selfHashReason:'No circular self-hash claimed. Rehash before any future staging.',
  maxFile,candidateIgnoreCheckPassed:true,pathListsReadbackPassed:true,unclassifiedChangedFiles:missingCoverage,
  deferredFiles:deferred.length,preservationSummary:{baseline:base.length,unchanged:checks.unchanged,modifiedWhitelist:checks.approvedModified,mp3:200,zip:5,externalOriginals:40},
  fullDecodePerformedThisRun:false,regressionTestsRunThisRun:false,head,indexEntriesUnchanged:true,rawIndexUnchanged:true,indexEmpty:true,
  staged:false,committed:false,pushed:false,deployed:false});
console.log(JSON.stringify({audit,groups:plannedGroups.map(g=>({id:g.id,count:g.count,normalFileMiB:g.normalFileBytes/1048576})),totalPaths:count,deferred:deferred.length,baseline:base.length,unchanged:checks.unchanged,mediaUnchanged:checks.mediaUnchanged,maxFile,head,indexEmpty:true}));
