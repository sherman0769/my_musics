$ErrorActionPreference = 'Stop'
$releaseRoot = Join-Path $PSScriptRoot '../../assets/audio/slow-days'
$releaseRoot = [IO.Path]::GetFullPath($releaseRoot)
$album = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'album.json') -Raw -Encoding UTF8 | ConvertFrom-Json
if ($album.tracks.Count -ne 20) { throw 'Expected 20 songs' }
Add-Type -AssemblyName System.IO.Compression
$zipPath = Join-Path $releaseRoot 'slow-days-album.zip'
if (Test-Path -LiteralPath $zipPath) { throw 'Archive already exists; inspect before replacing' }
$zipStream = [IO.File]::Open($zipPath, [IO.FileMode]::CreateNew)
$archive = [IO.Compression.ZipArchive]::new($zipStream, [IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($track in $album.tracks) {
    $file = Join-Path $releaseRoot ('track' + $track.id + '.mp3')
    $entry = $archive.CreateEntry(($track.id + '-' + $track.title + '.mp3'), [IO.Compression.CompressionLevel]::NoCompression)
    $entryStream = $entry.Open()
    $inputStream = [IO.File]::OpenRead($file)
    try { $inputStream.CopyTo($entryStream) } finally { $inputStream.Dispose(); $entryStream.Dispose() }
  }
  foreach ($extra in @(@{Path=(Join-Path $PSScriptRoot '20首歌詞與提示詞.md');Name='歌詞與創作提示詞.md'},@{Path=(Join-Path $releaseRoot '歌曲與來源.json');Name='歌曲與來源.json'},@{Path=(Join-Path $PSScriptRoot '../../assets/images/slow-days/cover.png');Name='專輯封面.png'})) {
    $entry = $archive.CreateEntry($extra.Name)
    $entryStream = $entry.Open(); $inputStream = [IO.File]::OpenRead($extra.Path)
    try { $inputStream.CopyTo($entryStream) } finally { $inputStream.Dispose(); $entryStream.Dispose() }
  }
} finally { $archive.Dispose(); $zipStream.Dispose() }
$check = [IO.Compression.ZipArchive]::new([IO.File]::OpenRead($zipPath), [IO.Compression.ZipArchiveMode]::Read)
try { if (($check.Entries | Where-Object FullName -like '*.mp3').Count -ne 20) { throw 'ZIP track count incorrect' }; $count=$check.Entries.Count } finally { $check.Dispose() }
[pscustomobject]@{Path=$zipPath; Entries=$count; Bytes=(Get-Item -LiteralPath $zipPath).Length; SHA256=(Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash} | ConvertTo-Json
