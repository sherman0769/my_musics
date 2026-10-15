# my_musics 專案執行規則

適用範圍：`D:/MyGitHub/my_musics` 與其子目錄。使用者於 2026-10-15（台灣時間）正式採用「驗證預設唯讀、報告獨佔建立、前後雜湊驗收」。這是本專案規則，不代表全局規則或其他專案授權。

## 開始工作與保留原版

- 先讀本檔、`README.md`、`docs/MAINTENANCE.md` 及相關專輯帳本／交付證據，再檢查 Git 工作目錄與暫存區。
- 在寫入前建立獨立維護目錄，保存現有檔案的路徑、bytes、完整 SHA-256、Git 分類、HEAD 與暫存區狀態；備份本輪要修改的精確檔案，並保留原有工作目錄差異。
- 不把雜湊清單或 Git diff 說成完整檔案備份。未追蹤檔案不在 Git diff 中，必須另外列入清單。
- 保留原始音檔、專案內下載副本、正式資產、ZIP、生成帳本、交易、失敗證據、歷史報告與舊備份。不得覆寫、重新打包或刪除這些資料來完成例行維護。
- 僅修改任務白名單內的檔案。完成後重新計算基線檔案的完整 SHA-256，確認音檔／既有紀錄不變、沒有缺檔或未授權修改，並核對修改前備份。
- 若有後續其他人新增的修改，先比對差異；不得以整個目錄的 `git restore` 或覆蓋備份丟棄它們。

## 專輯驗證

沿用兩個專輯入口及其共用實作：

```powershell
node albums/slow-days/verify-release.cjs
node albums/city-lights/verify-release.cjs
node --test tests/release-validation.test.cjs
```

- 全站可繼續增加專輯，不得寫死全站只能有三或四張專輯；目標專輯以唯一 `id` 選取。
- 曲目以 ID 對應帳本；下載以 `selectedResult` 對應供應商結果，不依陣列順序或第一筆下載猜測選用版本。
- 核對曲名、來源 URL、曲目數、正式資料 SHA-256、專案內下載副本及正式音檔的 bytes／SHA-256，並確認歷史解碼證據完整。
- 每次本機完整驗證都重新執行 FFprobe／FFmpeg，確認音訊能完整解碼至宣告結尾，並明確記錄 `fullDecodePerformedThisRun`。工具不可用或檢查未完成時保留失敗／未知，不以舊報告冒充新結果。
- 驗證入口預設只輸出至終端，不改寫帳本、交易或報告。保存報告時使用 `--output 新檔名`，輸出目錄先建立，檔案以獨佔方式建立；既有路徑必須拒絕覆寫。
- `release-validation.json`、`public-verification.json`、`album.json` 與既有交付文件是歷史證據，不作為反覆覆寫的新驗收出口。
- `create-album`、`collect-ready`、`verify-download`、`finalize-ledger`、`build-release`、`integrate-site`、`complete-release` 屬製作／寫入流程，不能當成唯讀驗證重跑。

## 驗收邊界與失敗保存

- 音訊有聲與是否有人聲分欄：`audio_presence=has_sound|silent_or_near_silent|unknown`，`vocals=vocal|instrumental|unknown`。未聽審時人聲維持 `unknown`；ASR 無歌詞不等於純音樂。
- 本機技術通過不代表人工聽感、實際演唱內容、聲音身分、手機實機、公開頁面或發布核准。
- 公開驗證的檔案雜湊、HTTP Range、ZIP HEAD 大小與帳本 404 檢查，應與瀏覽器播放、ZIP 內容驗證及人工聽審分開記錄。
- 來源／檔案／外部交易狀態未知時先讀回，不重下載、重生成或重送。外部來源缺失只能如實記錄，不由目錄名稱或網址推測補值。
- 保留初次 FAIL、失敗簽章、修正內容及重驗結果。可回退試行失敗時回到已保留的穩定版本，同時保存失敗證據；通過也不自動升級為其他專案或全局規則。
- 日期說明用台灣時區；檔名可使用 UTC 時戳，但文件須清楚標示。
- 專案沒有 `package.json` 時，不執行或宣稱通過不存在的 npm build／lint；採用實際可執行的語法、回歸、音訊與保存檢查。

## Git 清單、部署與授權

- 使用者要求提交清單時，只整理精確路徑、狀態、大小、完整 SHA-256、分組理由及驗收結果；清單不等於 stage、commit 或 push 的授權。
- 暫存必須另有授權，僅使用核對過的精確檔案白名單，不使用 `git add .`。提交與推送也各依使用者的明確授權執行。
- 網站入口、專輯模組、下載頁、正式音檔與封面須成套列入，不能只保存引用入口而漏掉未追蹤資產。製作帳本、交易與下載副本另列為製作證據。
- Git 忽略與部署排除用途不同。保留 `.vercel/`、`.env*`、`node_modules/` 等既有忽略規則；不收集或提交憑證。
- `.vercelignore` 必須排除 `AGENTS.md`、`albums/`、`reports/`、`docs/`、`scripts/`、`tests/` 等內部規則、帳本、備份與維護資料。部署排除不能代替對 Git 遠端可見性的判斷。
- 這套規則不授權供應商生成、花費、登入、雲端入庫、部署、公開發布、刪除或變更其他專案；仍遵守使用者當次範圍及既有全局音樂／視覺規則。

## 採用證據

- 首次驗收：`reports/maintenance/20261015T112939Z/驗收結果.md`，80 首正式曲目完整解碼、120 個既有 MP3 與兩個 ZIP 雜湊保留、15 項回歸測試通過。
- 正式採用與 Git 清單：`docs/GIT_COMMIT_PLAN.md` 及 `reports/git-preparation/20261015T114229Z/`。舊報告中「待使用者決定」保留為歷史狀態，以本檔與當次明確採用指示為現行規則。
