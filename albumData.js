// 專輯資料庫 - 微光邊界 (Glimmer Boundaries)
// 歌手：李詩民
// 20首歌曲的完整結構，包含歌名、Suno創作提示、背景故事、原創歌詞、以及音檔路徑

const albumData = {
  albumTitle: "微光邊界 (Glimmer Boundaries)",
  artist: "李詩民",
  artistBio: "李詩民，都市裡的聲音觀察者。用溫暖而略帶沙啞的男聲，唱出喧囂中的孤獨、掙扎與最終的自我和解。這是一張關於生命哲學、心靈尋回與自我救贖的音樂日記，陪伴每一個在黑夜中尋找光芒的靈魂。20首歌首尾相連，構成了一趟完整的療癒旅程。",
  coverImage: "assets/images/singer_3.jpg", // 預設使用正面半身照作為專輯封面
  tracks: [
    {
      id: 1,
      title: "光斑的起點",
      filename: "track01.mp3",
      duration: "2:02",
      sunoPrompt: {
        style: "Lo-Fi Indie Pop, gentle acoustic guitar, reflective male vocals, 80bpm, warm tone",
        lyricsPrompt: "寫一首關於都市清晨、戴上面具去迎合社會的無奈，以及內心深處渴望真實自己的民謠歌曲。"
      },
      story: "清晨六點的台北，陽光穿過高樓大廈的縫隙，在水泥路上灑下稀落的光斑。李詩民站在十字路口，看著紅綠燈變換，周圍是行色匆匆的人群。我們每天都在練習微笑，練習成為別人期待的樣子。這首歌是整張專輯的起點，記錄了那個在喧囂中，突然想脫下防備、尋找真實自我的瞬間。",
      lyrics: `[Verse]
清晨的捷運站 塞滿了疲憊的臉
我整理好衣領 練習著微笑的弧線
皮鞋敲擊地面 像倒數的計時器
今天 又要扮演哪一個自己？

[Verse 2]
咖啡的蒸氣 模糊了鏡片上的霧
每一步都像 走在設定好的地圖
別人都說 這就是長大的代價
可我心裡 那個小孩還在害怕

[Chorus]
這光斑的起點 我們並肩卻又遙遠
戴上了面具 遮蓋了昨夜的哈欠
在人潮洶湧的街 尋找一個安全界線
有誰能看見 我眼底那一絲迷惘的微光？
有誰能在意 我面具下真實的模樣？

[Outro]
第一道光 照在臉上
我閉上眼 試著歌唱`
    },
    {
      id: 2,
      title: "與孤獨共處的早晨",
      filename: "track02.mp3",
      duration: "2:08",
      sunoPrompt: {
        style: "Acoustic Folk, warm piano, soft percussion, intimate male vocals, relaxing tempo",
        lyricsPrompt: "寫一首溫馨、緩慢的民謠，描述一個人在家煮咖啡、整理房間，並在安靜中與孤獨達成和解。"
      },
      story: "週末的早晨，沒有鬧鐘的催促。陽光靜靜照在木質地板上，手沖壺的熱水緩緩注入咖啡粉，散發出微酸的豆香。李詩民在這首歌中展現了孤獨的另一面——它不是寂寞，而是一段與自己親密對話的時光。學會享受這份安靜，是自我療癒的第一步。",
      lyrics: `[Verse]
沒有鬧鐘的週末 陽光在地板上爬行
手沖壺的水溫 剛好是九十度的安靜
咖啡豆在細磨中 釋放出深邃的香氣
這一個人的空間 其實並不需要言語

[Verse 2]
收起昨晚散落的書 擦淨桌上的微塵
窗外麻雀在對話 叫醒了沉睡的靈魂
以前總害怕安靜 總想往人群裡逃奔
現在才懂得 孤獨是送給自己的溫存

[Chorus]
我與孤獨共處的早晨 聽見呼吸的聲音
不用討好誰的眼神 找回失落的重心
這一杯黑咖啡的苦澀 藏著回甘的命運
在最安靜的角落 遇見最真實的靈魂

[Outro]
陽光照亮了杯底
我對自己 輕聲說句 沒關係`
    },
    {
      id: 3,
      title: "玻璃車窗的倒影",
      filename: "track03.mp3",
      duration: "1:47",
      sunoPrompt: {
        style: "Chillhop, electric piano, steady hip-hop beat, smooth reflective male vocals, 85bpm",
        lyricsPrompt: "寫一首節奏感強但氛圍慵懶的歌曲，描寫捷運通勤時，看著車窗倒影，反思自己是否在假裝堅強。"
      },
      story: "週一的通勤捷運，車廂內擠滿了低頭看手機的乘客。看著車窗玻璃上自己有些模糊、疲憊的倒影，突然產生了一種陌生感。我們是不是都在扮演一個「我很堅強、我很好」的角色？這首歌探討了現代人的「冒名頂替者症候群」，承認自己的脆弱，也是一種勇氣。",
      lyrics: `[Verse]
捷運在黑暗的隧道裡 急速奔馳
搖晃的車廂 裝載著多少人的心事
我盯著黑色玻璃 映射出自己的雙眼
那張疲憊的臉 是否也讓你感到陌生？

[Verse 2]
旁邊西裝革履的人 講著流利的英文
對面的女孩 補著精緻的妝容
我們都偽裝得 像個完美的成年人
卻在無人的深夜 數著心裡的傷痕

[Chorus]
玻璃車窗的倒影 照出誰的假裝？
我們在社會的洪流裡 拼命追逐著方向
如果撐不住了 能不能卸下武裝？
在那層反光的玻璃背後 其實大家都一樣
一樣有迷惘 一樣渴望被原諒

[Outro]
車門打開 光線進來
倒影消失 我收起無奈`
    },
    {
      id: 4,
      title: "無聲的對白",
      filename: "track04.mp3",
      duration: "1:45",
      sunoPrompt: {
        style: "Indie R&B, mellow synth pads, expressive male vocals, emotional, slow groove",
        lyricsPrompt: "寫一首感性的R&B，關於手機裡那條沒有傳送出去的訊息，描寫現代人際關係中的「無聲疏離」。"
      },
      story: "在通訊軟體裡打了一長串字，最後卻默默按下刪除鍵。李詩民寫下這首歌，獻給那些在人際關係中選擇沉默的時刻。隨著年齡增長，許多友情和愛情並非因為爭吵而結束，而是在一次次的「算了」中漸漸淡去。這首歌是釋懷，也是對過往連結的溫柔告別。",
      lyrics: `[Verse]
對話框裡的字 刪了又改
那些沒說出口的話 終究石沉大海
我們在同一個城市 隔著螢幕的阻礙
只剩按讚的互動 算不算一種陪伴？

[Verse 2]
你最近的動態 去了遙遠的海邊
笑容依然燦爛 只是身邊換了張臉
我想問你過得好嗎 手指卻停在邊界
有些關係的終點 其實沒有告別

[Chorus]
這是我們無聲的對白 在通訊軟體的時代
用沉默來代替依賴 用已讀來整理無奈
不用再去追問 誰先轉身離開
默默祝福的關懷 是我最後的坦白

[Outro]
對話框 終究留白
祝你幸福 在微光之外`
    },
    {
      id: 5,
      title: "三十度午溫",
      filename: "track05.mp3",
      duration: "1:34",
      sunoPrompt: {
        style: "Neo-Soul, jazzy electric guitar, lazy groove, laid-back male vocals, midtempo",
        lyricsPrompt: "寫一首爵士風味、節奏悠閒的靈魂樂，描述中午在公園長椅上曬太陽、放空，暫時逃離工作壓力的心情。"
      },
      story: "正午十二點半的辦公區，氣溫三十度。李詩民拿著超商的三明治，走到附近的小公園。樹蔭下，微風吹過，他決定關掉手機的震動，放空十分鐘。這首歌提醒我們：在這個追求高效率的時代，適時的「無所事事」並非浪費時間，而是給心靈的一場充電。",
      lyrics: `[Verse]
三十度的午溫 樹葉在頭頂沙沙作響
手中的冰美式 溶解了早上的繁忙
皮鞋踩在草地上 感覺有些不自然
但我決定放任 自己在此刻偷懶

[Verse 2]
公事包放在一旁 手機關掉震動
看著天空的雲 緩慢而自由地漂流
那些開不完的會 和改不完的簡報
在這一刻 都不如樹上的麻雀重要

[Chorus]
就在這三十度的午溫 讓時間暫時停頓
不用去管業績的指標 忘記追逐的旅程
吸一口溫熱的空氣 找回遲鈍的體溫
有時候停下腳步 才是最勇敢的生存

[Outro]
微風吹過 樹影斑駁
十分鐘後 我再往前走`
    },
    {
      id: 6,
      title: "雨天收音機",
      filename: "track06.mp3",
      duration: "1:52",
      sunoPrompt: {
        style: "Acoustic Ballad, rain sound FX background, warm nostalgic male vocals, soft piano",
        lyricsPrompt: "寫一首在雨天氛圍下的民謠情歌，旋律優美，有雨聲背景，表達對逝去戀情的遺憾與溫柔回憶。"
      },
      story: "一場午後雷陣雨，把李詩民困在了街角咖啡館的雨棚下。咖啡館的收音機裡，正播放著一首老情歌。那一瞬間，記憶的閥門被打開，想起了那個曾經一起撐傘的人。這首歌融合了真實的雨聲，訴說著：有些人雖然不在身邊了，但他們留下的溫暖，依然在每一個雨天陪伴著我們。",
      lyrics: `[Verse]
天空突然陰沉 灑下大雨的顆粒
我站在屋簷下 聽雨水敲打水泥
街角咖啡館裡 傳來熟悉的旋律
那首我們最愛的歌 隔著時光在播送

[Verse 2]
你那把藍色的傘 總會向我傾斜
淋濕了你半邊肩膀 你卻笑得體貼
那些幼稚的誓言 早已隨雨水蒸發
可你給過的溫柔 依然在心裡發芽

[Chorus]
雨天收音機 播放著昨天的我們
在潮濕的空氣裡 翻開了塵封的劇本
雖然你已經走向 另一個人的旅途
這場大雨 依然溫暖了我的孤獨

[Outro]
雨 漸漸停了
收音機的歌 唱完了
謝謝你 曾來過`
    },
    {
      id: 7,
      title: "被隱藏的履歷",
      filename: "track07.mp3",
      duration: "1:57",
      sunoPrompt: {
        style: "Alternative Indie, driving bassline, melancholic build, passionate male vocals",
        lyricsPrompt: "寫一首帶有英倫搖滾風格的獨立歌曲，描述履歷表上寫不出的挫敗與心碎，才是塑造我們人格的真實經歷。"
      },
      story: "我們在求職平台上寫滿了輝煌的經歷：專案成功、技能證照、亮眼學歷。但李詩民認為，那些被我們隱藏起來的失敗——被拒絕的信件、搞砸的簡報、崩潰的夜晚——才是真正讓我們變得堅強的養分。這首歌用逐漸高亢的電吉他與貝斯，唱出對不完美自我的驕傲。",
      lyrics: `[Verse]
兩張A4紙 寫滿了精緻的字句
什麼專案成功 什麼卓越的數據
但我看著這張 完美的個人履歷
卻找不到 任何我活過的證據

[Verse 2]
那些被隱藏的 才是真實的經歷
被客戶拒絕的痛 被現實擊碎的夢
在深夜裡痛哭 卻還要準時打卡的瘋
這些狼狽的傷口 怎麼沒有被列入？

[Chorus]
這是被隱藏的履歷 記錄著我的失敗與堅持
雖然沒有亮眼的頭銜 卻刻著我活過的代價
每一次跌倒的泥濘 每一次心碎的痕跡
才是這具身體 真正驕傲的章節

[Outro]
擦乾汗水 修改字句
這一次 我為自己簽名`
    },
    {
      id: 8,
      title: "黃昏的夾縫",
      filename: "track08.mp3",
      duration: "2:16",
      sunoPrompt: {
        style: "Dream Pop, ethereal synths, spacious drums, reverb-drenched male vocals, 90bpm",
        lyricsPrompt: "寫一首夢幻流行音樂，描寫下班回家、夕陽西下時，身處在工作與自我之間的過渡地帶，感受心靈的釋放。"
      },
      story: "黃昏五點半，天空呈現出魔幻的橘紫色。李詩民坐在公車最後一排，看著夕陽將城市的輪廓拉得修長。這個時刻，我們既不屬於公司，也不屬於家庭，而是屬於自己。這首歌利用空靈的合成器與大空間的迴音，營造出一種在城市夾縫中短暫獲得自由的漂浮感。",
      lyrics: `[Verse]
公車在夕陽的餘暉中 緩慢滑行
車窗外的城市 染上了魔幻的陰影
剛離開打卡的機器 尚未回到疲憊的家
在這個黃昏的夾縫 我是自由的沙

[Verse 2]
耳機裡的音樂 隔絕了引擎的噪音
看著地平線的橘紅色 漸漸沉入藍色
那些白天累積的防備 都在此刻融化
我終於可以 不用對任何人說客套的話

[Chorus]
在黃昏的夾縫裡 享受片刻的迷航
沒有明天的指標 也忘記昨天的憂傷
這短暫的過渡 像宇宙給的溫柔補償
在光與暗的邊界 讓我靜靜地飛翔

[Outro]
天色 漸漸暗了
夜幕 升起了
我 準備好了`
    },
    {
      id: 9,
      title: "便利商店的微光",
      filename: "track09.mp3",
      duration: "1:59",
      sunoPrompt: {
        style: "Cozy Lo-Fi, electric keyboard, warm bass, mellow male vocals, comforting",
        lyricsPrompt: "寫一首溫馨的Lo-Fi歌曲，描寫深夜兩點在便利商店買關東煮，店員的默默陪伴與都市人微小的相互溫暖。"
      },
      story: "凌晨兩點的超商，明亮的日光燈在空曠的街道上投下溫暖的光。李詩民因為失眠，走進超商挑選熱呼呼的關東煮。值大夜班的店員沒有多餘的話語，只是默默地遞上熱湯，並在結帳時說了聲『謝謝』。在這個冷漠的城市裡，這種無言的善意，往往最能撫平一整天的疲憊。",
      lyrics: `[Verse]
凌晨兩點的街角 只有這盞燈亮著
推開玻璃門 叮咚的聲音打破了寂寞
櫃檯裡的店員 眼神裡有著相同的疲憊
我們默默對視 像兩個夜行的靈魂

[Verse 2]
熱氣騰騰的關東煮 散發出柴魚的甜
接過那碗熱湯 溫暖了冰冷的手指尖
沒有多餘的寒暄 只有發票的撕扯聲
在這個深夜 這種距離剛好最安全

[Chorus]
這便利商店的微光 照亮了都市的孤單
用一個溫暖的角落 招待沒睡的靈魂
雖然我們不曾相識 甚至不曾留下名字
這無聲的體貼 卻能治癒明天的開始

[Outro]
走出超商 喝一口湯
黑夜 似乎沒那麼長`
    },
    {
      id: 10,
      title: "失眠三點半",
      filename: "track10.mp3",
      duration: "1:42",
      sunoPrompt: {
        style: "Dark Lo-Fi, slow melancholy piano, intimate whispery male vocals, slow tempo",
        lyricsPrompt: "寫一首極度安靜、帶有淡淡哀傷的鋼琴民謠，描寫深夜三點半失眠，面對過去的後悔與內心焦慮的和解過程。"
      },
      story: "深夜三點半，房間安靜得只剩時鐘的滴答聲。李詩民躺在床上，過去的種種遺憾、錯誤與對未來的迷惘突然如潮水般湧來。以前的他會焦慮地想要擺脫這些情緒，而現在，他決定靜靜地看著它們。這首歌採用極簡的鋼琴伴奏，如同深夜的呢喃，帶領聽眾一起擁抱自己的不完美。",
      lyrics: `[Verse]
時鐘的指針 停在深夜的三點半
天花板的陰影 像過去的遺憾在糾纏
那些做錯的決定 那些說錯的誓言
在這個無法入眠的夜 重新排演

[Verse 2]
我不再翻身 也不再強迫自己閉眼
既然黑夜不走 那就坐下來聊聊天
承認吧 我其實真的很害怕改變
承認吧 我也有無法癒合的界線

[Chorus]
失眠三點半 抱著自己的脆弱
不用再去證明 誰對誰錯
這些年受的傷 都是我的斑駁
在黑暗的深處 讓我允許自己軟弱

[Outro]
滴答 滴答
時間 慢慢走吧
我 不再掙扎`
    },
    {
      id: 11,
      title: "給內心小孩的信",
      filename: "track11.mp3",
      duration: "1:54",
      sunoPrompt: {
        style: "Ambient Folk, fingerpicking acoustic guitar, soft string section, emotional male vocals",
        lyricsPrompt: "寫一首溫暖動人的民謠，搭配木吉他與弦樂，寫給小時候的自己，表達歉意並感謝他一直住在心裡。"
      },
      story: "李詩民在整理舊物時，意外翻出了一張小學時的畫作。畫中的自己笑容燦爛，夢想著成為太空人。看著鏡子裡如今被生活磨平稜角的自己，他寫下了這首歌。這是一封寫給「內心小孩」的信，向他道歉，因為長大後的我們常常忘記了快樂；也感謝他，一直躲在心底最柔軟的地方，守護著最初的純真。",
      lyrics: `[Verse]
翻開舊抽屜 找到你畫的彩虹
那時的你 總覺得天空沒有盡頭
你想當個英雄 想去外太空旅行
現在的你 卻只在辦公桌前嘆息

[Verse 2]
對不起啊 小時候的自己
我把你丟在 那些忙碌的歲月裡
我學會了妥協 學會了戴上面具
卻忘記了 該怎麼真正大聲哭泣

[Chorus]
這封寫給你的信 謝謝你還在這裡
在我最沮喪的夜 提醒我不要放棄
雖然我沒能成為 你夢想中的奇蹟
但謝謝你 借給我 繼續往前走的勇氣

[Outro]
我會抱抱你
那個 躲在心底的你`
    },
    {
      id: 12,
      title: "時間的刻度",
      filename: "track12.mp3",
      duration: "2:31",
      sunoPrompt: {
        style: "Slow Rock, emotional electric guitar swell, powerful climax, mature male vocals",
        lyricsPrompt: "寫一首慢板搖滾，具有史詩感的吉他獨奏與情感高潮，描述接受歲月流逝、與眼角皺紋和衰老和解的心路歷程。"
      },
      story: "照鏡子時，突然發現眼角多了幾道細紋，頭頂也出現了第一根白髮。李詩民沒有感到恐慌，反而覺得這是一種歲月的恩賜。這首歌從安靜的木吉他開始，逐漸加入電吉他與管弦樂的交織，形成極具張力的搖滾高潮，唱出對時間流逝的坦然與對生命每個階段的熱愛。",
      lyrics: `[Verse]
鏡子裡的臉 悄悄多了幾道刻度
那不是衰老的符號 是我走過的路
白髮在鬢角 閃爍著智慧的光芒
我終於 不再為消逝的青春感傷

[Verse 2]
三十歲的迷惘 四十歲的坦然
時間像一條河 帶走泥沙留下波瀾
那些曾經在乎的 如今看來多麼短暫
留下來的 才是生命最真實的溫暖

[Chorus]
這是時間的刻度 記錄著成長的寬度
我們都在這場旅程中 尋找靈魂的歸屬
接受每個缺口 接受不完美的演出
在歲月的洗禮下 活出優雅的姿態

[Bridge]
(吉他獨奏，展現情感的釋放與高潮)
任憑風吹雨打 歲月催人老
我的心 依然在跳躍

[Outro]
夕陽無限好
因為 我已學會微笑`
    },
    {
      id: 13,
      title: "傷疤與盔甲",
      filename: "track13.mp3",
      duration: "2:10",
      sunoPrompt: {
        style: "Uplifting Indie Pop, acoustic drums, bright acoustic guitar, hopeful chorus, emotional male vocals",
        lyricsPrompt: "寫一首節奏明快、充滿希望的獨立流行樂，描述曾經受過的傷都化為抵禦風雨的盔甲，展現堅韌生命力。"
      },
      story: "這是整張專輯節奏最明快、最溫暖的一首歌。李詩民想透過這首歌告訴所有聽眾：我們在生活中受過的傷，並不會讓我們變得殘缺，反而會長出更堅硬的痂，成為我們面對未來風雨的盔甲。當你能夠笑著談論過往的痛苦時，說明你已經真正痊癒了。",
      lyrics: `[Verse]
我曾以為 那些摔倒的印記
是人生路上 無法抹去的污泥
我曾躲在 陰暗的角落裡哭泣
害怕別人 看穿我脆弱的底細

[Verse 2]
可是時間 慢慢縫合了傷口
那些裂縫裡 竟然長出了新芽
當我再次 面對冷冽的北風
才發現自己 早就學會了掙扎

[Chorus]
這些受過的傷疤 如今都成了盔甲
讓我能坦然地面對 命運給的每個巴掌
我不怕痛 也不怕黑夜的漫長
因為我知道 每一道疤痕 都會閃閃發光

[Bridge]
奔跑吧 帶著你的傷
去追逐 你的太陽

[Outro]
拍拍身上的灰塵
我 笑著迎風`
    },
    {
      id: 14,
      title: "晨曦的預演",
      filename: "track14.mp3",
      duration: "2:24",
      sunoPrompt: {
        style: "Warm Acoustic Pop, swelling strings, hopeful piano, clear triumphant male vocals, build-up",
        lyricsPrompt: "寫一首充滿陽光、大氣的史詩感結尾民謠，融合鋼琴與溫暖弦樂，表現迎來黎明、靈魂獲得徹底救贖的感動。"
      },
      story: "專輯的最後一首歌，時間來到了清晨五點半。天空從深藍漸變為粉橘，第一縷晨曦穿破夜幕，照亮了整座城市，也照亮了李詩民的心。歷經了孤獨、自省、挫敗與和解，他的靈魂在此刻獲得了徹底的釋懷與救贖。這首長達四分多鐘的曲目，以溫暖的管弦樂鋪陳，為這趟心靈救贖之旅畫下完美的句點。",
      lyrics: `[Verse]
黑夜終於 走到了它的盡頭
地平線上 暈開了溫柔的粉紅
我站在陽台 迎著清晨的微風
那首昨夜沒唱完的歌 終於有了回聲

[Verse 2]
謝謝你 陪我走過這段夜路
那些眼淚 都化作了草尖的甘露
我們都是 帶著傷痕的旅人
卻在清晨的陽光裡 找到了靈魂的門

[Chorus]
這是一場晨曦的預演 迎來明亮的新天
告別了昨夜的糾纏 擁抱眼前的瞬間
我帶著所有的故事 帶著所有的殘缺
在陽光普照的路上 勇敢地踏出第一步

[Bridge]
去愛吧 像不曾受過傷一樣
歌唱吧 聲音將穿透迷惘
你看 那光 就在前方

[Outro]
陽光 灑滿了大地
我對世界 輕聲說句
早安`
    },
    {
      id: 15,
      title: "未撥通的電話",
      filename: "track15.mp3",
      duration: "1:45",
      sunoPrompt: {
        style: "Lo-Fi R&B, soft electric piano, smooth synthesizer, reflective male vocals, slow tempo, 75bpm",
        lyricsPrompt: "寫一首關於深夜看著聯絡人卻沒有撥出電話，在寂靜中與內心距離感和解的 Lo-Fi 歌曲。"
      },
      story: "凌晨一點半，螢幕上的聯絡人名字亮了又暗。我們在同一座城市裡生活，卻在彼此的靜音模式中疏離。這首歌記錄了那些想念卻決定不打擾的瞬間——有時候，有些沉默是我們送給彼此最溫柔的界線。",
      lyrics: `[Verse]
深夜的螢幕 亮起又熄滅
那個熟悉的名字 懸在指尖的邊界
想問問你那裡 是否也下起了雪
手指停了又停 還是選擇了退回

[Verse 2]
聽著夜風 吹動窗簾的聲音
時間在黑暗中 走得小心翼翼
我們以前 聊到天亮的熱情
如今只剩下 朋友圈裡的點讚痕跡

[Chorus]
這未撥通的電話 懸掛在寂靜的夜
不用千言萬語 來填補這段空缺
我們在各自的宇宙 轉動著經緯
有些溫柔的遺憾 其實也算完美

[Outro]
對話框 終究留白
祝你幸福 在深夜之外`
    },
    {
      id: 16,
      title: "下過雨的屋簷",
      filename: "track16.mp3",
      duration: "2:18",
      sunoPrompt: {
        style: "Acoustic Folk, clean guitar strumming, gentle warm cello, nostalgic male vocals, relaxing",
        lyricsPrompt: "寫一首民謠吉他伴奏的溫暖歌曲，描述在屋簷下躲雨，看著水滴落下，感受時間變慢與內心平靜。"
      },
      story: "午後的一場陣雨，把李詩民困在老舊的拱型屋簷下。看著雨滴從瓦片邊緣墜落，在小水窪裡敲擊出漣漪，突然覺得原本焦急的行程都不重要了。有時候，命運的一場雨是為了強迫我們停下匆忙的腳步，去欣賞世界被洗淨後的清澈。",
      lyrics: `[Verse]
雲朵聚了又散 天空突然變暗
我躲進這街角 舊屋簷的溫暖
水泥地被淋濕 冒出泥土的香氣
看著雨滴落下 像一首無聲的詩句

[Verse 2]
旁邊的麻雀 也在抖落羽毛的水珠
我們在同一個空間 暫時找到了歸屬
焦急的時鐘 在這一刻被按下了停頓
原來停下腳步 也能讓人如此安穩

[Chorus]
在這下過雨的屋簷 看時間慢慢蔓延
洗去了都市的塵埃 找回遺失的笑臉
水窪裡反射的微光 像夢境一樣清澈
有些美好的答案 就在安靜中交疊

[Outro]
雨停了 天空亮了
我整理好心情 重新出發了`
    },
    {
      id: 17,
      title: "重逢的十字路口",
      filename: "track17.mp3",
      duration: "1:59",
      sunoPrompt: {
        style: "City Pop, warm electric bass, 80s synthesizer, brass sections, groovy male vocals, upbeat but reflective",
        lyricsPrompt: "寫一首帶著 City Pop 復古律動的歌，描述在人潮洶湧的十字路口偶遇老朋友，短暫致意後各自奔向未來的釋懷心境。"
      },
      story: "在綠燈亮起的忠孝東路路口，李詩民在對向的人潮中看到了昔日好友。彼此站定、微笑、揮了揮手。沒有多餘的寒暄，也沒有刻意的擁抱，綠燈的秒數在倒數，大家隨後隱入各自的人潮。這是一次成熟的重逢，我們都在各自的軌道上努力，這就足夠了。",
      lyrics: `[Verse]
霓虹燈開始閃爍 照亮下班的人潮
在擁擠的十字路口 引擎在低吼
我抬起頭 在對面的斑馬線彼端
看見了你 那個好久不見的笑臉

[Verse 2]
綠燈突然亮起 人群開始向前移動
我們在路口中央 視線在空中交融
一個默契的微笑 代替了所有的問候
擦肩而過的瞬間 我們都點了點頭

[Chorus]
在這重逢的十字路口 揮揮手就已經足夠
不用刻意去追問 彼此離開了多久
我們奔向不同的遠方 在這城市的左右
這短暫的交會 溫暖了彼此的宇宙

[Outro]
人潮漸漸走遠
回頭看 你的背影 依然耀眼`
    },
    {
      id: 18,
      title: "收音機裡的舊情歌",
      filename: "track18.mp3",
      duration: "2:06",
      sunoPrompt: {
        style: "Classic Jazz Pop, mellow saxophone, soft drum brushes, acoustic piano, warm vintage male vocals",
        lyricsPrompt: "寫一首經典爵士風格的歌曲，描寫在深夜計程車裡，聽著收音機播送的老歌，回憶起青春遺憾的心情。"
      },
      story: "深夜十一點，李詩民搭上了一輛老舊的計程車。收音機裡，DJ 播起了一首播放過無數次的經典爵士情歌。音訊夾雜著些許電流聲，卻將記憶拉回了十年前那個青澀的雨天。這首歌提醒我們：青春的遺憾並非痛楚，而是經過歲月沉澱後，留在心底的溫柔底色。",
      lyrics: `[Verse]
計程車的車窗外 城市倒退成線條
老舊的收音機 夾雜著微弱的噪聲
熟悉的薩克斯風 吹散了深夜的寒冷
這首歌 唱著我們曾經的單純

[Verse 2]
那時候我們很窮 卻擁有無盡的時間
在小套房的陽台 規劃著未來的誓言
收音機裡的旋律 像一把時光的鑰匙
打開了 那些被我們弄丟的地址

[Chorus]
這收音機裡的舊情歌 還在深夜裡溫柔地播
唱著當初的狂熱 也唱著如今的寂寞
我不奢求時光倒流 也不再追問對錯
只是感謝生命中 你曾溫暖地來過

[Outro]
薩克斯風漸漸淡去
車子停下 我關上了車門`
    },
    {
      id: 19,
      title: "自言自語的陽台",
      filename: "track19.mp3",
      duration: "2:07",
      sunoPrompt: {
        style: "Ambient Folk, fingerstyle acoustic guitar, dreamy ambient synths, gentle whispery male vocals",
        lyricsPrompt: "寫一首氛圍空靈、呢喃式的民謠，描述半夜睡不著在陽台吹風，對著星空與自己對話，學會擁抱不完美的自我。"
      },
      story: "凌晨三點，李詩民推開陽台的玻璃門。夜風微涼，遠處的大樓只剩零星的燈光。他給自己倒了一杯水，看著夜空，開始在心裡和自己對話。過去的一年有太多壓力和自我懷疑，但在這安靜的時刻，他決定原諒自己那些微小的失敗。這是一場與自我的深夜和解。",
      lyrics: `[Verse]
凌晨三點的陽台 晚風帶走溫度
看著遠方的路燈 像星星一樣孤獨
我抱著膝蓋 聽自己心跳的節奏
這一刻 不需要對任何人找藉口

[Verse 2]
是不是我走得太慢 才會常感到迷惘
是不是我太過固執 才會讓自己受傷
夜空沒有回答 只有月光落在肩上
它說沒關係 脆弱也是一種力量

[Chorus]
在這自言自語的陽台 我擁抱我的不完美
接受那些眼淚 也原諒那些後悔
不需要成為 別人眼中完美的玫瑰
在最安靜的夜裡 做一朵自在的野草也美

[Outro]
夜風吹乾了眼角
明天 依然要微笑`
    },
    {
      id: 20,
      title: "在微光中降落",
      filename: "track20.mp3",
      duration: "2:37",
      sunoPrompt: {
        style: "Orchestral Pop, cinematic piano, sweeping violin section, hopeful soaring male vocals, grand climax",
        lyricsPrompt: "寫一首氣勢磅礴但情感溫暖的專輯收尾曲，用鋼琴與弦樂交織，表達歷經長夜後，終於在曙光中安然降落的救贖感。"
      },
      story: "這是《微光邊界》這趟旅程的終點。歷經了清晨的偽裝、早晨的孤獨、通勤的反思、雨天的遺憾與深夜的自我對抗。當天邊再次露出第一道曙光，那光芒不再刺眼，而是溫柔地包容了所有的傷痕。李詩民用高亢而溫暖的歌聲宣告：我們都已安全降落，迎來了全新的自己。",
      lyrics: `[Verse]
天空的黑夜 終於開始褪色
地平線彼端 染上了暖暖的橘黃
經過了漫長旅程 那些受傷的羽翼
在此刻 終於找到了安放的陸地

[Verse 2]
那些唱過的悲傷 哭過的黑夜
都化作了此刻 腳下堅實的邊界
我不再害怕風雨 也不再抗拒明天
因為我知道 溫暖的光就在身邊

[Chorus]
在微光中降落 帶上所有的傷口
在晨曦的溫柔裡 釋懷所有的退縮
這不是終點 而是靈魂新生的開頭
當太陽升起 我們微笑著向前走

[Outro]
看 晨光灑落
我們 終於安全降落`
    }
  ]
};

