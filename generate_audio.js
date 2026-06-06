// generate_audio.js
// 建立 20 首佔位的合法靜音音檔，用以測試網頁播放器

const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, 'assets', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// 建立 1 秒長度的 8000Hz 8bit 單聲道 PCM WAV 檔頭 (8000 bytes)
const header = Buffer.from([
  0x52, 0x49, 0x46, 0x46, // "RIFF"
  0x2c, 0x1f, 0x00, 0x00, // 檔案大小 - 8 (7980 加上 44 bytes 標頭)
  0x57, 0x41, 0x56, 0x45, // "WAVE"
  0x66, 0x6d, 0x74, 0x20, // "fmt "
  0x10, 0x00, 0x00, 0x00, // chunk size (16)
  0x01, 0x00,             // audio format PCM (1)
  0x01, 0x00,             // channels 1
  0x40, 0x1f, 0x00, 0x00, // sample rate 8000 Hz
  0x40, 0x1f, 0x00, 0x00, // byte rate 8000 B/s
  0x01, 0x00,             // block align 1
  0x08, 0x00,             // bits per sample 8
  0x64, 0x61, 0x74, 0x61, // "data"
  0x00, 0x1f, 0x00, 0x00  // data size (7936 bytes)
]);

// 8bit PCM 靜音值為 128 (0x80)
const data = Buffer.alloc(7936, 128);
const wavFileContent = Buffer.concat([header, data]);

for (let i = 1; i <= 20; i++) {
  const trackNum = String(i).padStart(2, '0');
  const targetFile = path.join(audioDir, `track${trackNum}.mp3`);
  if (!fs.existsSync(targetFile)) {
    fs.writeFileSync(targetFile, wavFileContent);
    console.log(`[成功] 已建立佔位音檔: ${targetFile}`);
  } else {
    console.log(`[跳過] 檔案已存在，未覆蓋: ${targetFile}`);
  }
}

console.log('所有 20 個佔位音檔已成功生成於 assets/audio/。');
