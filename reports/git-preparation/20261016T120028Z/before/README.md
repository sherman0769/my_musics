# 微光邊界｜李詩民音樂故事播放器

以黑膠唱片、歌詞手稿與創作日記呈現李詩民的音樂作品。前端使用原生 HTML、CSS、JavaScript，另有選用的 Vercel 統計 API；沒有 npm 套件或編譯步驟。

本文件於 2026-10-16（台灣時間）更新第五、六張專輯；維護基礎文件於 2026-10-15 校正。歷史上線紀錄與本輪本機驗收分開保存；文件更新不代表已重新部署。

專案已正式採用「驗證預設唯讀、報告獨佔建立、前後雜湊驗收」，完整規則見 [AGENTS.md](AGENTS.md)。精確提交候選與保存分類見 [Git 提交清單](docs/GIT_COMMIT_PLAN.md)；清單不代表已暫存、提交或推送。

## 目前收錄

| 專輯 ID | 專輯 | 曲目 | 音檔總長 | 本機狀態 |
| --- | --- | ---: | --- | --- |
| `glimmer-boundaries` | 微光邊界 | 20 | 40:59.808 | MP3、歌詞、故事、提示詞齊全；來源作品 ID 與生成紀錄待補 |
| `zeguoxixiang-girl` | 澤國西鄉的女孩 | 20 | 33:28.704 | 20 個有聲 MP3，並非靜音佔位；發行日期、來源與演唱內容待確認 |
| `slow-days` | 把日子唱慢一點 | 20 | 64:24.696 | 來源帳本、下載副本、正式 MP3、封面、下載頁與 ZIP 齊全 |
| `city-lights` | 城市替我們留燈 | 20 | 64:05.328 | 來源帳本、下載副本、正式 MP3、封面、下載頁與 ZIP 齊全 |
| `places-to-go` | 我還想去的地方 | 20 | 57:39.192 | 2026-10-16 本機製作；Suno V6、本人 Voice；未試聽、未發布 |
| `words-to-say` | 有些話，現在想說 | 20 | 60:17.232 | 2026-10-16 本機製作；Suno V6、本人 Voice；未試聽、未發布 |

六張共 120 首均有歌詞、故事與創作提示。第三、四張保留歷史 Suno V6 與本人 Voice 紀錄；第五、六張於 2026-10-16 核對登入帳號與既有本人 Voice，保存 80 個候選來源、40 首選定原始 MP3。依使用者要求未試聽，每首任選一個版本下載。本輪使用 400 點生成額度及 40 首下載額度，完成後帳號剩 9,534 點、6 首下載；這是當時讀值，後續查額度須重新讀回。音訊有聲與是否有人聲分開記錄；技術通過不代表逐首聽感、實際歌詞、聲音身分或藝術接受通過。

## 目錄與現有功能

```text
index.html / style.css / app.js    播放器、黑膠動畫、響應式介面與分享
albumData.js                       第一、二張資料及六張專輯入口
slowDaysAlbum.js / cityLightsAlbum.js
                                   第三、四張供播放器讀取的資料
placesToGoAlbum.js / wordsToSayAlbum.js
                                   第五、六張供播放器讀取的資料
assets/audio/                      第一張正式音檔
assets/audio/<album-id>/            其他專輯正式音檔；第三至六張另含 ZIP 與來源清單
assets/images/                     歌手照片、專輯封面、逐曲插圖與 App 圖示
albums/slow-days/ / albums/city-lights/
                                   製作帳本、交易、下載副本、歷史報告及製作工具
albums/places-to-go/ / albums/words-to-say/
                                   新專輯帳本、生成備註、交易及原始下載保存副本
api/stats.js                       瀏覽與播放統計 API（需要 Redis 設定）
manifest.json / sw.js               PWA 安裝資訊與靜態資源快取
scripts/lib/                       共用驗證工具
tests/                             驗證工具回歸測試
docs/                              維護、保存與驗收說明
reports/maintenance/                每輪基線、修改前備份及新增驗收結果
```

播放器已有專輯切換、播放與暫停、上下首、隨機與循環、進度拖曳、音量、歌詞與故事頁籤、創作提示複製，以及單曲／專輯分享。第三至六張專輯提供單曲下載及整張 ZIP。