const glimmerTrackImages = {
  1: 'singer_3.jpg',
  2: 'singer_1.png',
  3: 'singer_2.jpg',
  4: 'singer_4.png',
  5: 'singer_5.png',
  6: 'singer_6.png',
  7: 'singer_9.png',
  8: 'singer_7.png',
  9: 'singer_9.png',
  10: 'singer_8.png',
  11: 'singer_10.png',
  12: 'singer_1.png',
  13: 'singer_5.png',
  14: 'singer_3.jpg',
  15: 'singer_2.jpg',
  16: 'singer_4.png',
  17: 'singer_6.png',
  18: 'singer_7.png',
  19: 'singer_8.png',
  20: 'singer_3.jpg'
};

const glimmerMoodPalettes = [
  { bg1: '#120f0e', bg2: '#1a1411', bg3: '#090807' },
  { bg1: '#0e120f', bg2: '#121914', bg3: '#070908' },
  { bg1: '#0e1214', bg2: '#12181d', bg3: '#070809' },
  { bg1: '#140f12', bg2: '#1b1216', bg3: '#090708' },
  { bg1: '#14130e', bg2: '#1a1912', bg3: '#080807' },
  { bg1: '#0f1214', bg2: '#14181c', bg3: '#080909' },
  { bg1: '#16100e', bg2: '#1f130f', bg3: '#0a0808' },
  { bg1: '#130e14', bg2: '#1a111b', bg3: '#080709' },
  { bg1: '#0d1412', bg2: '#101a17', bg3: '#060908' },
  { bg1: '#0d0f14', bg2: '#10131b', bg3: '#060709' },
  { bg1: '#15140e', bg2: '#1b1a11', bg3: '#090907' },
  { bg1: '#111111', bg2: '#181818', bg3: '#080808' },
  { bg1: '#0f140f', bg2: '#131b13', bg3: '#070907' },
  { bg1: '#18110e', bg2: '#231611', bg3: '#0a0807' },
  { bg1: '#0a0b10', bg2: '#111528', bg3: '#040509' },
  { bg1: '#0c1214', bg2: '#101c20', bg3: '#050709' },
  { bg1: '#1a120f', bg2: '#2b1e19', bg3: '#0c0908' },
  { bg1: '#15110f', bg2: '#201915', bg3: '#080606' },
  { bg1: '#110f17', bg2: '#1c1828', bg3: '#08070b' },
  { bg1: '#1d160f', bg2: '#2e2114', bg3: '#0e0b08' }
];

