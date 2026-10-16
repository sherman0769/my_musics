const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../../..');
const data=['places-to-go','words-to-say'].map(id=>JSON.parse(fs.readFileSync(path.join(root,'albums',id,'album.json'),'utf8'))).map(a=>({id:a.id,title:a.title,voice:a.voice,tracks:a.tracks.map(t=>({id:t.id,title:t.submissionTitle,style:t.style,lyrics:t.lyrics}))}));
const json=JSON.stringify(data).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
http.createServer((req,res)=>{if(req.url!=='/'){res.writeHead(404);return res.end();}res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end('<!doctype html><meta charset="utf-8"><title>Approved album inputs — local only</title><pre>'+json+'</pre>');}).listen(8769,'127.0.0.1',()=>console.log('Approved lyrics and styles at http://127.0.0.1:8769/ (loopback only, read-only)'));
