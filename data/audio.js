import {luhaidanAudios} from "./luhaidanAudios.js";

const content = document.querySelector('.content');
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
    content.appendChild(chapterSection);
});