const glimmerLifeConcepts = [
  "人生課題：學習在喧囂中，脫下偽裝的面具，誠實地面對內心的迷惘。",
  "人生課題：接納與自己相處的時光，發現孤獨是心靈最深沉的自由。",
  "人生課題：放下與他人比較的焦慮，接納自己也是不完美的平凡人。",
  "人生課題：釋懷人際關係中的淡出，理解無言的告別也是一種體貼。",
  "人生課題：學會在繁忙中短暫放空，無所事事也是靈魂的呼吸。",
  "人生課題：擁抱回憶中的遺憾，感激曾交會的溫暖光芒。",
  "人生課題：不以社會標準定義自己，失敗與心碎是塑造人格的勛章。",
  "人生課題：在喧囂與歸途中，找尋屬於自我的緩衝邊界。",
  "人生課題：珍惜城市角落中細微的善意，在冰冷中看見微小的微光。",
  "人生課題：在黑夜中允許自己軟弱，與過去的後悔握手言和。",
  "人生課題：尋回遺忘的童心，感謝那個一直勇敢守護純真的自己。",
  "人生課題：接納時光的刻痕，在歲月的流逝中活出優雅與從容。",
  "人生課題：將生命所有的傷口化為力量，重新披上堅韌的盔甲。",
  "人生課題：在黑夜的盡頭迎來黎明，靈魂在此刻獲得徹底的和解與新生。",
  "人生課題：學會接納人與人之間的距離，有些沉默是彼此最溫柔的界線。",
  "人生課題：短暫的停滯並非放棄，而是給予靈魂在雨後重新出發的契機。",
  "人生課題：釋懷生命中的擦身而過，感恩每一次短暫而溫暖的相遇。",
  "人生課題：不被過去的遺憾所束縛，將回憶化為滋養當下人生的溫暖養分。",
  "人生課題：在夜深人靜時與自己坦誠相對，學會擁抱自己所有的不完美。",
  "人生課題：歷經都市喧囂與心靈重塑後，在微光中尋得內心永恆的寧靜與安全感。"
];

