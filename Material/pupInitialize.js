const puppeteer = require('puppeteer-extra');
const UserAgent = require('user-agents');
const fetchConfig = require('../WSServer/fetchconfig.json');
const cheerio = require('cheerio');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { default: axios } = require('axios');
puppeteer.use(StealthPlugin());




 async function fbItemFetch() {

    const itemLocation = fetchConfig.facebook.location;
    const item = fetchConfig.facebook.item

    const userAgent = new UserAgent();

    const browser = await puppeteer.launch({ 
        headless: true,
        // args: [
        //     '--no-sandbox',
        //     '--disable-setuid-sandbox',
        //     '--disable-dev-shm-usage',
        //     '--disable-accelerated-2d-canvas',
        //     '--no-first-run',
        //     '--no-zygote',
        //     '--single-process',
        //     '--disable-gpu'
        // ]
    });

    const page = await browser.newPage();

    // await page.setUserAgent(userAgent.toString());
    // await page.setViewport({
    //     width: userAgent.data.screenWidth,
    //     height: userAgent.data.screenHeight,
    //     deviceScaleFactor: 1,
    //     hasTouch: false,
    //     isLandscape: false,
    //     isMobile: false,
    // })

   

    try {
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
        
        const $ = cheerio.load(content);
        
       
        // -- fbitem -- //

            const name = $('span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6"]');

            const price = $('span[class="x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x676frb x1lkfr7t x1lbecb7 x1s688f xzsf02u"]')

            const location = $('span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft x1j85h84"]');

        // ------------ //
        
        const data = [];

        if (name && price && location) {
            
            name.each((index, element) => {
                data.push({
                    name: $(element).text().trim(),
                    price: $(price[index]).text().trim(),
                    location: $(location[index]).text().trim()
                })
            })
            console.log(data);
        }

    
    } catch (err) {
        console.log('error:',err);
    }


}


async function gtItemFetch() {

    const item = fetchConfig.gumtree.item;
    const itemLocation = fetchConfig.gumtree.location;
    const radius = fetchConfig.gumtree.radius;

    const { data } = await  axios.get(
        `https://www.gumtree.com/search?featured_filter=false&q=${item}&search_location=${itemLocation}&distance=${radius}&urgent_filter=false&sort=date&search_distance=10&search_scope=false&photos_filter=false`
    );

    const $ = cheerio.load(data);

    const gtItems = [];

    // ---- gtItems ----- //
        const name = $('div[class="css-1de61eh e25keea13"]');
        const price = $('div[class="css-1ygzid9"]');
        const location = $('div[class="css-30gart"]');
    // ------------------ //

    name.each((index, element) => {
        gtItems.push({
            id: index,
            name: $(element).text().trim(),
            price: $(price[index]).text().trim(),
            location: $(location[index]).text().trim(),
            platform: 'gumtree'
        })
        
    })

    console.log(gtItems);
}


gtItemFetch();
//fbItemFetch();