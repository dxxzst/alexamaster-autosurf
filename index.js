const puppeteer = require('puppeteer');
const pub = require('./lib/pub');
const timer = require('./lib/time');
const CheckInterVal = 5 * 60 * 1000; //5分钟检查一下
let errorHappened = false;
let lastPoints = '';

async function loopRun(browser, page) {
    try {
        await page.waitForSelector('#showInfo', {visible: true, timeout: 60000});
        let nowPoints = await page.evaluate(() => {
            return $('body > div.wrapper > div.content > div > div > div:nth-child(1) > div > div > div.content > h2').text();
        });
        console.log(`${timer.get()} success check auto surf: ${nowPoints}`);

        //添加停止检查
        if (nowPoints !== lastPoints) {
            lastPoints = nowPoints;
            await page.waitFor(CheckInterVal);
        } else {
            throw {message: 'checked not running'}
        }
    } catch (e) {
        errorHappened = true;
        console.log(`${timer.get()} error check auto surf: ${e.message}`);
        await browser.close();
    } finally {
        if (errorHappened) {
            errorHappened = false;
            run();
        } else {
            loopRun(browser, page)
        }
    }
}

async function run(headless = true) {
    let browser;
    try {
        browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--disable-features=site-per-process'
            ],
            headless: headless
        });
        const page = (await browser.pages())[0];
        await pub.pageSetting(page);
        await page.goto(pub.surURL, {waitUntil: 'networkidle2'});

        loopRun(browser, page);
    } catch (e) {
        console.log(`${timer.get()} error happened in run:${e.message}`);
        try {
            await browser.close();
        } catch {
        }
        run(headless);
    }
}

run();