const glimmerShortQuotes = {
  1: "在晨光編織的人潮中，脫下日復一日的社交偽裝。",
  2: "手沖咖啡的香氣裡，遇見不需要迎合任何人的安靜。",
  3: "在顛簸的捷運車廂，看穿每一個堅強外表下的脆弱。",
  4: "那些被默默刪除的文字，是我們給彼此最溫柔的釋懷。",
  5: "關掉手機震動的十分鐘，把時間還給樹蔭下的微風。",
  6: "一場突然其來的午後雷雨，收錄了青春裡最溫馨的遺憾。",
  7: "那些沒有被寫進履歷的挫敗，才是塑造真實自我的靈魂。",
  8: "在光與暗交界的巴士末排，做一個自由漂浮的都市塵埃。",
  9: "凌晨兩點的溫熱關東煮，是深夜裡無聲卻溫暖的陪伴。",
  10: "不再與回憶的黑夜對抗，允許自己在此刻安然軟弱。",
  11: "翻開舊相冊的角落，對那個小時候的自己說聲謝謝。",
  12: "眼角悄然浮現的細紋，是歲月贈予生命最優雅的勛章。",
  13: "當我們能夠笑著談論傷痛，那些結痂早已化為無畏的盔甲。",
  14: "當第一縷曙光穿透夜幕，帶上傷痕，早安，新的一天。",
  15: "螢幕上亮起的那個名字，最終還是隱沒在寂靜的深夜。",
  16: "看著屋簷滴落的雨滴，在停滯的時間裡找回呼吸的節奏。",
  17: "綠燈亮起的人潮中，一個默契的點頭便是最美好的道別。",
  18: "舊旋律在耳邊盤旋，將斑駁的往事溫柔地縫補進當下。",
  19: "晚風吹過空曠的陽台，那些對自己說的真心話，夜空都聽見了。",
  20: "穿過長夜的曲折邊界，我們終將在最溫暖的微光中安然降落。"
};

