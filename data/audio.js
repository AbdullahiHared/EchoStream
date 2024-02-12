import {luhaidanAudios} from "./luhaidanAudios.js";

const content = document.querySelector('.content');
const currentTrack = document.querySelector('.currentTrack');
const playPauseButton = document.getElementById("play-pause-button");
const volumeControl = document.getElementById("volume-control");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
let isPlaying = false;

luhaidanAudios.forEach((surah, index) => {
    const chapterSection = document.createElement('div');
    chapterSection.classList.add('chapterSection');
    chapterSection.innerHTML = `
        <div class="info">
            <h2>Number: ${surah.chapterNumber}</h2>
            <div>Name: ${surah.chapterName}</div>
        </div>
        <img class="audioIcon" src="/main/images/play(1).svg" alt="Icon for playing the audio">
    `;

    const audioPlayer = chapterSection.querySelector('.audioIcon');
    audioPlayer.addEventListener('click', function () {
        currentTrack.src = surah.audioLink;
        currentTrack.play();
        isPlaying = true;
        playPauseButton.textContent = "Pause";
    });

    content.appendChild(chapterSection);
});

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        currentTrack.pause();
        playPauseButton.textContent = "Play";
    } else {
        currentTrack.play();
        playPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
});

volumeControl.addEventListener("input", () => {
    currentTrack.volume = volumeControl.value;
});

currentTrack.addEventListener("timeupdate", () => {
    const currentTime = currentTrack.currentTime;
    const duration = currentTrack.duration;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;
});
