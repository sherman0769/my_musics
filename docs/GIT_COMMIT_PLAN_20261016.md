# 2026-10-16 Git 提交候選清單

日期：2026-10-16（台灣時間）。狀態：`prepared_not_staged`。目前分支 `main`，HEAD 為 `559d1db3944a35b8e21dbfd6c1f5be3fe806ccfd`；暫存區為空。本次只完成規則採用與清單，未暫存、提交、推送或部署。

## 建議三組順序

| 組別 | 建議 commit message | 精確路徑數 | 內容 |
| --- | --- | ---: | --- |
| 01 | `feat(albums): add places-to-go and words-to-say releases` | 53 | 成套保存兩張新專輯網站入口、模組、下載頁、40 首正式音檔、兩個 ZIP、來源資料與封面。 |
| 02 | `chore(archive): preserve new album generation records` | 213 | 保存兩專輯帳本、80 候選備註、交易、40 份原始下載副本及唯讀驗證入口。 |
| 03 | `chore(workflow): adopt local album bridge and preserve verification evidence` | 116 | 正式化已核准流程並保存製作／失敗證據、本次原版備份、提交白名單與驗收。 |

共 **382 個精確檔案路徑**，沒有重複。第一組網站檔須整組保存；第二組的兩個驗證入口依賴已提交的共用實作，實際驗證另需第一組正式音檔。第三組 README 引用前兩組成果，三組應依序完成。這是提案，尚未建立新提交。

## 精確清單與雜湊

- [完整 commit-plan.json](../reports/git-preparation/20261016T120028Z/commit-plan.json)：逐檔 Git 狀態、bytes、完整 SHA-256、分組理由及驗收引用。
- 第一組：[paths.txt](../reports/git-preparation/20261016T120028Z/commit-01-paths.txt)、[paths.nul](../reports/git-preparation/20261016T120028Z/commit-01-paths.nul)。
- 第二組：[paths.txt](../reports/git-preparation/20261016T120028Z/commit-02-paths.txt)、[paths.nul](../reports/git-preparation/20261016T120028Z/commit-02-paths.nul)。
- 第三組：[paths.txt](../reports/git-preparation/20261016T120028Z/commit-03-paths.txt)、[paths.nul](../reports/git-preparation/20261016T120028Z/commit-03-paths.nul)。
- [本輪驗收](../reports/git-preparation/20261016T120028Z/驗收結果.md)、[詳細核對](../reports/git-preparation/20261016T120028Z/preparation-checks.json)、[凍結清單驗收](../reports/git-preparation/20261016T120028Z/validation.json)。

TXT 為 UTF-8、逐行精確路徑，NUL 版可供未來授權後配合 Git literal pathspec 使用。未執行 git add，沒有目錄遞迴或萬用字元。未來若獲暫存授權，必須重新核對當時 SHA／bytes／狀態，不能直接套用過期清單。

一般候選均有完整 SHA-256。八個互相引用的控制檔（六份路徑檔、commit-plan.json、validation.json）以 `control_artifact` 標記，清單內自身 bytes／SHA 為 null，避免循環自我雜湊；validation.json 另記其餘七檔的最終 bytes／完整 SHA。validation.json 不假造自身雜湊，後續暫存前仍需取得當時完整 SHA。

## 原檔、失敗與既有報告

兩張新專輯的 40 份正式 MP3、40 份專案保存副本及兩個正式 ZIP 全部列入；使用者 Downloads 中另 40 份原檔保持原位，重新核對 SHA，但不在儲存庫路徑中。第三組保留第一版失敗 ZIP、PowerShell 5.1 失敗腳本、恢復意圖、逐次瀏覽器快照、原版備份及技術驗收。未重新打包、轉檔或刪除副本。最大單檔與各組 bytes 見 JSON；Git 物件實際壓縮／去重後大小未估算。

另有 **55 個既有未追蹤檔案**位於 reports/git-staging/、reports/git-commits/、reports/push-plan/，屬先前其他輪次 Git 作業的保存報告；見 [deferred-files.json](../reports/git-preparation/20261016T120028Z/deferred-files.json) 的精確路徑、bytes 與完整 SHA。它們保持原樣，未混入這次候選，也未忽略或刪除。

原有三筆本機提交（9ca912e、1cdabe7、559d1db）保持原樣，不重複列為新增提交。舊 [2026-10-15 提案](GIT_COMMIT_PLAN.md) 原文及已完成狀態另存，沒有把歷史待決定欄位改寫成當時已採用。

## 可見性與驗收邊界

製作紀錄含帳號別名、作品／Voice ID、本機路徑及歷史點數。先前 2026-10-15 的遠端／部署規劃曾確認 GitHub 儲存庫為公開且 Git 推送可能觸發 Vercel 部署；本輪未連線重新查詢，當前遠端與自動部署設定不作新確認。`.vercelignore` 排除內部資料只控制部署，不控制 Git 遠端可見性。`.env*`、`.vercel/`、`node_modules/` 不列入候選；常見憑證樣式檢查只是有限掃描。

本輪重新核對基線、音檔／ZIP、原始下載、製作清單與證據雜湊，未重新解碼或試聽。保留前一製作輪 40 首完整解碼、46 項 ZIP 內容 SHA、15 項回歸測試及本機瀏覽器結果，並確認相關檔案／驗證實作未變；不可把沿用證據稱為本輪重跑。沒有 package.json，npm build／lint 不適用。人工聽感、實際人聲／聲音身分、手機與公開發布仍未驗收。

本次沒有新流程試行，只把使用者已核准的本機橋接方式正式納入 [AGENTS.md](../AGENTS.md) 與 [製作流程](LOCAL_ALBUM_BRIDGE.md)，範圍限本專案。