albumData.id = 'glimmer-boundaries';
albumData.displayTitle = '微光邊界';
albumData.subtitle = '首張音樂故事專輯';
albumData.releaseDate = '2026-06-06';
albumData.status = 'available';
albumData.audioBasePath = 'assets/audio';
albumData.tagline = '20 首關於都市孤獨、自我追尋與心靈救贖的音樂旅程。';
albumData.coverImage = albumData.coverImage || 'assets/images/singer_3.jpg';
albumData.labelImage = 'assets/images/singer_3.jpg';
albumData.artistImage = 'assets/images/singer_3.jpg';
albumData.changelogTitle = 'Album Diary / 專輯更新日記';
albumData.changelogIntro = '歡迎來到《微光邊界》特別增量版！為了讓這趟都市療癒旅程更加完整，我們為您追加了六首全新設計的生命哲學歌曲。整張專輯現在擴充至 20 首曲目，陪伴您度過每一個角落的晴雨晝夜。';

albumData.tracks = albumData.tracks.map((track, index) => {
  const imageName = glimmerTrackImages[track.id] || 'singer_3.jpg';
  return {
    ...track,
    audioSrc: track.audioSrc || `${albumData.audioBasePath}/${track.filename}`,
    image: track.image || `assets/images/${imageName}`,
    quote: track.quote || glimmerShortQuotes[track.id] || '',
    concept: track.concept || glimmerLifeConcepts[index] || '',
    palette: track.palette || glimmerMoodPalettes[index] || glimmerMoodPalettes[0]
  };
});

const zeguoxixiangPalettes = [
  { bg1: '#17120e', bg2: '#2a2116', bg3: '#0b0907' },
  { bg1: '#12170f', bg2: '#1e2a18', bg3: '#080a07' },
  { bg1: '#101614', bg2: '#1a2924', bg3: '#070a09' },
  { bg1: '#17140d', bg2: '#282413', bg3: '#0a0906' },
  { bg1: '#15120f', bg2: '#2b1d17', bg3: '#090706' },
  { bg1: '#111614', bg2: '#1d2924', bg3: '#070909' },
  { bg1: '#16110e', bg2: '#2c2118', bg3: '#090706' },
  { bg1: '#121213', bg2: '#232123', bg3: '#070708' },
  { bg1: '#15120e', bg2: '#2d2014', bg3: '#090706' },
  { bg1: '#11141a', bg2: '#1c2632', bg3: '#07080b' },
  { bg1: '#111714', bg2: '#1e2c24', bg3: '#070a08' },
  { bg1: '#101812', bg2: '#20301f', bg3: '#060a07' },
  { bg1: '#15130f', bg2: '#2c2419', bg3: '#090806' },
  { bg1: '#17120f', bg2: '#2d1f18', bg3: '#0a0706' },
  { bg1: '#101321', bg2: '#1d2540', bg3: '#06070c' },
  { bg1: '#17130d', bg2: '#2e2512', bg3: '#0a0806' },
  { bg1: '#101817', bg2: '#1c2d2a', bg3: '#060909' },
  { bg1: '#18100d', bg2: '#2e1b12', bg3: '#0a0605' },
  { bg1: '#17130d', bg2: '#2f2714', bg3: '#0a0805' },
  { bg1: '#0e1119', bg2: '#182033', bg3: '#05070b' }
];

