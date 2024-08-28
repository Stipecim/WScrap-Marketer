import puppeteer from 'puppeteer-extra';
//import UserAgent from 'user-agents';
import fetchConfig from '../../fetchconfig.json';
import * as cheerio from 'cheerio';
 
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fbItem from '../../model/marketItem';
import MarketItemService from '../../Services/MarketItemService';

puppeteer.use(StealthPlugin());



/*
    Using puppeter as facebook marketplace is dynamic website 
    static fetching won't suffise. Using puppeter to get data
    after initialization of scripts.
*/

export default async function fbItemFetch() {

    // userConfig stored in variables 
    const itemLocation = fetchConfig.facebook.location;
    const item = fetchConfig.facebook.item

    /*const userAgent = new UserAgent(); */

    const browser = await puppeteer.launch({ 
        headless: true,
        /* args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]*/
    });

    const page = await browser.newPage();

    // using user agent fails to retrieve full information 

    /*await page.setUserAgent(userAgent.toString());
    await page.setViewport({
        width: userAgent.data.screenWidth,
        height: userAgent.data.screenHeight,
        deviceScaleFactor: 1,
        hasTouch: false,
        isLandscape: false,
        isMobile: false,
    })*/

   
    /* 
        Attempting to gather information from facebook 
        marketplace recent product selection from user config.
        The attempt interval is defined outside this function 
        and remains unchanged by this code.
    */


    const currentTime = new Date().toISOString();

    
    try {

    // --------------------------- Loading page content --------------------- //
        page.goto(
            `https://www.facebook.com/marketplace/${itemLocation}/search?sortBy=creation_time_descend&daysSinceListed=1&search%3Fdeliverymethod=local_pick_up&query=${item}`,
            {
                waitUntil: 'networkidle2'
            }
        )

        await page.waitForSelector('div[role="dialog"]', { timeout: 50000 }).catch(() => console.log("Login dialog did not appear"));

        const closeButtonSelector = 'div[aria-label="Close"]';
        const isDialogPresent = await page.$(closeButtonSelector);

        if (isDialogPresent) {
            await page.click(closeButtonSelector);
            console.log("Login dialog closed");
        } else {
            console.log("Login dialog not found, no action taken");
        }

        const dynamicElementSelector = '.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6';

        await page.waitForSelector(dynamicElementSelector, { timeout: 20000 });

        const content = await page.content();
    // -------------------------- page content loaded ---------------------------------------------
        
        const $ = cheerio.load(content);
        
       
        // -- fbitem -- //

            const name = $('span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6"]');

            const price = $('span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u"]')

            const location = $('span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84"]');

        // ------------ //
        
        const fbitems: fbItem[] = [];

        if (name && price && location) {
            
            name.each((index, element) => {
                fbitems.push({
                    id: index,
                    name: $(element).text().trim(),
                    price: $(price[index]).text().trim(),
                    location: $(location[index]).text().trim(),
                    timeFetched: currentTime,
                    platform: 'facebook'
                })
            })
            console.log(fbitems);
        }

        MarketItemService(fbitems);
    
    } catch (err) {
        console.log('error:',err);
    }


}


