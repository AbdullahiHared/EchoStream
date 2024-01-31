import puppeteer from "puppeteer";

const getSurahAudios = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    await page.goto("https://mp3quran.net/eng/lhdan/", {
        waitUntil: "domcontentloaded",
    });

    // Wait for the desired elements to be available
    await page.waitForSelector('.sora-item');

    const chapters = await page.evaluate(() => {
        const chapterList = document.querySelectorAll('.sora-item');

        return Array.from(chapterList).map((chapter) => {
            const chapterNumber = chapter.querySelector('.sora-num').textContent.trim();
            const chapterName = chapter.querySelector('.sora-name a').textContent.trim();
            const audioLink = chapter.querySelector('.link-btn').getAttribute("data-text");

            return { chapterNumber, chapterName, audioLink };
        });
    });

    console.log(JSON.stringify(chapters))
    // Close the browser
    await browser.close();
};

const maherRecitation = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    await page.goto("https://mp3quran.net/eng/maher", {
        waitUntil: "domcontentloaded",
    });

    // Wait for the desired elements to be available
    await page.waitForSelector('.sora-item');

    const chapters = await page.evaluate(() => {
        const chapterList = document.querySelectorAll('.sora-item');

        return Array.from(chapterList).map((chapter) => {
            const chapterNumber = chapter.querySelector('.sora-num').textContent.trim();
            const chapterName = chapter.querySelector('.sora-name a').textContent.trim();
            const audioLink = chapter.querySelector('.link-btn').getAttribute("data-text");

            return { chapterNumber, chapterName, audioLink };
        });
    });

    console.log(JSON.stringify(chapters))
    // Close the browser
    await browser.close();
};

maherRecitation();