2026-10-16 新增專輯的交付與驗收見 [雙專輯交付報告](reports/album-production/20261016T091134Z/交付與驗收.md)。本輪僅在本機加入第五、六張，未暫存、未新增 Git 提交、未推送、未部署；保留所有既有音檔、ZIP 與歷史紀錄。新專輯驗證入口：`node albums/places-to-go/verify-release.cjs`、`node albums/words-to-say/verify-release.cjs`，沿用唯讀預設及新檔名獨佔輸出規則。

PWA 快取主要保存介面資源，不等於已支援全專輯離線播放。統計 API 需要 `KV_REST_API_URL` / `KV_REST_API_TOKEN` 或對應的 `UPSTASH_REDIS_REST_*` 環境變數；未設定或服務失效時，前端使用本機統計。不可在前端或版本庫放入憑證。

## 本機預覽與驗證

在專案根目錄啟動僅綁定本機的靜態伺服器（需要 Python）：

```powershell
python -m http.server 8767 --bind 127.0.0.1
```

開啟 `http://127.0.0.1:8767/?album=city-lights&track=1`。可替換專輯 ID 與曲序；下載頁為 `slow-days-downloads.html`、`city-lights-downloads.html`。靜態伺服器不執行 `api/stats.js`。

本機專輯驗證需要 Node.js、FFprobe 與 FFmpeg，會重新核對來源副本／正式音檔的 SHA-256、來源對應、檔案大小及完整解碼至結尾：

```powershell
node albums/slow-days/verify-release.cjs
node albums/city-lights/verify-release.cjs
node --test tests/release-validation.test.cjs
```

以上驗證預設只把結果輸出到終端，不會改寫帳本或歷史報告。需要保存時指定新的檔名：

```powershell
node albums/slow-days/verify-release.cjs --output reports/slow-days-check-NEW.json
```

輸出目錄須先存在；`--output` 拒絕覆寫任何既有檔案。後續再次驗收請使用新檔名，保留先前成功與失敗證據。

## 新增或維護專輯

沿用現有 `albumsData` 結構，以唯一 `id` 加入新專輯。曲目保留 `id`、`title`、`filename`、`audioSrc`、`duration`、`image`、`story`、`lyrics`、`sunoPrompt`，有來源證據時再填 `sourceUrl` 與 `sha256`；未知資料不要推測填入。

新生成音樂另保存逐候選的生成備註、供應商結果 ID、實際來源頁、完整提示詞／歌詞、狀態、原檔 bytes 與 SHA-256。`audio_presence` 與 `vocals` 分欄，未聽審的人聲保持 `unknown`。共用音樂庫入庫須先依雲端規則、完整最新索引與 READY 批次去重；本次維護沒有執行入庫。

涉及圖片時遵守台灣人物預設及有向表面檢查，素材選定與成品代表畫面各檢查一次。

## 保存與發布邊界

- 原始音檔、下載副本、ZIP、交易與歷史報告保留原樣。不得以佔位檔覆蓋既有歌曲。
- `generate_audio.js` 是舊測試工具，實際產生的是使用 `.mp3` 副檔名的短 WAV 佔位資料，不是 AI 音樂生成器；雖會跳過既有檔案，仍不應用它修補正式專輯。
- `create-album`、`collect-ready`、`verify-download`、`finalize-ledger`、`build-release`、`integrate-site`、`complete-release` 是製作／寫入工具，不是唯讀驗證；不可為了重驗歷史成果直接重跑。
- 本次新增驗收不回寫 `album.json`、`release-validation.json`、`public-verification.json` 或既有交付報告；歷史結論只代表當時驗收。
- 不使用整個音訊目錄的 `git restore` 回復問題；它可能丟失後續未提交成果。先比對精確檔案與雜湊，再從已核對的副本恢復。
- `.vercelignore` 排除內部帳本、報告、備份與維護程式。重新部署前需確認排除範圍，避免公開交易紀錄。

本地保存盤點見 [維護與保存說明](docs/MAINTENANCE.md)。本輪開始時，Git 最後提交為 `882c332`（2026-06-14），有五個已追蹤檔案修改及 305 個未追蹤檔案；後兩張專輯尚未完整納入 Git。這是本地觀察，沒有執行 fetch、提交或推送，也不能據此判斷遠端最新狀態。

歷史正式網址為 https://mymusics-olive.vercel.app/，後兩張保留 2026-09-15（台灣時間）的公開驗收證據。本輪未重新驗證公開網站、手機實機或部署狀態。公開檢查可用 `verify-public.cjs <base-url> [--output 新檔名]`，其範圍是 HTTP 檔案、Range、ZIP 大小與帳本隔離，不代表瀏覽器播放或人工聽審通過。
