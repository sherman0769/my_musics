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
  const vinylLabelTitle = document.getElementById('vinyl-label-title');
  const vinylLabelArtist = document.getElementById('vinyl-label-artist');
  const storyImage = document.getElementById('story-image');
  const lyricsWatermarkBg = document.getElementById('lyrics-watermark-bg');
  const pageBgImage = document.getElementById('page-bg-image');
  const headerArtistName = document.getElementById('header-artist-name');
  const headerAlbumTitle = document.getElementById('header-album-title');
  const btnAlbumLibrary = document.getElementById('btn-album-library');
  
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
  const artistNameTitle = document.getElementById('artist-name-title');
  const artistBio = document.getElementById('artist-bio');
  const albumReleaseLine = document.getElementById('album-release-line');
  const playlistTitle = document.getElementById('playlist-title');
  const playlistSubtitle = document.getElementById('playlist-subtitle');
  const trackListUl = document.getElementById('track-list-ul');
  const albumLibraryGrid = document.getElementById('album-library-grid');
  const changelogDateTitle = document.getElementById('changelog-date-title');
  const changelogDesc = document.getElementById('changelog-desc');
  const diaryBrand = document.getElementById('diary-brand');
  const visitCounter = document.getElementById('visit-counter');
  
  const pageNumLeft = document.getElementById('page-num-left');
  const pageNumRight = document.getElementById('page-num-right');

  // --- 2. 狀態變數 ---
  const albums = Array.isArray(window.albumsData) && window.albumsData.length > 0
    ? window.albumsData
    : [window.albumData].filter(Boolean);
  const DEFAULT_ALBUM_ID = albums[0]?.id || 'glimmer-boundaries';
  const LAST_ALBUM_KEY = 'glimmerBoundariesCurrentAlbum';
  const PLAYER_VISIT_COUNT_KEY = 'glimmerBoundariesVisitCount';
  const PLAYER_TRACK_PLAY_COUNTS_KEY = 'glimmerBoundariesTrackPlayCounts';
  let currentAlbumIndex = getInitialAlbumIndex();
  let currentAlbum = albums[currentAlbumIndex];
  let currentIndex = 0;
  let isPlaying = false;
  let isMuted = false;
  let isShuffle = false;
  let isLoop = false;
  let prevVolume = 0.8;
  let playbackStartTimer = null;
  let trackPlayCounts = {};
  const GLOBAL_STATS_API = '/api/stats';
  let globalStatsEnabled = false;
  
  // --- 4. 初始化應用程式 ---
  function init() {
    if (!currentAlbum) return;
    loadSavedStats();
    renderAlbumChrome();
    buildAlbumLibrary();
    buildPlaylist();
    incrementVisitCount();
    loadTrack(getInitialTrackIndex());
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
    if (btnAlbumLibrary) {
      btnAlbumLibrary.addEventListener('click', () => activateTab('library'));
    }
  }

  // --- 5. 渲染播放清單 (Page 3) ---
  function getInitialAlbumIndex() {
    const params = new URLSearchParams(window.location.search);
    const albumIdFromUrl = params.get('album');
    let savedAlbumId = '';
    try {
      savedAlbumId = localStorage.getItem(LAST_ALBUM_KEY) || '';
    } catch {
      savedAlbumId = '';
    }

    const targetAlbumId = albumIdFromUrl || savedAlbumId || DEFAULT_ALBUM_ID;
    const foundIndex = albums.findIndex((album) => album.id === targetAlbumId);
    return foundIndex >= 0 ? foundIndex : 0;
  }

  function getInitialTrackIndex() {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get('track');
    if (!trackParam) return 0;

    const byTrackId = currentAlbum.tracks.findIndex((track) => String(track.id) === trackParam);
    if (byTrackId >= 0) return byTrackId;

    const byIndex = Number.parseInt(trackParam, 10) - 1;
    return Number.isInteger(byIndex) && byIndex >= 0 && byIndex < currentAlbum.tracks.length ? byIndex : 0;
  }

  function getAlbumStorageKey(baseKey) {
    return `${baseKey}:${currentAlbum.id || DEFAULT_ALBUM_ID}`;
  }

  function persistCurrentAlbum() {
    try {
      localStorage.setItem(LAST_ALBUM_KEY, currentAlbum.id || DEFAULT_ALBUM_ID);
    } catch {
      // localStorage 可能被隱私設定停用；專輯仍可在本次頁面切換。
    }
  }

  function getAlbumTitle(album = currentAlbum) {
    return album.displayTitle || album.albumTitle || album.title || '未命名專輯';
  }

  function getAlbumDisplayLine(album = currentAlbum) {
    const title = getAlbumTitle(album);
    return `${album.subtitle || '音樂故事專輯'}《${title}》`;
  }

  function renderAlbumChrome() {
    const albumTitle = getAlbumTitle();
    document.title = `微光邊界 - ${currentAlbum.artist}《${albumTitle}》`;

    if (headerArtistName) headerArtistName.textContent = currentAlbum.artist;
    if (headerAlbumTitle) headerAlbumTitle.textContent = getAlbumDisplayLine();
    if (vinylLabelTitle) vinylLabelTitle.textContent = albumTitle;
    if (vinylLabelArtist) vinylLabelArtist.textContent = currentAlbum.artist;
    if (labelImage) labelImage.src = currentAlbum.labelImage || currentAlbum.coverImage;
    if (artistAvatar) {
      artistAvatar.src = currentAlbum.artistImage || currentAlbum.coverImage;
      artistAvatar.alt = `${currentAlbum.artist} 肖像`;
    }
    if (artistNameTitle) artistNameTitle.textContent = currentAlbum.artist;
    if (artistBio) artistBio.textContent = currentAlbum.artistBio || currentAlbum.tagline || '';
    if (albumReleaseLine) {
      const releaseText = currentAlbum.releaseDate ? `發行日 ${currentAlbum.releaseDate}` : '';
      albumReleaseLine.textContent = [getAlbumDisplayLine(), releaseText].filter(Boolean).join(' / ');
    }
    if (playlistTitle) playlistTitle.textContent = `《${albumTitle}》專輯軌道清單`;
    if (playlistSubtitle) playlistSubtitle.textContent = `${currentAlbum.tracks.length} 首作品，點擊即可載入黑膠播放`;
    if (changelogDateTitle) changelogDateTitle.textContent = currentAlbum.changelogTitle || 'Album Diary / 專輯更新日記';
    if (changelogDesc) changelogDesc.textContent = currentAlbum.changelogIntro || currentAlbum.tagline || '';
    if (diaryBrand) diaryBrand.textContent = `${currentAlbum.artist} 創作手稿`;
  }

  function readNumberFromStorage(key) {
    try {
      const rawValue = localStorage.getItem(key);
      const parsedValue = Number.parseInt(rawValue || '0', 10);
      return Number.isFinite(parsedValue) ? parsedValue : 0;
    } catch {
      return 0;
    }
  }

  function loadSavedStats() {
    try {
      const savedCounts = JSON.parse(localStorage.getItem(getAlbumStorageKey(PLAYER_TRACK_PLAY_COUNTS_KEY)) || '{}');
      trackPlayCounts = savedCounts && typeof savedCounts === 'object' ? savedCounts : {};
    } catch {
      trackPlayCounts = {};
    }
  }

  function saveTrackPlayCounts() {
    try {
      localStorage.setItem(getAlbumStorageKey(PLAYER_TRACK_PLAY_COUNTS_KEY), JSON.stringify(trackPlayCounts));
    } catch {
      // localStorage 可能被隱私設定停用；計數只在本次頁面生命週期顯示。
    }
  }

  function incrementVisitCount() {
    const visitCountKey = getAlbumStorageKey(PLAYER_VISIT_COUNT_KEY);
    const nextVisitCount = readNumberFromStorage(visitCountKey) + 1;
    try {
      localStorage.setItem(visitCountKey, String(nextVisitCount));
    } catch {
      // localStorage 可能被隱私設定停用；仍顯示本次瀏覽。
    }
    if (visitCounter) {
      visitCounter.textContent = `本機訪問量 ${nextVisitCount.toLocaleString('zh-TW')} 次`;
    }

    postGlobalStatsEvent('visit')
      .then((stats) => applyGlobalStats(stats))
      .catch(() => {
        globalStatsEnabled = false;
      });
  }

  function getTrackPlayCount(trackId) {
    const parsedCount = Number.parseInt(trackPlayCounts[String(trackId)] || '0', 10);
    return Number.isFinite(parsedCount) ? parsedCount : 0;
  }

  function updateTrackPlayCountDisplay(trackId) {
    const countText = `播放 ${getTrackPlayCount(trackId).toLocaleString('zh-TW')} 次`;
    document.querySelectorAll(`[data-play-count-for="${trackId}"]`).forEach((node) => {
      node.textContent = countText;
    });
  }

  function updateAllTrackPlayCountDisplays() {
    currentAlbum.tracks.forEach((track) => updateTrackPlayCountDisplay(track.id));
  }

  function applyGlobalStats(stats) {
    if (!stats || !stats.configured) return false;

    globalStatsEnabled = true;
    if (typeof stats.visits === 'number' && visitCounter) {
      visitCounter.textContent = `全站訪問量 ${stats.visits.toLocaleString('zh-TW')} 次`;
    }
    if (stats.tracks && typeof stats.tracks === 'object') {
      trackPlayCounts = stats.tracks;
      updateAllTrackPlayCountDisplays();
    }
    return true;
  }

  async function postGlobalStatsEvent(event, trackId) {
    const trackIds = currentAlbum.tracks.map((track) => String(track.id));
    const payload = trackId
      ? { event, albumId: currentAlbum.id, trackId, trackIds }
      : { event, albumId: currentAlbum.id, trackIds };
    const response = await fetch(GLOBAL_STATS_API, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) return null;
    return response.json();
  }

  function incrementCurrentTrackPlayCount() {
    const track = currentAlbum.tracks[currentIndex];
    const trackId = String(track.id);
    trackPlayCounts[trackId] = getTrackPlayCount(track.id) + 1;
    saveTrackPlayCounts();
    updateTrackPlayCountDisplay(track.id);

    postGlobalStatsEvent('play', track.id)
      .then((stats) => applyGlobalStats(stats))
      .catch(() => {
        globalStatsEnabled = false;
      });
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildAlbumLibrary() {
    if (!albumLibraryGrid) return;

    albumLibraryGrid.innerHTML = '';
    albums.forEach((album, index) => {
      const isActive = index === currentAlbumIndex;
      const isPlayable = album.status !== 'coming-soon' && Array.isArray(album.tracks) && album.tracks.length > 0;
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `album-library-card${isActive ? ' active' : ''}${isPlayable ? '' : ' disabled'}`;
      card.disabled = !isPlayable;
      card.dataset.albumId = album.id;
      card.innerHTML = `
        <img class="album-library-cover" src="${escapeHtml(album.coverImage || '')}" alt="${escapeHtml(getAlbumTitle(album))} 專輯封面">
        <span class="album-library-kicker">${escapeHtml(isPlayable ? '可播放' : '即將收錄')}</span>
        <span class="album-library-title">《${escapeHtml(getAlbumTitle(album))}》</span>
        <span class="album-library-artist">${escapeHtml(album.artist)} / ${escapeHtml((album.tracks || []).length)} 首</span>
        <span class="album-library-desc">${escapeHtml(album.tagline || album.artistBio || '')}</span>
      `;
      card.addEventListener('click', () => switchAlbum(index));
      albumLibraryGrid.appendChild(card);
    });
  }

  function switchAlbum(albumIndex) {
    const nextAlbum = albums[albumIndex];
    if (albumIndex === currentAlbumIndex || !nextAlbum) {
      activateTab('tracks');
      return;
    }
    if (!Array.isArray(nextAlbum.tracks) || nextAlbum.tracks.length === 0) return;

    pauseAudio();
    currentAlbumIndex = albumIndex;
    currentAlbum = nextAlbum;
    currentIndex = 0;
    trackPlayCounts = {};
    persistCurrentAlbum();
    loadSavedStats();
    renderAlbumChrome();
    buildAlbumLibrary();
    buildPlaylist();
    loadTrack(0);
    activateTab('tracks');

    const url = new URL(window.location.href);
    url.searchParams.set('album', currentAlbum.id);
    url.searchParams.delete('track');
    window.history.replaceState({}, '', url);
  }

  function buildPlaylist() {
    trackListUl.innerHTML = '';
    currentAlbum.tracks.forEach((track, index) => {
      const li = document.createElement('li');
      li.className = 'track-item';
      li.dataset.index = index;
      if (index === 0) li.classList.add('active');
      
      li.innerHTML = `
        <div class="track-item-left">
          <span class="track-num-badge">${String(track.id).padStart(2, '0')}</span>
          <span class="track-item-title">${escapeHtml(track.title)}</span>
          <span class="track-filename-badge">${escapeHtml(track.filename || track.audioSrc || '')}</span>
        </div>
        <div class="track-item-right">
          <span class="track-play-count" data-play-count-for="${track.id}">播放 ${getTrackPlayCount(track.id).toLocaleString('zh-TW')} 次</span>
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
    currentIndex = Math.max(0, Math.min(index, currentAlbum.tracks.length - 1));
    const track = currentAlbum.tracks[currentIndex];
    const url = new URL(window.location.href);
    url.searchParams.set('album', currentAlbum.id);
    url.searchParams.set('track', String(track.id));
    window.history.replaceState({}, '', url);
    
    // 1. 設定音訊源 (指向本地 audio 資料夾)
    audio.src = track.audioSrc || `${currentAlbum.audioBasePath || 'assets/audio'}/${track.filename}`;
    
    // 2. 更新播放器介面資訊
    trackIndexText.textContent = `Track ${String(track.id).padStart(2, '0')} / ${currentAlbum.tracks.length}`;
    trackTitleText.textContent = track.title;
    trackQuoteText.textContent = track.quote || currentAlbum.tagline || '';
    
    // 3. 變更故事頁插圖、歌詞背景浮水印與網頁背景底圖 (唱片頭像固定，不在此更新)
    const photoUrl = track.image || currentAlbum.coverImage;
    if (storyImage) {
      storyImage.style.opacity = 0;
      storyImage.onload = () => {
        storyImage.style.opacity = 1;
      };
      storyImage.src = photoUrl;
      if (storyImage.complete) {
        storyImage.style.opacity = 1;
      }
    }
    if (lyricsWatermarkBg) {
      lyricsWatermarkBg.style.backgroundImage = `url('${photoUrl}')`;
    }
    if (pageBgImage) {
      pageBgImage.style.backgroundImage = `url('${photoUrl}')`;
    }

    // 4. 動態更換背景流動漸層 (極佳沉浸感)
    const palette = track.palette || currentAlbum.palette || { bg1: '#120f0e', bg2: '#1a1411', bg3: '#090807' };
    document.documentElement.style.setProperty('--bg-color-1', palette.bg1);
    document.documentElement.style.setProperty('--bg-color-2', palette.bg2);
    document.documentElement.style.setProperty('--bg-color-3', palette.bg3);
    
    // 5. 更新日記本內頁資料
    diaryDate.textContent = `Chapter ${String(track.id).padStart(2, '0')} / ${track.title}`;
    storyTitle.textContent = `《${track.title}》創作背景`;
    
    // 故事文本處理：按換行拆分為段落
    const paragraphs = (track.story || '').split('\n');
    storyContent.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    storyConcept.textContent = track.concept || '';
    
    // 歌詞處理 (動態過濾掉 [Verse]、[Chorus]、[Bridge] 等標記，僅保留極淨中文歌詞)
    const cleanLyrics = (track.lyrics || '').replace(/\[[^\]]+\]/g, '').replace(/\n{3,}/g, '\n\n').trim();
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
    incrementCurrentTrackPlayCount();
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
      targetIndex = currentAlbum.tracks.length - 1;
    }
    loadTrack(targetIndex);
    if (isPlaying) {
      playAudio();
    }
  }

  function nextTrack() {
    let targetIndex = currentIndex + 1;
    if (targetIndex >= currentAlbum.tracks.length) {
      targetIndex = 0;
    }
    
    if (isShuffle) {
      // 隨機播放其他歌曲
      targetIndex = Math.floor(Math.random() * currentAlbum.tracks.length);
      while (targetIndex === currentIndex && currentAlbum.tracks.length > 1) {
        targetIndex = Math.floor(Math.random() * currentAlbum.tracks.length);
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
  function activateTab(targetTab) {
    const targetPane = document.getElementById(`pane-${targetTab}`);
    if (!targetPane) return;

    tabs.forEach(t => {
      const isActive = t.dataset.tab === targetTab;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panes.forEach(p => p.classList.remove('active'));
    targetPane.classList.add('active');
  }

  function initTabs() {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        activateTab(tab.dataset.tab);
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
