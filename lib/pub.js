const surURL = 'https://www.alexamaster.net/Master/123716';

//page 设定
async function pageSetting(page) {
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3724.8 Safari/537.36");
    await page.setViewport({width: 1366, height: 768});
}

module.exports = {pageSetting, surURL};
