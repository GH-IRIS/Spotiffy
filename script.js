// Spotify Clone JavaScript - Interactive Audio Player Shell

// Mock Tracks Data
const tracks = [
    {
        id: "track-1",
        title: "Lost in the City",
        artist: "Midnight Pulse",
        album: "Neon Dreams",
        duration: "2:08",
        durationSeconds: 128,
        art: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60",
        type: "playlist",
        src: "https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3"
    },
    {
        id: "track-2",
        title: "Golden Hour Glow",
        artist: "Acoustic Horizon",
        album: "Sunsets",
        duration: "1:33",
        durationSeconds: 93,
        art: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=60",
        type: "playlist",
        src: "https://cdn.pixabay.com/audio/2022/03/15/audio_7ce11e3b5e.mp3"
    },
    {
        id: "track-3",
        title: "Coffee & Jazz",
        artist: "Blue Note Quartet",
        album: "Café Sessions",
        duration: "2:26",
        durationSeconds: 146,
        art: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&auto=format&fit=crop&q=60",
        type: "album",
        src: "https://cdn.pixabay.com/audio/2025/05/30/audio_08c8aa05d7.mp3"
    },
    {
        id: "track-4",
        title: "Digital Rain",
        artist: "Synthwave Operator",
        album: "Grid Runner",
        duration: "3:40",
        durationSeconds: 220,
        art: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=60",
        type: "playlist",
        src: "https://cdn.pixabay.com/audio/2022/02/26/audio_7797a61d18.mp3"
    },
    {
        id: "track-5",
        title: "Chill Vibes Lofi",
        artist: "Study Buddy",
        album: "Late Night Homework",
        duration: "2:41",
        durationSeconds: 161,
        art: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=60",
        type: "playlist",
        src: "https://cdn.pixabay.com/audio/2023/08/24/audio_8d3bddfb3b.mp3"
    },
    {
        id: "track-6",
        title: "Electric Horizon",
        artist: "Laserhawk",
        album: "Overdrive",
        duration: "3:24",
        durationSeconds: 204,
        art: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=60",
        type: "album",
        src: "https://cdn.pixabay.com/audio/2023/09/07/audio_92bbcf8667.mp3"
    },
    {
        id: "track-7",
        title: "Summer Chills",
        artist: "Sublime Waves",
        album: "Endless Blue",
        duration: "2:13",
        durationSeconds: 133,
        art: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=60",
        type: "playlist",
        src: "https://cdn.pixabay.com/audio/2023/06/25/audio_7c814c8a04.mp3"
    },
    {
        id: "track-8",
        title: "Heavy Distortion",
        artist: "Riff Lords",
        album: "Shattered Pillars",
        duration: "2:10",
        durationSeconds: 130,
        art: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&auto=format&fit=crop&q=60",
        type: "album",
        src: "https://cdn.pixabay.com/audio/2023/03/03/audio_927ee85303.mp3"
    }
];

// App States
let currentTrackIndex = 0;
let isPlaying = false;
let isMuted = false;
let likedTracks = new Set();
let isShuffle = false;
let isRepeat = false;
let currentVolume = 0.7; // Range 0 to 1

// Real HTML5 Audio Player Engine
const audio = new Audio();
audio.volume = currentVolume;

// DOM Elements
const scrollContainer = document.getElementById("scroll-container");
const mainHeader = document.getElementById("main-header");
const welcomeGrid = document.getElementById("welcome-grid");
const madeForYouGrid = document.getElementById("made-for-you-grid");
const recentlyPlayedGrid = document.getElementById("recently-played-grid");
const jumpBackInGrid = document.getElementById("jump-back-in-grid");
const libraryItemsList = document.getElementById("library-items-list");

// Player Elements
const currentTrackArt = document.getElementById("current-track-art");
const currentTrackTitle = document.getElementById("current-track-title");
const currentTrackArtist = document.getElementById("current-track-artist");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnShuffle = document.getElementById("btn-shuffle");
const btnRepeat = document.getElementById("btn-repeat");
const btnMute = document.getElementById("btn-mute");
const volumeIcon = document.getElementById("volume-icon");
const likeIcon = document.getElementById("like-icon");
const playerLikeBtn = document.getElementById("player-like-btn");

const playerProgress = document.getElementById("player-progress");
const playerHandle = document.getElementById("player-handle");
const progressSliderContainer = document.getElementById("progress-slider-container");
const currentTimeLabel = document.getElementById("current-time");
const totalTimeLabel = document.getElementById("total-time");

const volumeProgress = document.getElementById("volume-progress");
const volumeHandle = document.getElementById("volume-handle");
const volumeSliderContainer = document.getElementById("volume-slider-container");

// Initialize App
window.addEventListener("DOMContentLoaded", () => {
    populateUI();
    loadTrack(currentTrackIndex);
    setupEventListeners();
});

