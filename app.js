// ==========================================================================
// 李詩民 —《微光邊界》音樂故事專輯 核心邏輯控制表
// 包含播放器控制、黑膠唱針動態落針、日記本切換、流動背景調色盤
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. DOM 節點宣告 ---
  const audio = document.getElementById('audio-player');
  const record = document.getElementById('vinyl-record');
  const toneArm = document.getElementById('tone-arm');
  const labelImage = document.getElementById('label-image');
  const storyImage = document.getElementById('story-image');
  const lyricsWatermarkBg = document.getElementById('lyrics-watermark-bg');
  const pageBgImage = document.getElementById('page-bg-image');
  
  // 播放器控制項
  const btnPlay = document.getElementById('btn-play');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnShuffle = document.getElementById('btn-shuffle');
  const btnLoop = document.getElementById('btn-loop');
  const btnMute = document.getElementById('btn-mute');
  const svgVolumeIcon = document.getElementById('svg-volume-icon');
  const miniBtnPlay = document.getElementById('mini-btn-play');
  const miniBtnPrev = document.getElementById('mini-btn-prev');
  const miniBtnNext = document.getElementById('mini-btn-next');
  const miniTrackIndex = document.getElementById('mini-track-index');
  const miniTrackTitle = document.getElementById('mini-track-title');
  const miniProgressFill = document.getElementById('mini-progress-fill');
  
  const progressBar = document.getElementById('progress-bar');
  const progressFill = document.getElementById('progress-fill');
  const volumeBar = document.getElementById('volume-bar');
  const volumeFill = document.getElementById('volume-fill');
  
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  
  const trackIndexText = document.getElementById('current-track-index');
  const trackTitleText = document.getElementById('current-track-title');
  const trackQuoteText = document.getElementById('current-track-quote');
  
  // 日記頁面節點
  const tabs = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.diary-content');
  const diaryDate = document.getElementById('diary-date');
  const storyTitle = document.getElementById('story-title');
  const storyContent = document.getElementById('story-content');
  const storyConcept = document.getElementById('story-concept');
  
  const lyricsContent = document.getElementById('lyrics-content');
  
  const artistAvatar = document.getElementById('artist-avatar');
  const trackListUl = document.getElementById('track-list-ul');
  
  const pageNumLeft = document.getElementById('page-num-left');
  const pageNumRight = document.getElementById('page-num-right');

  // --- 2. 狀態變數 ---
  let currentIndex = 0;
  let isPlaying = false;
  let isMuted = false;
  let isShuffle = false;
  let isLoop = false;
  let prevVolume = 0.8;
  let playbackStartTimer = null;
  
  // 歌手寫真照片輪替映射 (1-14軌道，包含最新生成的寫真，實現高度主題關聯)
  const trackImages = {
    1: 'singer_3.jpg',  // 正面主打
    2: 'singer_1.png',  // 側臉溫暖
    3: 'singer_2.jpg',  // 側面柔和
    4: 'singer_4.png',  // 黑白自省
    5: 'singer_5.png',  // 黑白哲學
    6: 'singer_6.png',  // 雨中咖啡館 (Nanobana2 創作 - 雨天收音機)
    7: 'singer_9.png',  // 暗夜街燈下 (Nanobana2 創作 - 被隱藏的履歷)
    8: 'singer_7.png',  // 黃昏街道行走 (Nanobana2 創作 - 黃昏的夾縫)
    9: 'singer_9.png',  // 暗夜街燈下 (便利商店的微光)
    10: 'singer_8.png',  // 深夜臥室燈光下 (Nanobana2 創作 - 失眠三點半)
    11: 'singer_10.png', // 復古書房手稿桌前 (Nanobana2 創作 - 給內心小孩的信)
    12: 'singer_1.png',  // 時間的刻度
    13: 'singer_5.png',  // 傷疤與盔甲
    14: 'singer_3.jpg'   // 晨曦的預演 (主打封面)
  };

  // 14首曲目對應的深色流動微光背景調色盤 (CSS 變數動態切換，極致高級感)
  const moodPalettes = [
    { bg1: '#120f0e', bg2: '#1a1411', bg3: '#090807' }, // T1: 暖黑金
    { bg1: '#0e120f', bg2: '#121914', bg3: '#070908' }, // T2: 森林幽暗
    { bg1: '#0e1214', bg2: '#12181d', bg3: '#070809' }, // T3: 捷運夜空
    { bg1: '#140f12', bg2: '#1b1216', bg3: '#090708' }, // T4: 曖昧暗紫
    { bg1: '#14130e', bg2: '#1a1912', bg3: '#080807' }, // T5: 昏黃沙丘
    { bg1: '#0f1214', bg2: '#14181c', bg3: '#080909' }, // T6: 雨夜灰藍
    { bg1: '#16100e', bg2: '#1f130f', bg3: '#0a0808' }, // T7: 暗橘鐵鏽
    { bg1: '#130e14', bg2: '#1a111b', bg3: '#080709' }, // T8: 暮色幽紫
    { bg1: '#0d1412', bg2: '#101a17', bg3: '#060908' }, // T9: 超商冷綠
    { bg1: '#0d0f14', bg2: '#10131b', bg3: '#060709' }, // T10: 深夜邃藍
    { bg1: '#15140e', bg2: '#1b1a11', bg3: '#090907' }, // T11: 童話昏黃
    { bg1: '#111111', bg2: '#181818', bg3: '#080808' }, // T12: 歲月暗灰
    { bg1: '#0f140f', bg2: '#131b13', bg3: '#070907' }, // T13: 盔甲深綠
    { bg1: '#18110e', bg2: '#231611', bg3: '#0a0807' }  // T14: 黎明暗金
  ];

  // 14首曲目對應的人生課題標題
  const lifeConcepts = [
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
    "人生課題：在黑夜的盡頭迎來黎明，靈魂在此刻獲得徹底的和解與新生。"
  ];

  // 14首曲目對應的歌名下方 Poetic 短文 (人生哲理短語)
  const shortQuotes = {
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
    14: "當第一縷曙光穿透夜幕，帶上傷痕，早安，新的一天。"
  };

  // --- 4. 初始化應用程式 ---
  function init() {
    buildPlaylist();
    // 固定唱片中間的頭像為同一張 (singer_3.jpg 正面肖像)
    if (labelImage) labelImage.src = 'assets/images/singer_3.jpg';
    loadTrack(0);
    audio.volume = 0.8;
    
    // 初始化事件監聽
    btnPlay.addEventListener('click', togglePlay);
    btnPrev.addEventListener('click', prevTrack);
    btnNext.addEventListener('click', nextTrack);
    btnShuffle.addEventListener('click', toggleShuffle);
    btnLoop.addEventListener('click', toggleLoop);
    btnMute.addEventListener('click', toggleMute);
    if (miniBtnPlay) miniBtnPlay.addEventListener('click', togglePlay);
    if (miniBtnPrev) miniBtnPrev.addEventListener('click', prevTrack);
    if (miniBtnNext) miniBtnNext.addEventListener('click', nextTrack);
    
    progressBar.addEventListener('input', setProgress);
    volumeBar.addEventListener('input', setVolume);
    
    // 音訊引擎事件
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleTrackEnded);
    
    // 點擊唱片也可控制播放/暫停
    record.addEventListener('click', togglePlay);
    
    // 頁籤切換
    initTabs();
  }

  // --- 5. 渲染播放清單 (Page 3) ---
  function buildPlaylist() {
    trackListUl.innerHTML = '';
    window.albumData.tracks.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = 'track-item';
      li.dataset.index = index;
      if (index === 0) li.classList.add('active');
      
      li.innerHTML = `
        <div class="track-item-left">
          <span class="track-num-badge">${String(track.id).padStart(2, '0')}</span>
          <span class="track-item-title">${track.title}</span>
          <span class="track-filename-badge">${track.filename}</span>
        </div>
        <div class="track-item-right">
          <span class="track-item-duration">${track.duration}</span>
          <!-- 動態 EQ 頻譜小動畫 -->
          <div class="playing-eq-icon">
            <span class="eq-bar eq-bar-1"></span>
            <span class="eq-bar eq-bar-2"></span>
            <span class="eq-bar eq-bar-3"></span>
          </div>
        </div>
      `;
      
      li.addEventListener('click', () => {
        if (currentIndex === index) {
          togglePlay();
        } else {
          loadTrack(index);
          playAudio();
        }
      });
      
      trackListUl.appendChild(li);
    });
  }

  // --- 6. 載入曲目資料 ---
  function loadTrack(index) {
    currentIndex = index;
    const track = window.albumData.tracks[currentIndex];
    
    // 1. 設定音訊源 (指向本地 audio 資料夾)
    audio.src = `assets/audio/${track.filename}`;
    
    // 2. 更新播放器介面資訊
    trackIndexText.textContent = `Track ${String(track.id).padStart(2, '0')} / 14`;
    trackTitleText.textContent = track.title;
    trackQuoteText.textContent = shortQuotes[track.id];
    
    // 3. 變更故事頁插圖、歌詞背景浮水印與網頁背景底圖 (唱片頭像固定，不在此更新)
    const photoName = trackImages[track.id];
    if (storyImage) storyImage.style.opacity = 0;
    
    setTimeout(() => {
      if (storyImage) {
        storyImage.src = `assets/images/${photoName}`;
        storyImage.style.opacity = 1;
      }
      if (lyricsWatermarkBg) {
        lyricsWatermarkBg.style.backgroundImage = `url('assets/images/${photoName}')`;
      }
      if (pageBgImage) {
        pageBgImage.style.backgroundImage = `url('assets/images/${photoName}')`;
      }
    }, 200);

    // 4. 動態更換背景流動漸層 (極佳沉浸感)
    const palette = moodPalettes[currentIndex];
    document.documentElement.style.setProperty('--bg-color-1', palette.bg1);
    document.documentElement.style.setProperty('--bg-color-2', palette.bg2);
    document.documentElement.style.setProperty('--bg-color-3', palette.bg3);
    
    // 5. 更新日記本內頁資料
    diaryDate.textContent = `Chapter ${String(track.id).padStart(2, '0')} / ${track.title}`;
    storyTitle.textContent = `《${track.title}》創作背景`;
    
    // 故事文本處理：按換行拆分為段落
    const paragraphs = track.story.split('\n');
    storyContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    storyConcept.textContent = lifeConcepts[currentIndex];
    
    // 歌詞處理 (動態過濾掉 [Verse]、[Chorus]、[Bridge] 等標記，僅保留極淨中文歌詞)
    const cleanLyrics = track.lyrics.replace(/\[[^\]]+\]/g, '').replace(/\n{3,}/g, '\n\n').trim();
    lyricsContent.textContent = cleanLyrics;
    
    // 頁碼更新 (模擬實體書)
    pageNumLeft.textContent = `P. ${currentIndex * 2 + 1}`;
    pageNumRight.textContent = `P. ${currentIndex * 2 + 2}`;
    
    // 6. 重置播放進度與按鈕狀態
    progressBar.value = 0;
    progressFill.style.width = '0%';
    if (miniProgressFill) miniProgressFill.style.width = '0%';
    timeCurrent.textContent = '0:00';
    timeTotal.textContent = track.duration;
    if (miniTrackIndex) miniTrackIndex.textContent = `Track ${String(track.id).padStart(2, '0')}`;
    if (miniTrackTitle) miniTrackTitle.textContent = track.title;
    
    // 7. 更新歌曲清單的 active 項目
    const trackItems = document.querySelectorAll('.track-item');
    trackItems.forEach((item, idx) => {
      item.classList.remove('active');
      item.classList.remove('playing');
      if (idx === currentIndex) {
        item.classList.add('active');
        if (isPlaying) item.classList.add('playing');
      }
    });
  }

  // --- 7. 音樂控制邏輯 (播放、暫停、切歌) ---
  function togglePlay() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function setPlayButtonState(playing) {
    btnPlay.title = playing ? "暫停" : "播放";
    btnPlay.setAttribute('aria-label', playing ? "暫停" : "播放");
    const playBtnSvg = document.getElementById('svg-play-icon');
    if (playBtnSvg) {
      playBtnSvg.outerHTML = playing
        ? `<svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" id="svg-play-icon"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
        : `<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor" id="svg-play-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    }

    if (miniBtnPlay) {
      miniBtnPlay.title = playing ? "暫停" : "播放";
      miniBtnPlay.setAttribute('aria-label', playing ? "暫停" : "播放");
      const miniPlayBtnSvg = document.getElementById('mini-svg-play-icon');
      if (miniPlayBtnSvg) {
        miniPlayBtnSvg.outerHTML = playing
          ? `<svg class="mini-icon-pause" viewBox="0 0 24 24" fill="currentColor" id="mini-svg-play-icon" aria-hidden="true"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
          : `<svg class="mini-icon-play" viewBox="0 0 24 24" fill="currentColor" id="mini-svg-play-icon" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      }
    }
  }

  function startPlayingVisuals() {
    record.classList.add('rotating');
    const activeItem = document.querySelector('.track-item.active');
    if (activeItem) activeItem.classList.add('playing');
  }

  function playAudio() {
    isPlaying = true;
    if (playbackStartTimer) {
      clearTimeout(playbackStartTimer);
    }
    
    // 1. 唱針動畫先落針 (擬物感儀式)
    toneArm.classList.add('playing');
    
    // 更新按鈕圖示為「暫停」
    setPlayButtonState(true);
    
    // 2. 音訊必須在點擊事件中立即啟動，否則瀏覽器會擋下延遲播放。
    audio.play().then(() => {
      playbackStartTimer = setTimeout(() => {
        if (isPlaying) {
          startPlayingVisuals();
        }
      }, 900);
    }).catch(err => {
      console.log("音檔載入中或未找到，網頁運作正常。請替換 SUNO 的 MP3 檔案：", err);
      if (isPlaying) {
        startPlayingVisuals();
      }
    });
  }

  function pauseAudio() {
    isPlaying = false;
    if (playbackStartTimer) {
      clearTimeout(playbackStartTimer);
      playbackStartTimer = null;
    }
    audio.pause();
    
    // 唱針回歸原位，唱片停止轉動
    toneArm.classList.remove('playing');
    record.classList.remove('rotating');
    
    // 更新按鈕圖示為「播放」
    setPlayButtonState(false);
    
    // 停止清單中 active 項目的 EQ 動畫
    const activeItem = document.querySelector('.track-item.active');
    if (activeItem) activeItem.classList.remove('playing');
  }

  function prevTrack() {
    let targetIndex = currentIndex - 1;
    if (targetIndex < 0) {
      targetIndex = window.albumData.tracks.length - 1;
    }
    loadTrack(targetIndex);
    if (isPlaying) {
      playAudio();
    }
  }

  function nextTrack() {
    let targetIndex = currentIndex + 1;
    if (targetIndex >= window.albumData.tracks.length) {
      targetIndex = 0;
    }
    
    if (isShuffle) {
      // 隨機播放其他歌曲
      targetIndex = Math.floor(Math.random() * window.albumData.tracks.length);
      while (targetIndex === currentIndex && window.albumData.tracks.length > 1) {
        targetIndex = Math.floor(Math.random() * window.albumData.tracks.length);
      }
    }
    
    loadTrack(targetIndex);
    if (isPlaying) {
      playAudio();
    }
  }

  // --- 8. 循環與隨機模式 ---
  function toggleShuffle() {
    isShuffle = !isShuffle;
    btnShuffle.classList.toggle('active', isShuffle);
    if (isShuffle && isLoop) {
      // 互斥
      isLoop = false;
      btnLoop.classList.remove('active');
    }
  }

  function toggleLoop() {
    isLoop = !isLoop;
    btnLoop.classList.toggle('active', isLoop);
    if (isLoop && isShuffle) {
      // 互斥
      isShuffle = false;
      btnShuffle.classList.remove('active');
    }
  }

  // 當前軌道播完後處理
  function handleTrackEnded() {
    if (isLoop) {
      // 單曲循環
      audio.currentTime = 0;
      audio.play();
    } else {
      // 下一首
      nextTrack();
    }
  }

  // --- 9. 音訊進度條與音量滑動監聽 ---
  function updateProgress() {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percent;
      progressFill.style.width = `${percent}%`;
      if (miniProgressFill) miniProgressFill.style.width = `${percent}%`;
      timeCurrent.textContent = formatTime(audio.currentTime);
    }
  }

  function setProgress() {
    if (audio.duration) {
      const time = (progressBar.value / 100) * audio.duration;
      audio.currentTime = time;
      progressFill.style.width = `${progressBar.value}%`;
      if (miniProgressFill) miniProgressFill.style.width = `${progressBar.value}%`;
    }
  }

  function updateDuration() {
    timeTotal.textContent = formatTime(audio.duration);
  }

  function setVolume() {
    const vol = volumeBar.value / 100;
    audio.volume = vol;
    volumeFill.style.width = `${volumeBar.value}%`;
    
    // 更新靜音圖示狀態
    if (vol === 0) {
      isMuted = true;
      btnMute.classList.add('active');
      svgVolumeIcon.outerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="svg-volume-icon"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    } else {
      isMuted = false;
      btnMute.classList.remove('active');
      svgVolumeIcon.outerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="svg-volume-icon"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      prevVolume = audio.volume;
      audio.volume = 0;
      volumeBar.value = 0;
      volumeFill.style.width = '0%';
      btnMute.classList.add('active');
      svgVolumeIcon.outerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="svg-volume-icon"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
    } else {
      audio.volume = prevVolume;
      volumeBar.value = prevVolume * 100;
      volumeFill.style.width = `${prevVolume * 100}%`;
      btnMute.classList.remove('active');
      svgVolumeIcon.outerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="svg-volume-icon"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    }
  }

  // 格式化秒數為 mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // --- 10. 日記本頁籤切換邏輯 ---
  function initTabs() {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // 移除所有 active 狀態
        tabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        panes.forEach(p => p.classList.remove('active'));
        
        // 套用選中狀態
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.getElementById(`pane-${targetTab}`).classList.add('active');
      });
    });
  }

  // 啟動
  init();
});

// 註冊 PWA 服務工作線程 (Service Worker) 以支援手機 App 安裝
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('PWA SW 註冊成功，範圍為:', reg.scope);
      })
      .catch((err) => {
        console.error('PWA SW 註冊失敗:', err);
      });
  });
}
