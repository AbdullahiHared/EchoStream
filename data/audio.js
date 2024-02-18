import {luhaidanAudios} from "./luhaidanAudios.js";
import {maherAudios} from "./maherAudios.js";

document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.content');
    const currentTrack = document.querySelector('.currentTrack');
    const playPauseButton = document.getElementById("play-pause-button");
    const volumeControl = document.getElementById("volume-control");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalTimeDisplay = document.getElementById("total-time");
    let isPlaying = false;

    // Function to update content based on reciter
    function updateContent(reciterAudios) {
        // Clear existing content
        content.innerHTML = '';

        // Populate content with reciter's audios
        reciterAudios.forEach((surah, index) => {
            const chapterSection = document.createElement('div');
            chapterSection.classList.add('chapterSection');
            chapterSection.innerHTML = `
                <img class="audioIcon" src="/main/images/play(1).svg" alt="Icon for playing the audio">
                <p> Surah: ${surah.chapterName}</p>
                <p> [${surah.chapterNumber}]</p>
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
    }

    // Add event listener to play/pause button
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

    // Add event listener to volume control
    volumeControl.addEventListener("input", () => {
        currentTrack.volume = volumeControl.value;
    });

    // Add event listener to update progress bar
    currentTrack.addEventListener("timeupdate", () => {
        const currentTime = currentTrack.currentTime;
        const duration = currentTrack.duration;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60);

        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        totalTimeDisplay.textContent = "/" + `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

        const progress = (currentTime / duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Add event listener to reciter buttons
    const luhaidanButton = document.querySelector('.luhaidan');
    const maherButton = document.querySelector('.maher');

    luhaidanButton.addEventListener('click', function () {
        updateContent(luhaidanAudios);
    });

    maherButton.addEventListener('click', function () {
        updateContent(maherAudios);
    });
});