const zeguoxixiangTrackMeta = [
  {
    title: '寫在開始',
    duration: '2:02',
    style: 'Warm Mandarin indie folk, intimate male vocal, acoustic guitar, soft piano, nostalgic cinematic ballad, gentle strings, 78 bpm, tender reflective mood',
    prompt: '以故事中的小男生第一人稱，對遙遠童年的女孩訴說命運、錯過與想補回的青梅竹馬歲月。',
    quote: '在故事開始以前，我已經想念那個水邊的小女孩。',
    concept: '人生課題：承認相遇來得太晚，仍願用文字與歌聲補回缺席的歲月。',
    story: '這首歌是第二張專輯的序章。成年後的我回望那場跨越臺灣與澤國西鄉的命運，想像小男孩與小女孩在故事裡重新長大。它不是敘事摘要，而是一封寫給過去的溫柔開場白。',
    lyrics: `[Verse]
我在很久以後的夜裡
輕輕喊妳小時候的名字
那時我還在海島出生
妳在水邊學會安靜

[Verse 2]
如果命運早就寫好相逢
為什麼讓我們晚了半生
我想把缺席的那些年
一頁一頁唱給妳聽

[Chorus]
澤國西鄉的女孩啊
妳可曾聽見我的聲音
我從甘蔗甜味的村子出發
走進妳有蘆葦的夢境
若我來得太遲
就讓歌先陪妳長大

[Outro]
在故事開始以前
我已經想念妳`
  },
  {
    title: '最初的記憶',
    duration: '2:08',
    style: 'Lo-fi acoustic pop, warm male vocal, light percussion, mellow electric piano, childhood nostalgia, soft Mandarin ballad, 82 bpm',
    prompt: '以小男孩第一人稱，唱出偷跑到河邊、陷進泥裡、在自由和委屈之間第一次受傷的童年記憶。',
    quote: '我在河邊哭到聲音沙啞，才知道自由也會受傷。',
    concept: '人生課題：童年的冒險並不總是英勇，也包含害怕、委屈與第一次獨自面對後果。',
    story: '小男孩躲過奶奶的叮嚀，奔向河邊，卻在泥濘、刮傷與眼淚中遇見自由的代價。這首歌把那份小小的倔強唱給遠方的女孩聽。',
    lyrics: `[Verse]
我曾躲過阿嫲的叮嚀
把數字寫成乖巧的證明
小小後門藏著我的秘密
一溜煙跑向河邊的風景

[Verse 2]
拖鞋陷進黑色的泥
眼淚掉進午後的水裡
我那時還不懂害怕
只懂自由也會受傷

[Chorus]
妳在遠方的水鄉
是不是也曾一個人長大
我在河邊哭到聲音沙啞
卻想把勇敢留給妳啊
如果童年能相遇
我會先學會不逞強

[Outro]
蜻蜓落回狗尾草
像誰陪我等天亮`
  },
  {
    title: '無聲的畫面',
    duration: '1:58',
    style: 'Dreamy Mandarin folk pop, soft male vocal, fingerstyle guitar, airy pads, gentle piano, watercolor nostalgia, 76 bpm',
    prompt: '以後來者第一人稱，對水邊小女孩訴說第一次看見她跌倒、扛起竹簍離去時的不捨。',
    quote: '妳看不見我，我卻一直在看妳。',
    concept: '人生課題：學會心疼一個人的過去，即使自己無法真正回到那一刻伸手相扶。',
    story: '女孩在水埠頭踩水、拾葉、跌倒，又默默扛起沉重竹簍。男孩只是記憶裡的訪客，第一次近距離理解她早熟的堅韌。',
    lyrics: `[Verse]
我看見妳坐在水埠頭
光著腳把雲踩成漣漪
一片葉子漂到妳面前
妳把孤單轉成遊戲

[Verse 2]
妳跌倒時我想伸手
可我只是後來的影子
只能站在時間旁邊
心疼妳小小的倔強

[Chorus]
無聲的畫面裡
妳比夏天還要明亮
我多想拍拍妳肩膀
說疼了就哭也無妨
妳背起竹簍走進樹影
我把不捨藏進歌裡

[Outro]
妳看不見我
我卻一直在看妳`
  },
  {
    title: '世外桃源',
    duration: '2:04',
    style: 'Nostalgic Mandarin indie pop, acoustic guitar, brushed drums, warm bass, boyhood memory, gentle male vocal, 86 bpm',
    prompt: '以小男孩口吻，唱出花徑、童言童語、想蓋高樓與還不懂愛的天真願望。',
    quote: '小小的心願，後來都長成想念。',
    concept: '人生課題：珍惜童言裡的荒唐，因為那往往是愛與家的最初形狀。',
    story: '花海、上坡小徑與姐姐莉婷交織成男孩的世外桃源。他還不懂大人的關係，只知道想把喜歡的人都安放在自己的夢裡。',
    lyrics: `[Verse]
花開滿上坡的小路
我把世界看得很大
木麻黃站在風裡
像童年替我守著家

[Verse 2]
我曾說長大蓋高樓
每個人都有一層夢
那時不懂大人的沉默
只想把喜歡都說出口

[Chorus]
如果不能和過去牽手
我就把天真留在風中
那片花海還香不香
妳是否也曾路過那樣的光
我在世外桃源的入口
等一個還沒相逢的妳

[Outro]
小小的心願
後來都長成想念`
  },
  {
    title: '孩子王的象徵',
    duration: '2:00',
    style: 'Upbeat acoustic folk rock, youthful male vocal, handclaps, light drums, playful nostalgic Mandarin pop, 92 bpm',
    prompt: '以小男孩第一人稱，唱出放學鐘聲、紅土足球、孩子王幻想與闖禍後怕被遺棄的慌張。',
    quote: '門外的風很長，我還在學著回家。',
    concept: '人生課題：威風與膽怯常在童年同時存在，真正想要的只是被接納地回家。',
    story: '男孩羨慕孩子王的象徵，卻在被同伴戲弄後一路奔回家，發現後門已鎖。那一刻的恐懼，比任何冒險都深。',
    lyrics: `[Verse]
放學鐘聲敲過操場
紅土足球滾進夕陽
我追著風也追著慌張
像每個不肯回家的小孩

[Verse 2]
他們笑我膽小落淚
我卻把眼淚藏進奔跑
緊閉的後門像一道審判
讓我忽然害怕被遺忘

[Chorus]
我也想做孩子王
抓住黑金剛大聲歌唱
可是童年的威風
常常輸給一聲阿嫲
妳若在那年看見我
會不會笑我又替我擦傷

[Outro]
門外的風很長
我還在學著回家`
  },
  {
    title: '生命的滋味',
    duration: '2:06',
    style: 'Melancholic Mandarin acoustic ballad, intimate male vocal, soft piano, ambient guitar, subtle strings, reflective, 74 bpm',
    prompt: '以小男孩第一人稱，唱出第一次看見生命消逝，並把保護女孩的願望種進心裡。',
    quote: '我握著石頭來不及，只好在夢裡學會保護妳。',
    concept: '人生課題：死亡和無力感讓人疼痛，也讓守護的願望開始發芽。',
    story: '青綠知了被鳥叼走，男孩第一次觸到生命消逝的殘酷。於是他在想像中奔向女孩，暗暗許下守護她的願望。',
    lyrics: `[Verse]
一隻青綠的知了
在絲瓜棚上唱得發亮
下一秒被風帶走
我第一次聽見生命變輕

[Verse 2]
我握著石頭卻來不及
小小的手救不了什麼
只好閉上眼去找妳
在棉花田裡陪妳奔跑

[Chorus]
如果世界有弱小的疼
我想替妳擋一陣風
妳怕蟲時我會站前面
哪怕我自己也會發抖
生命的滋味有苦有夢
我把勇氣慢慢學懂

[Outro]
門檻那邊是妳的家
我在風裡等妳回頭`
  },
  {
    title: '門前小路',
    duration: '2:03',
    style: 'Warm cinematic folk, Mandarin male vocal, nylon guitar, soft accordion texture, light percussion, old village atmosphere, 80 bpm',
    prompt: '以小男孩口吻，唱出第一次跨進女孩家門、看見她在灶火旁熟練做飯時的心疼與敬佩。',
    quote: '妳炒出的煙火味，後來成了我回家的香。',
    concept: '人生課題：真正的愛常從看見一個人早年的辛苦開始。',
    story: '補鍋聲、毛尖茶、飛燕和灶火，推著男孩跨入女孩家中。他看見她小小年紀已能撐起家務，心疼也敬佩。',
    lyrics: `[Verse]
黃土路邊有補鍋聲
叮叮咚咚敲進傍晚
一杯毛尖茶在窗台
替我壯了小小的膽

[Verse 2]
我跨進妳家的門檻
像走進從前的答案
灶火把妳照得很亮
妳熟練得讓人心酸

[Chorus]
門前小路彎又彎
我隔著歲月看妳忙
若能分走妳手裡的重
我願把貪玩都收起來
妳炒出的煙火味
後來成了我回家的香

[Outro]
一聲進來啦
把夢輕輕叫醒`
  },
  {
    title: '冷戰',
    duration: '1:55',
    style: 'Lo-fi Mandarin bedroom pop, intimate male vocal, soft Rhodes piano, muted guitar, gentle beat, bittersweet childhood mood, 78 bpm',
    prompt: '以小男孩回憶口吻，唱出姐弟冷戰、嘴硬宣戰，以及多年後奶奶輪廓逐漸模糊的酸楚。',
    quote: '阿嫲的輪廓，在紙上慢慢發光。',
    concept: '人生課題：長大後才懂得，那些以為平凡的臉，才最怕在記憶裡模糊。',
    story: '姐弟隔著書桌冷戰，男孩嘴硬又心慌。轉角出現奶奶的身影，多年後卻成為最難描清的輪廓。',
    lyrics: `[Verse]
老鐘敲了四下
我和姐姐誰都不說話
一隻蒼蠅停在掌心
像替我試探沉默多長

[Verse 2]
我嘴硬說要出門
其實心裡早就發慌
轉角出現阿嫲的影子
多年後卻模糊成淚光

[Chorus]
冷戰的下午啊
誰先低頭都不算輸
我那時不懂溫柔
常藏在責備的背後
如果能再看清妳們
我會少一點倔強

[Outro]
阿嫲的輪廓
在紙上慢慢發光`
  },
  {
    title: '弱肉強食',
    duration: '2:01',
    style: 'Acoustic folk pop with light marching rhythm, warm male vocal, playful percussion, nostalgic rural Mandarin song, 88 bpm',
    prompt: '以小男孩第一人稱，唱出屋簷下微型生態戰場、與姐姐合力追雞、受傷後被奶奶照顧的溫柔。',
    quote: '暮色落在傷口上，我記得有人心疼我。',
    concept: '人生課題：挫敗和疼痛不可怕，怕的是沒有人在夜裡替你擦藥。',
    story: '螳螂、螞蟻、蟾蜍與公雞交錯成童年的弱肉強食。姐弟合作追雞失利，卻換來奶奶深夜擦藥的微光。',
    lyrics: `[Verse]
我看螞蟻搬走螳螂
看蟾蜍守在暗溝旁
看公雞昂首闖進院子
像世界忽然變成戰場

[Verse 2]
我喊了一聲令啊
冷戰就被風收起來
我們一左一右追著雞
像兩個小小的英雄

[Chorus]
我不是最勇敢的人
卻曾抱緊一場慌張
被尖喙啄得眼淚發燙
還想證明自己能長大
那一夜阿嫲替我擦藥
疼也變成溫柔的光

[Outro]
暮色落在傷口上
我記得有人心疼我`
  },
  {
    title: '雪國之鄉',
    duration: '2:10',
    style: 'Cinematic Mandarin winter ballad, piano, soft strings, warm male vocal, sparse percussion, emotional nostalgic atmosphere, 72 bpm',
    prompt: '以小男孩第一人稱，對雪地裡獨自回家的女孩訴說心疼，願把自己碗裡最好的食物分給她。',
    quote: '妳走過的雪，後來都落在我心裡。',
    concept: '人生課題：看見他人的寒冷，才真正明白自己曾擁有的溫飽。',
    story: '女孩在荊楚大雪中踏雪歸家，吃著簡薄飯菜。男孩隔著時空看見她的飢寒，默默許願將來不再讓她受苦。',
    lyrics: `[Verse]
妳走過很深的雪
棉鞋濕冷也不抱怨
家裡沒有誰等妳放學
只有灶火替妳回溫

[Verse 2]
我看著自己碗裡的雞腿
忽然覺得幸福太滿
如果那時能坐妳對面
我會把最好的都給妳

[Chorus]
雪國之鄉的女孩啊
別怕那碗飯太冷
我在很遠很遠的童年
偷偷替妳留一盞燈
等我們終於相逢
我要讓妳不再挨餓受冷

[Outro]
妳走過的雪
後來都落在我心裡`
  },
  {
    title: '三位英雄',
    duration: '2:06',
    style: 'Tense yet tender Mandarin folk pop, acoustic guitar, low drums, cinematic pads, intimate male vocal, hopeful lift, 84 bpm',
    prompt: '以小男孩口吻，唱出水田邊和眼鏡蛇對峙、逃離危險，以及在番茄前做出善惡選擇。',
    quote: '那顆沒摘的番茄，替我記住了答案。',
    concept: '人生課題：真正的英雄不只是勇敢，也是在沒人看見時守住自己的分寸。',
    story: '男孩抱著奶粉罐在水田邊遇見眼鏡蛇，逃出生天後又在番茄前停手。這是童年裡一次關於恐懼與良知的選擇。',
    lyrics: `[Verse]
我抱著舊牛奶罐
在水田邊和蛇對望
阿嫲說別動念佛
姐姐說逃命別走直線

[Verse 2]
我想做軍人警察醫生
想把正義戴在胸口
可一顆番茄在眼前發紅
我才知道善良也要選擇

[Chorus]
三位英雄在我心上
卻沒教我怎麼不害怕
我用小小的腿狂奔
把命運甩在田埂後方
若我能平安回家
就把今天唱給妳聽啊

[Outro]
那顆沒摘的番茄
替我記住了答案`
  },
  {
    title: '竹甲蟲的故鄉',
    duration: '2:05',
    style: 'Whimsical Mandarin indie folk, male vocal, ukulele-like guitar, light percussion, airy woodwinds, childhood adventure, 90 bpm',
    prompt: '以小男孩第一人稱，唱出抓到竹甲蟲、抱著青蛙卵穿越竹林，想把奇妙都帶回家的冒險。',
    quote: '風一吹竹葉響，童年就有翅膀。',
    concept: '人生課題：童年的寶藏未必珍貴，珍貴的是願意相信世界處處有奇蹟。',
    story: '竹甲蟲、白鷺、山泉與奶粉罐串成一場鄉野冒險。男孩想把奇妙帶回家，也想把這些新鮮感唱給女孩聽。',
    lyrics: `[Verse]
竹林裡有一隻筍姑
飛過池塘飛過白鷺
我用疼痛抓住牠的腳
像抓住一個會飛的夢

[Verse 2]
山泉水冰涼又甘甜
我把慌張喝進肚裡
青蛙卵晃在奶粉罐
每一步都像寶藏遠行

[Chorus]
竹甲蟲的故鄉
有我不肯放手的想像
若牠能飛到妳窗前
請替我問候妳的晚霞
我還在小路上奔跑
想把奇妙都帶回家

[Outro]
風一吹竹葉響
童年就有翅膀`
  },
  {
    title: '記憶的芳香',
    duration: '2:02',
    style: 'Gentle Mandarin acoustic pop, warm male vocal, soft piano, light strings, nostalgic village memory, 78 bpm',
    prompt: '以小男孩回憶口吻，唱出新鞋氣味、竹門活結、小狗群出現，以及害怕被溫柔化開的瞬間。',
    quote: '記憶有芳香，藏在新鞋和泥土旁。',
    concept: '人生課題：恐懼常被一點意外的可愛化解，記憶也因此留下氣味。',
    story: '新鞋、麻繩、竹門和一群小狗崽，將原本陰森的竹林變成溫馨偶遇。男孩帶著輕快腳步繼續回家。',
    lyrics: `[Verse]
我記得新鞋放在枕邊
那種味道像紅包很甜
也記得竹門前的活結
越著急越解不開從前

[Verse 2]
一群小狗從陰影裡跑來
把我的鞋尖咬得發癢
牠們那麼短暫地出現
卻讓害怕變得柔軟

[Chorus]
記憶有芳香
藏在新鞋和泥土旁
我走過一扇又一扇門
只為回到有人等的地方
如果妳也曾害怕
願這首歌替妳照亮

[Outro]
白雲慢慢飄過
像小狗跑回天上`
  },
  {
    title: '模糊的記憶',
    duration: '2:08',
    style: 'Nostalgic Mandarin family ballad, acoustic guitar, soft piano, warm male vocal, gentle drums, emotional but restrained, 80 bpm',
    prompt: '以成年後的小男孩口吻，唱出黃槿樹下姐弟遊戲、奶奶喝涼水、夕陽下祖孫並肩的溫暖。',
    quote: '我撿起一根鐵釘，以為能蓋一座高樓，其實想蓋的只是家。',
    concept: '人生課題：長大後才知道，童年的宏大願望底下，其實只是想守住家人。',
    story: '黃槿樹下的涼床、科學小飛俠、給奶奶送水和夕陽下的斜坡，組成男孩最柔軟的家族記憶。',
    lyrics: `[Verse]
黃槿樹下那張涼床
曾是我們出航的船
我搶著當帥氣英雄
卻忘了姐姐也會退讓

[Verse 2]
我把一杯涼水送給阿嫲
她卻習慣先吹一吹
鼻尖沾著肥土的笑
比晚霞還要珍貴

[Chorus]
模糊的記憶啊
請不要太快散場
讓我再看一次她們
在樹影下笑我的傻
我撿起一根鐵釘
以為能蓋一座高樓
其實想蓋的只是家

[Outro]
夕陽把背影拉長
我還牽著阿嫲的光`
  },
  {
    title: '夜有所夢',
    duration: '2:12',
    style: 'Dream pop Mandarin ballad, airy male vocal, ambient synths, soft acoustic guitar, floating percussion, magical nostalgic mood, 76 bpm',
    prompt: '以小男孩夢境口吻，唱出竹甲蟲失蹤後飛越月亮，抵達澤國西鄉，再次看見小女孩的欣喜。',
    quote: '夢裡我終於追上妳，在收割後的田裡多停一會兒。',
    concept: '人生課題：夢讓錯過的人暫時重逢，也讓想念得到一點棲身之處。',
    story: '竹甲蟲飛入夢中，帶男孩穿越月亮與雲層，回到女孩的水鄉。他看見她抓金剛、採野菜，心中滿是再相逢的喜悅。',
    lyrics: `[Verse]
月亮躲在屋簷偷笑
我找不到那隻竹甲蟲
屋頂水盆孵出小蝌蚪
一個夢又生出一個夢

[Verse 2]
我飛過雲牆和白晝
落在妳熟悉的水鄉
看妳指揮孩子抓金剛
笑得像陽光有了形狀

[Chorus]
夜有所夢啊
夢裡我終於追上妳
蟲翼振動成小小隊伍
陪我跑過收割的田地
如果醒來還會失去
就讓我在歌裡多停一會兒

[Outro]
妳回頭以前
風已替我說想妳`
  },
  {
    title: '欒樹花與泥鰍',
    duration: '2:03',
    style: 'Playful warm Mandarin folk pop, male vocal, acoustic guitar, light mandolin texture, soft hand percussion, pastoral, 88 bpm',
    prompt: '以男孩陪伴女孩的口吻，唱出她挖泥鰍、被憨鴨搶走黃鱔，以及彼此逗趣的幸福想像。',
    quote: '花瓣順水遠走，我跟在妳身後。',
    concept: '人生課題：真正親密的人，能把小小失落也變成日後想起會笑的溫柔。',
    story: '女孩在田裡挖泥鰍和黃鱔，卻被憨鴨攪局。男孩在記憶裡偷笑，也想像長大後和她互相逗趣的日常。',
    lyrics: `[Verse]
欒樹花落在妳掌心
妳又發現泥土裡的秘密
一條泥鰍滑過指縫
妳笑得比秋天還清晰

[Verse 2]
憨鴨搶走妳的黃鱔
我在旁邊偷笑到彎腰
若妳回頭瞪我一眼
我一定先說是我不好

[Chorus]
欒樹花與泥鰍
都記得妳奔跑的午後
我想陪妳鬧也陪妳收拾
陪妳把竹簍提到家門口
那些小小失落
後來都變成我們的溫柔

[Outro]
花瓣順水遠走
我跟在妳身後`
  },
  {
    title: '水邊的回聲',
    duration: '2:05',
    style: 'Tender Mandarin acoustic ballad, intimate male vocal, fingerstyle guitar, soft piano, subtle strings, water-town nostalgia, 74 bpm',
    prompt: '以成年男孩對小女孩訴說的口吻，唱出她提著竹簍、懂得取捨、把平凡日子帶回家的溫柔。',
    quote: '妳提著平凡日子，後來都成了我的光。',
    concept: '人生課題：懂得取，也懂得放，是生活磨出來的溫柔分寸。',
    story: '女孩在水邊撿田螺、留下花瓣，也把太小的螺放回水裡。男孩從她的動作裡看見一種比佔有更深的溫柔。',
    lyrics: `[Verse]
妳提著越來越重的竹簍
晚霞在水面揉成碎金
一片欒樹花躺進野菜
像秋天跟著妳回家

[Verse 2]
妳把太小的螺放回水裡
我看見妳心裡的分寸
原來懂得放手的人
比緊握一切更勇敢

[Chorus]
水邊的回聲啊
慢半拍才喊妳的名字
我多想替妳提一段路
再假裝太重逗妳笑一次
妳提著平凡日子
後來都成了我的光

[Outro]
慢慢走不用怕
我在回聲裡等妳`
  },
  {
    title: '灶火旁的螺殼',
    duration: '2:02',
    style: 'Warm Mandarin folk ballad, soft male vocal, acoustic guitar, upright bass, gentle piano, hearthside nostalgia, 78 bpm',
    prompt: '以男孩回望女孩童年的口吻，唱出灶火、田螺、花瓣與她珍惜小物的性格。',
    quote: '妳留下的東西，都沒有白白留下。',
    concept: '人生課題：日子雖小，也值得好好收著；記憶常靠微不足道的小物保存。',
    story: '女孩把野菜、田螺與花瓣帶回灶火旁，又偷偷留下最圓的螺殼。男孩多年後在她身上仍看見這份替日子保存證據的心。',
    lyrics: `[Verse]
灶火低低亮著
像灰燼裡有人說話
妳把田螺放進木盆
小小聲說別跑啦

[Verse 2]
那片花瓣被妳安放
一枚螺殼留在窗台
不值錢的微小事物
卻替日子留下證據

[Chorus]
灶火旁的螺殼啊
請替我記住她回家的路
她把飯粒吃得乾乾淨淨
也把溫柔收得很小心
多年後我看著她
仍看見那粒沉默的月亮

[Outro]
妳留下的東西
都沒有白白留下`
  },
  {
    title: '黃槿樹下的午睡',
    duration: '2:04',
    style: 'Soft Mandarin lullaby folk, warm male vocal, nylon guitar, gentle piano, light ambient field texture, peaceful nostalgic, 70 bpm',
    prompt: '以成年男孩溫柔回望的口吻，唱出女孩在黃槿樹下午睡、保存一朵花與保存時間的能力。',
    quote: '醒來時世界很慢，我在很遠處看妳。',
    concept: '人生課題：有些無事發生的午後，反而成為一生最難再得的安穩。',
    story: '女孩在黃槿樹下睡著，醒來後把那朵陪她睡過午覺的花夾進舊課本。男孩明白，她很早就懂得保存時間。',
    lyrics: `[Verse]
午後熱得不說話
妳搬竹椅到黃槿樹下
手裡握著一朵花
睡著時落在裙邊上

[Verse 2]
那天沒有離別
沒有誰改變命運的話
只有河光慢慢變暗
家人都還在原來的地方

[Chorus]
黃槿樹下的午睡
為什麼讓人這樣想回去
妳說今天這朵不一樣
因為它陪妳睡過一場
有些東西碎了也沒關係
它提醒我們曾被夏天抱緊

[Outro]
醒來時世界很慢
我在很遠處看妳`
  },
  {
    title: '竹床上的星光',
    duration: '2:18',
    style: 'Cinematic Mandarin closing ballad, intimate male vocal, piano, acoustic guitar, warm strings, gentle crescendo, nostalgic night sky, 72 bpm',
    prompt: '以專輯收尾口吻，唱出女孩夏夜躺在竹床看星星，以及看不見也在的故鄉與愛。',
    quote: '看不見故鄉也在，看不見愛也在。',
    concept: '人生課題：長大後的安全感，常來自童年某個被人守著入睡的夜晚。',
    story: '夏夜的竹床、蒲扇、星光與祖母的一句話，成為女孩日後遠行時最深的安定。這首歌是專輯的收束，也把童年的星空放回心裡。',
    lyrics: `[Verse]
夏夜要等很久才涼
竹床一放平夜就展開
妳躺著看滿天星光
捨不得把眼睛閉上

[Verse 2]
祖母搖著蒲扇說
看不見也在
那句話後來跟著妳
走過很遠很遠的城市

[Chorus]
竹床上的星光啊
請照著她回家的方向
我知道人一生都在尋找
有人說睡吧的地方
看不見故鄉也在
看不見愛也在
妳童年的星空
後來住進我胸懷

[Outro]
夜深了別害怕
我會記得妳`
  }
];

