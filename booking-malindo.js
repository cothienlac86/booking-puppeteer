const puppeteer = require('puppeteer');
const SimpleServer = require('./server/SimpleServer.js')

const formData = '#product_8029b4e0-f14d-4621-8506-ddc9efb95389 > div > div > div > div > form';
const fromSelector = '#product_8029b4e0-f14d-4621-8506-ddc9efb95389 > div > div > div > div > form > table > tbody > tr > td:nth-child(1) > div > span';
const fromResponseSelector = '.select2-results';
const fromInputSelector = '#select2-From-container';
const toSelectSelector = '#product_8029b4e0-f14d-4621-8506-ddc9efb95389 > div > div > div > div > form > table > tbody > tr > td:nth-child(2) > div > span';
const fromDateSelector = '#fFlightHotelSearch_DepartureDate';
const toDateSelector = '#fFlightHotelSearch_ReturnDate';
const searchBtnSelector = '#searchForm';

let httpsServer;
puppeteer.launch().then(async browser => {
    // httpsServer = await SimpleServer.createHTTPS('https://malindo-v3.goquo.vn/api/', HTTPS_PORT);
    const page = await browser.newPage();
    // https://malindo-v3.goquo.vn/package/search-hotel?To=SIN&DepartureDate=2017-10-18&ReturnDate=2017-10-19&Currency=MYR&RoomCount=1&PaxInfos%5B0%5D.AdultCount=2&JourneyType=0&CultureCode=en-US&ProductId=90fa4b7b-630e-486f-848e-31efbe1217ce&IPAddress=100.96.5.1
    // await page.exposeFunction('initDataFunction', async function() {
    //     $('#From').val('HAN');
    //     $('#To').val('SIN');
    // });
    await page.goto('https://malindo-v3.goquo.vn', { waitUntil: 'networkidle' });

    const fromSelectElement = await page.$(fromSelector);
    await fromSelectElement.click();
    await page.type('HAN');
    await page.waitForSelector('body > span > span > span.select2-results').then(() => {
        return Promise.all(() => {
            page.$('#From').value = 'HAN';
            page.$('#select2-From-container').innerHTML = 'Hanoi (HAN), Vietnam';
        });
    });
    const toSelectElement = await page.$(toSelectSelector);
    await toSelectElement.click();
    await page.type('SIN');
    await page.waitForSelector('body > span > span > span.select2-results').then(() => {
        return Promise.all(() => {
            page.$('#To').value = 'HAN';
            page.$('#select2-To-container').innerHTML = 'Singapore (SIN), Singapore';
        });
    });

    const dateFrom = page.$(fromDateSelector);
    await dateFrom.evaluate(() => {
        return Promise.resolve('2017-10-18');
    });
    const dateTo = page.$(toDateSelector);
    await dateTo.evaluate(() => {
        return Promise.resolve('2017-10-19');
    });

    await page.click(searchBtnSelector);

    // const fromResponseElement = await page.$(fromResponseSelector);

    // '#select2-From-results > li.select2-results__option.select2-results__option--highlighted';
    // const toElement = await page.$(toSelector);
    // await toElement.click();
    // await page.type('SIN');
    // await page.evaluate((from) => { return from.type('HAN'); }, fromSelector);
    // await page.evaluate((from) => {
    //     return Promise.apply(() => { page.type('HAN') });
    // }, fromSelector);

    // await page.click(toSelector);
    // await page.evaluate((to) => {
    //     return Promise.apply(() => { page.type('SIN') });
    // }, toSelector);
    // await page.type('SIN');


    await page.screenshot({ path: 'capture_fill_data.png' });

    // await page.click(searchBtnSelector);

    // await page.waitForNavigation();

    // await page.screenshot({ path: 'capture_search_result.png' });
    // await page.click('#searchForm');
    browser.close();
});