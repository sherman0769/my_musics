# 《微光邊界 (Glimmer Boundaries)》個人音樂故事專輯網頁

這是一個專為歌手**李詩民**設計的沉浸式音樂故事專輯網頁。結合了**復古黑膠唱片機的實體互動**與**日記本故事手稿**的雙欄排版，14 首關於生命哲學、自我救贖的歌首尾相連，帶給聽眾都市療癒體驗。

---

## 📂 專案檔案結構

本專案採用純原生 Web 技術 (HTML5 / CSS3 / Vanilla JS) 撰寫，無須任何編譯步驟，具有 100% 跨平台相容性與極佳的加載速度。

```
my_musics/
├── assets/
│   ├── audio/          <- 🎵 放置 14 首 SUNO 生成的 MP3 音檔 (目前為測試靜音檔)
│   │   ├── track01.mp3
│   │   ├── track02.mp3
│   │   └── ...
│   └── images/         <- 📸 存放歌手李詩民的寫真照片 (自動關聯至各曲目封面)
│       ├── singer_1.png
│       ├── singer_2.jpg
│       ├── singer_3.jpg
│       ├── singer_4.png
│       └── singer_5.png
├── index.html          <- 📄 網頁主結構 (含 SEO 優化、Google Fonts)
├── style.css           <- 🎨 精緻毛玻璃、黑膠旋轉與唱針落針動畫樣式
├── albumData.js        <- 🗃️ 14 首歌曲的歌詞、Suno Prompt 與故事背景資料庫
├── app.js              <- ⚙️ 播放器核心邏輯、落針延遲、流動背景色調控制
├── generate_audio.js   <- 🛠️ (選用) 重新生成測試音檔的 Node.js 腳本
└── README.md           <- 📘 本使用說明文檔
```

---

## 🎵 如何將 SUNO 生成的歌曲上傳至網頁？

您只需在 SUNO 生成並下載 MP3 後，將檔案更名並覆蓋到 `assets/audio/` 目錄下對應的檔名即可：

| 軌道 (Track) | 歌名 | 對應音檔檔名 (放在 `assets/audio/` 中) | 建議 SUNO 曲風風格 (Style of Music) |
| :---: | :--- | :--- | :--- |
| **01** | 光斑的起點 | `track01.mp3` | `Lo-Fi Indie Pop, gentle acoustic guitar, reflective male vocals, 80bpm` |
| **02** | 與孤獨共處的早晨 | `track02.mp3` | `Acoustic Folk, warm piano, soft percussion, intimate male vocals` |
| **03** | 玻璃車窗的倒影 | `track03.mp3` | `Chillhop, electric piano, steady hip-hop beat, smooth vocals` |
| **04** | 無聲的對白 | `track04.mp3` | `Indie R&B, mellow synth pads, expressive male vocals` |
| **05** | 三十度午溫 | `track05.mp3` | `Neo-Soul, jazzy electric guitar, lazy groove, laid-back vocals` |
| **06** | 雨天收音機 | `track06.mp3` | `Acoustic Ballad, rain sound FX background, warm nostalgic vocals` |
| **07** | 被隱藏的履歷 | `track07.mp3` | `Alternative Indie, driving bassline, melancholic build` |
| **08** | 黃昏的夾縫 | `track08.mp3` | `Dream Pop, ethereal synths, spacious drums, reverb-drenched vocals` |
| **09** | 便利商店的微光 | `track09.mp3` | `Cozy Lo-Fi, electric keyboard, warm bass, mellow vocals` |
| **10** | 失眠三點半 | `track10.mp3` | `Dark Lo-Fi, slow melancholy piano, intimate whispery male vocals` |
| **11** | 給內心小孩的信 | `track11.mp3` | `Ambient Folk, fingerpicking acoustic guitar, soft string section` |
| **12** | 時間的刻度 | `track12.mp3` | `Slow Rock, emotional electric guitar swell, powerful climax` |
| **13** | 傷疤與盔甲 | `track13.mp3` | `Uplifting Indie Pop, acoustic drums, bright acoustic guitar, hopeful chorus` |
| **14** | 晨曦的預演 | `track14.mp3` | `Warm Acoustic Pop, swelling strings, hopeful piano, clear triumphant vocals` |

> 💡 **小撇步**：在網頁的 **「歌詞 & Prompts」** 頁籤中，點選右上角的 **「複製創作 Prompt」** 按鈕，系統會自動將該首歌曲的 **曲風風格 (Style)**、**創作引導 (Prompt)** 與 **完整中文原創歌詞** 合併複製到您的剪貼簿，讓您直接貼入 SUNO 進行快速創作！

---

## 📸 歌手肖像與專輯封面關聯

