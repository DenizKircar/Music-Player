const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar")

const player = new MusicPlayer(musicList);




window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {

    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();

});

function pauseMusic() {
    container.classList.remove("playing");
    play.firstElementChild.classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic() {
    container.classList.add("playing");
    play.firstElementChild.classList = "fa-solid fa-pause";
    audio.play();
}

prev.addEventListener("click", () => {
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
});
next.addEventListener("click", () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
});


audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
    progressBar.min = 0;
})

function calculateTime(second) {
    const minute = Math.floor(second / 60);
    const seconds = Math.floor(second%60);
    const updatedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const result = `${minute}:${updatedSeconds}`
    return result;
}

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
})

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

audio.addEventListener("ended", () => {
    next.click();
})

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        volume.classList = "fa-solid fa-volume-mute";
    } else {
        audio.muted = false;
        volume.classList = "fa-solid fa-volume-high";
    }
})

volume.addEventListener("click", () => {
    let volue = audio.volume;
    if(audio.muted == false) {
        volue = audio.volume;
        audio.muted = true;
        volume.classList = "fa-solid fa-volume-mute";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = volue * 100;
    }
})