# 《微光邊界》新增歌曲與 UI 調整開發完成說明 (Walkthrough)

本專案已成功擴充至 **20 首歌曲**，完成了資料庫追加、核心播放邏輯重構、UI 適應性修改以及離線快取配置的升級，並通過了語法編譯與音檔生成測試。

---

## 📌 完成事項摘要

### 1. 專輯資料庫擴充
*   修改檔案：[albumData.js](file:///D:/MyGitHub/my_musics/albumData.js)
*   追加了 **Track 15 到 Track 20** 的 6 首原創歌曲。
*   每首歌曲均配置了完整的 `id`、`title`、`filename`、`duration`、`sunoPrompt`（含 style 與 lyricsPrompt 標籤）、`story` 及符合 Suno AI 格式（含 `[Verse]`、`[Chorus]`、`[Outro]` 結構標籤）的原創中文歌詞。
*   **【最新更新】**：使用 `ffprobe` 讀取了您實際替換上傳的 `track15.mp3` 到 `track20.mp3` 音檔長度，並將 `albumData.js` 中的時長屬性同步更新為正確的長度。

### 2. 播放器邏輯消除硬編碼
*   修改檔案：[app.js](file:///D:/MyGitHub/my_musics/app.js)
*   **動態統計計算**：重構播放器資訊載入邏輯，曲目總數由寫死 `14` 修改為動態讀取 `window.albumData.tracks.length`，播放介面現在能自動顯示為 `Track 01 / 20` 到 `Track 20 / 20`。
*   **配置擴充**：
    *   在 `trackImages` 中新增了 6 首歌曲與歌手寫真（`singer_2.jpg`、`singer_4.png`、`singer_6.png`、`singer_7.png`、`singer_8.png`、`singer_3.jpg`）的映射關係。
    *   在 `moodPalettes` 中調製了 6 組深色流動漸層背景（包括深夜藍紫、雨簷灰綠、重逢暖橘、爵士咖褐、陽台暗紫與曙光金橘）。
    *   在 `lifeConcepts`（人生課題）與 `shortQuotes`（哲學金句）中追加了 6 組情感和解文案。

### 3. SEO 與初始 UI 面板更新
*   修改檔案：[index.html](file:///D:/MyGitHub/my_musics/index.html)
*   更新 SEO `meta` 描述與社群分享標籤（Twitter / Open Graph），將宣傳文字中的「14 首」更新為「20 首」。
*   將初始曲目計數 DOM `<span class="track-index" id="current-track-index">Track 01 / 14</span>` 更新為 `/ 20`。

### 4. PWA 快取與生成腳本升級
*   修改檔案：[sw.js](file:///D:/MyGitHub/my_musics/sw.js)
    *   升級快取名稱為 `glimmer-boundaries-v8`。
    *   將快取的資源列表如 `style.css?v=5` 與 `app.js?v=7` 版次參數升級，通知瀏覽器拉取新邏輯。
*   修改檔案：[generate_audio.js](file:///D:/MyGitHub/my_musics/generate_audio.js)
    *   將上限調整為 20，用以生成全新的 6 個測試靜音音檔。

---

## 🧪 驗證與測試結果

### 1. 語法正確性校驗
在終端機中執行編譯檢查命令：
```powershell
node -c albumData.js
node -c app.js
```
*   **結果**：編譯順利通過，均無語法錯誤（Syntax OK）。

### 2. 實際音檔時長探測結果
我們利用 `ffprobe` 工具探測了最新上傳之 `track15.mp3` ~ `track20.mp3` 的實際時長，並更新至資料庫中：
*   **Track 15 (未撥通的電話)**: `104.83` 秒 ➔ **`1:45`** (已更新)
*   **Track 16 (下過雨的屋簷)**: `137.95` 秒 ➔ **`2:18`** (已更新)
*   **Track 17 (重逢的十字路口)**: `119.11` 秒 ➔ **`1:59`** (已更新)
*   **Track 18 (收音機裡的舊情歌)**: `125.66` 秒 ➔ **`2:06`** (已更新)
*   **Track 19 (自言自語的陽台)**: `126.96` 秒 ➔ **`2:07`** (已更新)
*   **Track 20 (在微光中降落)**: `157.15` 秒 ➔ **`2:37`** (已更新)

---

## 🚀 部署與啟動說明

1.  **本機預覽**：
    在專案根目錄執行 `npx serve`，在瀏覽器打開網頁。點擊右側的「專輯與歌手」選單，即可看到 20 首曲目的清單，點選播放可完整體驗落針、背景變色與歌詞手稿複製功能。
2.  **上傳 SUNO 音檔**：
    在 Suno AI 生成歌曲後，將對應的音檔命名為 `track15.mp3` 至 `track20.mp3` 覆蓋至 `assets/audio/` 資料夾即可完成正式版更新。

---

## 🔒 音檔防護與開發安全規則建立
*   **README 規範追加**：已在 [README.md](file:///D:/MyGitHub/my_musics/README.md) 尾端建立「開發安全與音檔防覆蓋規則」段落，明確規範測試音檔生成腳本的行為及 Git 還原方案。
*   **防覆蓋防禦代碼**：[generate_audio.js](file:///D:/MyGitHub/my_musics/generate_audio.js) 中正式導入了檔案存在性校驗 `if (!fs.existsSync(targetFile))`，以確保腳本運行時絕不覆蓋任何已存在的真實音檔。
*   **UI 更新日誌面板**：已在網頁右側的日記本中新增第四個頁籤 **「更新日記」 (pane-changelog)**，直接在介面上展示了 v2.0.0 (2026-06-06) 的更新記錄、Track 15-20 新增清單與實際時長，並將開發安全規則也同步 codify 寫入 UI 面板內作為公開的開發指示。