const zeguoxixiangAlbumData = {
  id: 'zeguoxixiang-girl',
  albumTitle: '澤國西鄉的女孩',
  displayTitle: '澤國西鄉的女孩',
  subtitle: '第二張音樂故事專輯',
  artist: '李詩民',
  artistBio: '李詩民以第一人稱回望《澤國西鄉的女孩》中的童年時空：一個臺灣小男孩，對遠方水鄉女孩、家人與失落歲月娓娓訴說。這張專輯延續《微光邊界》的日記式聆聽方式，將小說章節轉化為溫柔、懷舊而可歌唱的記憶。',
  coverImage: 'assets/images/zeguoxixiang-girl/cover.webp',
  labelImage: 'assets/images/zeguoxixiang-girl/cover.webp',
  artistImage: 'assets/images/zeguoxixiang-girl/cover.webp',
  releaseDate: '待 SUNO 完成',
  status: 'available',
  audioBasePath: 'assets/audio/zeguoxixiang-girl',
  tagline: '20 首以小男孩第一人稱寫成的水鄉童年、家族記憶與跨越時空的想念。',
  changelogTitle: 'Album Diary / 第二張專輯製作中',
  changelogIntro: '《澤國西鄉的女孩》已接入播放器作品庫，目前使用 20 個靜音佔位音檔。完成 SUNO 生成後，將 MP3 以 track01.mp3 到 track20.mp3 覆蓋至專輯音頻資料夾即可。',
  tracks: zeguoxixiangTrackMeta.map((track, index) => {
    const trackNumber = String(index + 1).padStart(2, '0');
    return {
      id: index + 1,
      title: track.title,
      filename: `track${trackNumber}.mp3`,
      duration: track.duration,
      audioSrc: `assets/audio/zeguoxixiang-girl/track${trackNumber}.mp3`,
      image: `assets/images/zeguoxixiang-girl/track${trackNumber}.webp`,
      quote: track.quote,
      concept: track.concept,
      palette: zeguoxixiangPalettes[index],
      story: track.story,
      lyrics: track.lyrics,
      sunoPrompt: {
        style: track.style,
        lyricsPrompt: track.prompt
      }
    };
  })
};

const albumsData = [
  albumData,
  zeguoxixiangAlbumData
];

// 匯出資料庫，供 app.js 使用。新增專輯時，將 album 物件加入 albumsData 即可。
if (typeof module !== 'undefined' && module.exports) {
  module.exports = albumData;
  module.exports.albumsData = albumsData;
} else {
  window.albumData = albumData;
  window.albumsData = albumsData;
}