// Populate dynamic album/playlist cards
function populateUI() {
    // 1. Populate Library Sidebar
    libraryItemsList.innerHTML = tracks.map((track, index) => `
        <div class="library-item" data-index="${index}">
            <img src="${track.art}" alt="${track.title}" class="library-item-art">
            <div class="library-item-details">
                <span class="library-item-name" id="lib-title-${index}">${track.title}</span>
                <span class="library-item-meta">${track.type === 'album' ? 'Album' : 'Playlist'} • ${track.artist}</span>
            </div>
        </div>
    `).join('');

    // 2. Populate Welcome Grid (Good Afternoon)
    welcomeGrid.innerHTML = tracks.slice(0, 6).map((track, index) => `
        <div class="welcome-card" data-index="${index}">
            <img src="${track.art}" alt="${track.title}" class="welcome-card-art">
            <span class="welcome-card-title">${track.title}</span>
            <button class="play-btn-float">
                <span class="material-symbols-rounded">play_arrow</span>
            </button>
        </div>
    `).join('');

    // 3. Populate Made for You
    madeForYouGrid.innerHTML = tracks.slice(0, 4).map((track, index) => `
        <div class="music-card" data-index="${index}">
            <div class="card-art-wrapper">
                <img src="${track.art}" alt="${track.title}" class="music-card-art">
                <button class="play-btn-float">
                    <span class="material-symbols-rounded">play_arrow</span>
                </button>
            </div>
            <span class="music-card-title">${track.title}</span>
            <span class="music-card-desc">Featuring ${track.artist}, the best soundscapes curated for your afternoon mood.</span>
        </div>
    `).join('');

    // 4. Populate Recently Played
    recentlyPlayedGrid.innerHTML = tracks.slice(4, 8).map((track, index) => `
        <div class="music-card" data-index="${index + 4}">
            <div class="card-art-wrapper">
                <img src="${track.art}" alt="${track.title}" class="music-card-art">
                <button class="play-btn-float">
                    <span class="material-symbols-rounded">play_arrow</span>
                </button>
            </div>
            <span class="music-card-title">${track.title}</span>
            <span class="music-card-desc">Your soundtrack for ${track.album}. Jump right back in.</span>
        </div>
    `).join('');

    // 5. Populate Jump Back In (Reverse or random)
    const reversedTracks = [...tracks].reverse();
    jumpBackInGrid.innerHTML = reversedTracks.slice(0, 4).map((track, index) => {
        const origIndex = tracks.findIndex(t => t.id === track.id);
        return `
            <div class="music-card" data-index="${origIndex}">
                <div class="card-art-wrapper">
                    <img src="${track.art}" alt="${track.title}" class="music-card-art">
                    <button class="play-btn-float">
                        <span class="material-symbols-rounded">play_arrow</span>
                    </button>
                </div>
                <span class="music-card-title">${track.title}</span>
                <span class="music-card-desc">Relisten to ${track.artist}'s masterpiece ${track.album}.</span>
            </div>
        `;
    }).join('');
}

// Load Track into Player
function loadTrack(index) {
    const track = tracks[index];
    currentTrackIndex = index;
    
    // Update player UI
    currentTrackArt.src = track.art;
    currentTrackArt.style.display = "block";
    currentTrackTitle.textContent = track.title;
    currentTrackArtist.textContent = track.artist;
    totalTimeLabel.textContent = track.duration;
    
    // Set audio source
    audio.src = track.src;
    audio.volume = isMuted ? 0 : currentVolume;
    audio.muted = isMuted;
    
    // Reset progress bar visuals
    updateProgressBarVisuals(0, track.durationSeconds);
    
    // Update active highlight in Sidebar
    document.querySelectorAll(".library-item-name").forEach((el, idx) => {
        if (idx === index) {
            el.classList.add("active-track");
        } else {
            el.classList.remove("active-track");
        }
    });

    // Update active highlight on cards
    document.querySelectorAll(".library-item").forEach((el, idx) => {
        if (idx === index) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });

    // Update Like Heart
    if (likedTracks.has(track.id)) {
        likeIcon.textContent = "favorite";
        likeIcon.className = "material-symbols-rounded icon-fill-full";
    } else {
        likeIcon.textContent = "favorite";
        likeIcon.className = "material-symbols-rounded icon-fill-none";
    }

    if (isPlaying) {
        audio.play().catch(err => console.log("Autoplay check:", err));
    }
}

// Toggle Play/Pause
function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function playTrack() {
    isPlaying = true;
    btnPlayPause.innerHTML = `<span class="material-symbols-rounded font-size-l">pause</span>`;
    audio.play().catch(err => console.log("Playback error:", err));
}

function pauseTrack() {
    isPlaying = false;
    btnPlayPause.innerHTML = `<span class="material-symbols-rounded font-size-l">play_arrow</span>`;
    audio.pause();
}

