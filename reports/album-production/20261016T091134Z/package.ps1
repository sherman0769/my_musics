#requires -Version 7.0
param([Parameter(Mandatory=$true)][ValidateSet('places-to-go','words-to-say')][string]$AlbumId)
$ErrorActionPreference='Stop'
$taskProject=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
$taskAlbum=Get-Content -LiteralPath (Join-Path $taskProject "albums/$AlbumId/album.json") -Raw -Encoding UTF8 | ConvertFrom-Json
if($taskAlbum.tracks.Count -ne 20){throw 'Need 20 tracks'}
$taskZipPath=Join-Path $taskProject "assets/audio/$AlbumId/$AlbumId-album.zip"
Add-Type -AssemblyName System.IO.Compression
$taskZipStream=[IO.File]::Open($taskZipPath,[IO.FileMode]::CreateNew)
$taskArchive=[IO.Compression.ZipArchive]::new($taskZipStream,[IO.Compression.ZipArchiveMode]::Create)
$taskEntries=@()
foreach($t in $taskAlbum.tracks){$taskEntries+=@{path=(Join-Path $taskProject "assets/audio/$AlbumId/track$($t.id).mp3");name="$($t.id)-$($t.title).mp3"}}
$taskEntries+=@{path=(Join-Path $taskProject "assets/images/$AlbumId/cover.svg");name='專輯封面.svg'}
$taskEntries+=@{path=(Join-Path $taskProject "assets/audio/$AlbumId/歌曲與來源.json");name='歌曲與來源.json'}
$taskEntries+=@{path=(Join-Path $taskProject "albums/$AlbumId/20首歌詞與提示詞.md");name='歌詞與創作提示詞.md'}
try{foreach($e in $taskEntries){$entry=$taskArchive.CreateEntry($e.name,[IO.Compression.CompressionLevel]::NoCompression);$outputStream=$entry.Open();$inputStream=[IO.File]::OpenRead($e.path);try{$inputStream.CopyTo($outputStream)}finally{$inputStream.Dispose();$outputStream.Dispose()}}}finally{$taskArchive.Dispose();$taskZipStream.Dispose()}
$taskCheck=[IO.Compression.ZipArchive]::new([IO.File]::OpenRead($taskZipPath),[IO.Compression.ZipArchiveMode]::Read)
$taskVerification=@()
try{foreach($e in $taskEntries){$entry=$taskCheck.GetEntry($e.name);if(-not $entry){throw "Missing ZIP entry $($e.name)"};$inputStream=$entry.Open();$hashEngine=[Security.Cryptography.SHA256]::Create();try{$insideHash=([BitConverter]::ToString($hashEngine.ComputeHash($inputStream))).Replace('-','').ToLowerInvariant()}finally{$inputStream.Dispose();$hashEngine.Dispose()};$expectedHash=(Get-FileHash -LiteralPath $e.path -Algorithm SHA256).Hash.ToLowerInvariant();if($insideHash -ne $expectedHash){throw "ZIP hash mismatch $($e.name)"};$taskVerification+=[pscustomobject]@{name=$e.name;bytes=$entry.Length;sha256=$insideHash;matches=$true}};if($taskCheck.Entries.Count -ne 23){throw 'Unexpected entry count'}}finally{$taskCheck.Dispose()}
$taskReport=[pscustomobject]@{album=$AlbumId;path=$taskZipPath;bytes=(Get-Item -LiteralPath $taskZipPath).Length;sha256=(Get-FileHash -LiteralPath $taskZipPath -Algorithm SHA256).Hash.ToLowerInvariant();entries=$taskVerification;passed=$true}
$reportPath=Join-Path $PSScriptRoot "$AlbumId-zip-verification.json"
if(Test-Path -LiteralPath $reportPath){throw 'Report already exists'}
$taskReport | ConvertTo-Json -Depth 7 | Set-Content -LiteralPath $reportPath -Encoding UTF8
[pscustomobject]@{album=$AlbumId;entries=23;passed=$true;bytes=$taskReport.bytes;sha256=$taskReport.sha256}|ConvertTo-Json
