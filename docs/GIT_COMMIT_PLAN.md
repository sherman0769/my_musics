# Git 提交候選清單

## 最新清單入口（2026-10-16，台灣時間）

兩張新專輯《我還想去的地方》《有些話，現在想說》與本機橋接規則的候選，見 [2026-10-16 Git 提交清單](GIT_COMMIT_PLAN_20261016.md)。狀態為 `prepared_not_staged`；本次未暫存、提交、推送或部署。

以下保留 2026-10-15 提案原文作為歷史紀錄。該提案後來已建立三筆本機提交：`9ca912e81b0304abe7b1f5730e2add635bd186b8`、`1cdabe758ff386c39c8fff749be599da93cbb6e3`、`559d1db3944a35b8e21dbfd6c1f5be3fe806ccfd`；下方「未暫存」為提案當時狀態，不代表這三筆尚未提交。這三筆不屬本次新增提交候選。

## 2026-10-15 歷史提案

日期：2026-10-15（台灣時間）。狀態：prepared_not_staged。使用者要求只整理清單，不暫存、不提交、不推送。

正式驗證規則已納入根目錄 [AGENTS.md](../AGENTS.md)，採用範圍限本專案。原驗收與 FAIL 紀錄保持原樣；本輪沒有新增流程試行。

## 建議提交順序

| 順序 | 建議 commit message | 精確路徑數 | 內容 |
| --- | --- | ---: | --- |
| 1 | `feat(albums): add slow-days and city-lights releases` | 56 | 網站與正式專輯成果；含部署排除設定，避免後續製作證據被部署。 |
| 2 | `chore(archive): preserve album production evidence` | 250 | 兩張專輯的製作帳本、交易、下載副本、既有備份與交付紀錄，以及根目錄歷史方案。 |
| 3 | `chore(maintenance): adopt read-only verification rules` | 47 | 正式規則、校正文件、共用驗證工具、四個入口、回歸測試與兩輪維護證據。 |

三組共 353 個路徑，沒有重複或漏列；包含本文件與本輪產生的清單／驗收控制檔。完整逐檔清單與 SHA-256 見 [commit-plan.json](../reports/git-preparation/20261015T114229Z/commit-plan.json)。

### 01：網站與正式專輯成果

- 五個既有修改：albumData.js、app.js、index.html、style.css、sw.js。
- slowDaysAlbum.js、cityLightsAlbum.js、兩個下載 HTML。
- assets/audio/slow-days/ 與 assets/audio/city-lights/ 中共 40 個 MP3、兩個 ZIP 與兩份歌曲來源 JSON。
- 兩張封面 PNG。
- .vercelignore：保留既有排除，加入規則與維護資料排除。
- 本組合計 353.46 MiB；精確路徑見 [commit-01-paths.txt](../reports/git-preparation/20261015T114229Z/commit-01-paths.txt)。

### 02：製作證據與歷史文件

- albums/slow-days/ 與 albums/city-lights/ 的帳本、121 份交易 JSON、40 個下載副本與其 README、生成／製作工具、舊備份及歷史驗收報告。
- 四個 verify-release／verify-public 入口留到第三組，和共用實作一起保存，避免只存入口卻漏掉依賴。
- implementation_plan.md、walkthrough.md 保留為歷史資料，不作為現況規格。
- 本組合計 173.15 MiB；精確路徑見 [commit-02-paths.txt](../reports/git-preparation/20261015T114229Z/commit-02-paths.txt)。

### 03：正式規則、驗證工具與維護證據

- AGENTS.md、README.md、docs/MAINTENANCE.md、本清單文件。
- scripts/lib/release-validation.cjs、tests/release-validation.test.cjs，以及兩張專輯共四個驗證入口。
- reports/maintenance/20261015T112939Z/ 的基線、修改前備份、初次失敗、重驗與最終收據。
- reports/git-preparation/20261015T114229Z/ 的本輪基線、修改前備份、測試輸出、提交清單與驗收紀錄。
- 精確路徑見 [commit-03-paths.txt](../reports/git-preparation/20261015T114229Z/commit-03-paths.txt)。第三組的實際專輯驗證依賴前兩組的音檔與帳本。

## 大小與保存說明

候選新增音檔 80 個（40 正式曲目＋40 專案內下載副本），ZIP 2 個；新增二進位資產共約 524.99 MiB。沒有刪除重複來源副本、重打包、改用 LFS 或搬移檔案。這些選擇會增加 Git 歷史大小；本清單保留使用者要求的原始資產與證據。

第一、二張既有的 40 個音檔已追蹤且未變更，因此不需要再列為本次新增。所有 120 個專案內 MP3 與兩個 ZIP 仍須與原維護基線核對。帳本指向的 40 個外部 .crdownload 路徑在先前盤點開始時已不存在；不觸發重下載。

製作紀錄與本地報告包含作品／Voice ID、帳號別名、本機路徑及歷史點數，Git 遠端可見性未重新查詢；.vercelignore 只控制部署內容，不控制 Git 遠端。憑證、.env*、.vercel/、node_modules/ 沿用忽略，沒有列入候選。

## 清單格式與使用邊界

每組有可閱讀的 UTF-8 paths.txt 與給 Git pathspec-from-file 使用的 NUL 分隔 paths.nul；全部是精確檔案，不使用目錄遞迴或萬用字元。這些檔案只是提案，沒有執行 git add。未來若授權暫存，先重新核對 SHA-256 與工作目錄差異，使用 literal pathspec，再讀回暫存區；不要直接套用已過期的清單。

commit-plan.json 的一般候選含完整 SHA-256；八個清單／驗收控制檔因互相引用，以 control_artifact 標記並不放入自身雜湊。validation.json 另保存當輪檢查及其餘七個控制檔的雜湊，避免偽造自我雜湊。

## 驗收

本輪重跑 15 項回歸測試；其餘語法、文件連結、部署排除、來源保留、檔案清單覆蓋、常見憑證樣式與 Git 狀態核對結果見 [validation.json](../reports/git-preparation/20261015T114229Z/validation.json)。常見樣式掃描只是一項有限的本地檢查，不代表完整安全稽核。

前輪 80 首完整解碼結果保留，本輪以 SHA-256 確認其音檔與驗證實作未變，沒有重複執行全部媒體解碼。未執行 fetch、stage、commit、push、供應商操作、共用庫入庫或部署。