// Update progress bar visuals
function updateProgressBarVisuals(currentTime, duration) {
    const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    playerProgress.style.width = `${percentage}%`;
    playerHandle.style.left = `${percentage}%`;
    
    // Format elapsed time
    const elapsedMinutes = Math.floor(currentTime / 60);
    const elapsedSeconds = Math.floor(currentTime % 60);
    currentTimeLabel.textContent = `${elapsedMinutes}:${elapsedSeconds < 10 ? '0' : ''}${elapsedSeconds}`;

    // Format total duration
    if (duration > 0) {
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);
        totalTimeLabel.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }
}

// Navigation Controls
function nextTrack() {
    if (isShuffle) {
        let randIndex;
        do {
            randIndex = Math.floor(Math.random() * tracks.length);
        } while (randIndex === currentTrackIndex && tracks.length > 1);
        loadTrack(randIndex);
    } else {
        let newIndex = currentTrackIndex + 1;
        if (newIndex >= tracks.length) newIndex = 0;
        loadTrack(newIndex);
    }
    if (isPlaying) playTrack();
}

function prevTrack() {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    loadTrack(newIndex);
    if (isPlaying) playTrack();
}

// Event Listeners Setup
function setupEventListeners() {
    // 1. Scroll effect on header
    scrollContainer.addEventListener("scroll", () => {
        if (scrollContainer.scrollTop > 50) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }
    });

    // 2. Click play/pause button
    btnPlayPause.addEventListener("click", togglePlay);

    // 3. Next / Prev buttons
    btnNext.addEventListener("click", nextTrack);
    btnPrev.addEventListener("click", prevTrack);

    // 4. Shuffle / Repeat Toggles
    btnShuffle.addEventListener("click", () => {
        isShuffle = !isShuffle;
        btnShuffle.classList.toggle("active", isShuffle);
    });

    btnRepeat.addEventListener("click", () => {
        isRepeat = !isRepeat;
        btnRepeat.classList.toggle("active", isRepeat);
    });

    // 5. Like button click
    playerLikeBtn.addEventListener("click", () => {
        const track = tracks[currentTrackIndex];
        if (likedTracks.has(track.id)) {
            likedTracks.delete(track.id);
            likeIcon.textContent = "favorite";
            likeIcon.className = "material-symbols-rounded icon-fill-none";
        } else {
            likedTracks.add(track.id);
            likeIcon.textContent = "favorite";
            likeIcon.className = "material-symbols-rounded icon-fill-full";
            
            // Add subtle pop animation
            playerLikeBtn.style.transform = "scale(1.3)";
            setTimeout(() => {
                playerLikeBtn.style.transform = "scale(1)";
            }, 150);
        }
    });

    // 6. Play clickable cards
    document.addEventListener("click", (e) => {
        const musicCard = e.target.closest(".music-card, .welcome-card, .library-item");
        if (musicCard) {
            const index = parseInt(musicCard.getAttribute("data-index"));
            if (!isNaN(index)) {
                loadTrack(index);
                playTrack();
            }
        }
    });

    // 7. Mute / Volume toggling
    btnMute.addEventListener("click", () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
        if (isMuted) {
            volumeIcon.textContent = "volume_off";
            volumeProgress.style.width = "0%";
            volumeHandle.style.left = "0%";
        } else {
            const pct = currentVolume * 100;
            volumeProgress.style.width = `${pct}%`;
            volumeHandle.style.left = `${pct}%`;
            updateVolumeIcon(currentVolume);
        }
    });

    // 8. Progress Bar Scrubbing
    progressSliderContainer.addEventListener("click", (e) => {
        const rect = progressSliderContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        let percentage = clickX / width;
        if (percentage < 0) percentage = 0;
        if (percentage > 1) percentage = 1;

        const duration = audio.duration || tracks[currentTrackIndex].durationSeconds;
        audio.currentTime = percentage * duration;
        updateProgressBarVisuals(audio.currentTime, duration);
    });

    // 9. Volume Scrubbing
    volumeSliderContainer.addEventListener("click", (e) => {
        const rect = volumeSliderContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        let percentage = clickX / width;
        if (percentage < 0) percentage = 0;
        if (percentage > 1) percentage = 1;

        currentVolume = percentage;
        isMuted = false;
        audio.muted = false;
        audio.volume = percentage;
        
        volumeProgress.style.width = `${percentage * 100}%`;
        volumeHandle.style.left = `${percentage * 100}%`;
        updateVolumeIcon(percentage);
    });

    // 10. Real Audio events
    audio.addEventListener("timeupdate", () => {
        const duration = audio.duration || tracks[currentTrackIndex].durationSeconds;
        updateProgressBarVisuals(audio.currentTime, duration);
    });

    audio.addEventListener("ended", () => {
        if (isRepeat) {
            audio.currentTime = 0;
            audio.play().catch(err => console.log(err));
        } else {
            nextTrack();
        }
    });
}

// Dynamic volume icon updater
function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.textContent = "volume_off";
    } else if (volume < 0.3) {
        volumeIcon.textContent = "volume_mute";
    } else if (volume < 0.7) {
        volumeIcon.textContent = "volume_down";
    } else {
        volumeIcon.textContent = "volume_up";
    }
}