網頁會自動為不同歌路匹配您上傳的李詩民寫真照（已放置於 `assets/images/`），並在黑膠唱片旋轉時展示：
- 核心封面、清晨與清晨黎明 (Track 1, 14)：使用正面寫真 `singer_3.jpg`。
- 其他溫暖、自省、放空曲目：穿插輪替 `singer_1.png` (側臉暖色)、`singer_2.jpg` (側臉柔和)、`singer_4.png` (黑白自省)、`singer_5.png` (黑白哲學)。

如果您想更換預設頭像或封面，可直接將新相片命名為上述檔名進行覆蓋。

---

## 🚀 如何在本機運行與測試？

### 方法一：雙擊開啟（最簡單）
直接在資料夾中雙擊 `index.html` 即可在瀏覽器中開啟並體驗。

### 方法二：使用本地輕量伺服器（推薦，體驗更佳）
為了讓瀏覽器的音訊加載更流暢、相容性更好，建議使用本地 Web 伺服器：
1. 在專案目錄 `my_musics/` 下打開終端機 (Terminal)。
2. 執行以下指令開啟伺服器：
   ```bash
   npx serve
   ```
3. 在瀏覽器中輸入終端機顯示的網址 (例如 `http://localhost:3000`) 即可瀏覽。

---

## 🎨 網頁動態美學亮點
1. **黑膠唱針落針延遲**：當您點擊播放，唱針會慢慢移到唱片上方落下（耗時 0.9 秒），接著黑膠碟片開始旋轉、音樂同時響起，完美重現真實黑膠機運作時的儀式感。
2. **情感流動微光背景**：當切換 14 首不同主題的歌曲時，網頁背景大片磨砂毛玻璃微光會緩緩流動變色（如清晨是暖陽粉、雨天是憂鬱藍灰色、深夜是靛藍色），與李詩民的歌聲情緒完美契合。
3. **響應式排版**：全面支援電腦與手機版。在手機上會自動轉化為精緻的「上下佈局」，黑膠大小按比例縮放，觸控進度條、音量條皆流暢實用。

---

## 🌐 線上部署指南

由於本專案為**純靜態網頁（Vanilla HTML/CSS/JS）**，不需要任何伺服器端運行環境，因此非常適合部署在免費的靜態網頁託管平台，如 **GitHub Pages** 或 **Vercel**。

### 方案一：部署至 GitHub Pages (免費、穩定)

GitHub Pages 是將專案託管於 GitHub 儲存庫時最方便的靜態部署方案。

1. **建立 GitHub 儲存庫 (Repository)**：
   - 登入 [GitHub](https://github.com/)，點選右上角的 **New repository**。
   - 命名您的專案（例如：`my_musics`），設為 **Public**，然後點選 **Create repository**。

2. **上傳程式碼**：
   - 在本機專案根目錄下初始化 Git 並推送至 GitHub：
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Li Shimin Web Album"
     git branch -M main
     git remote add origin https://github.com/您的GitHub帳號/my_musics.git
     git push -u origin main
     ```

3. **啟用 GitHub Pages 服務**：
   - 進入該儲存庫的 **Settings** 頁面。
   - 在左側選單中找到並點選 **Pages**。
   - 在 **Build and deployment** 下的 **Source** 選擇 `Deploy from a branch`。
   - 在 **Branch** 選擇 `main` 分支與 `/ (root)` 資料夾，點選 **Save**。
   - 約等待 1-2 分鐘，頁面頂部會出現部署成功的綠色網址（例如：`https://您的GitHub帳號.github.io/my_musics/`）。

> [!NOTE]
> **PWA 支援說明**：GitHub Pages 預設強制啟用 **HTTPS 協議**，這能確保網頁的 **Service Worker (sw.js)** 與 **PWA 手機安裝功能** 完美發揮作用（iOS/Android 皆可正常彈出安裝提示）。

---

### 方案二：部署至 Vercel (推薦，最簡單快速)

Vercel 提供極佳的全球加速（CDN）與最簡單的一鍵部署體驗，非常適合前端開發。

1. **註冊並登入 Vercel**：
   - 前往 [Vercel 官網](https://vercel.com/)，選擇使用您的 **GitHub 帳號** 直接登入。

2. **匯入專案**：
   - 點選右上角的 **Add New...** 選擇 **Project**。
   - 在 Git 儲存庫列表中，找到您剛才上傳的 `my_musics` 儲存庫，點選右側的 **Import**。

3. **配置與部署**：
   - 在 **Configure Project** 頁面中：
     - **Framework Preset**（框架預設）選擇 `Other`（因為本專案是純 HTML/JS 專案，無須編譯）。
     - **Build and Output Settings**（編譯與輸出路徑）保持預設值即可。
   - 點選下方的 **Deploy** 按鈕。
   - 系統將於 10 秒內完成部署，並附帶精美的撒花特效與您專屬的免費預覽網址（例如 `https://my-musics-xxx.vercel.app`）。

> [!TIP]
> 部署完成後，只要您本機代碼有更新並 `git push` 到 GitHub，Vercel 就會自動偵測並在背景重新部署，完全不需手動操作！

