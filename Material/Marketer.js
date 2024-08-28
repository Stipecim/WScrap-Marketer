const cheerio = require('cheerio');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
const jobj = require("../WSServer/fetchconfig.json");
const tough = require('tough-cookie');
const { CookieJar } = tough;

const filePath = path.join(__dirname, 'cities.txt');
const fileExtractedData = path.join(__dirname, 'extract.txt');
const finalOutput = path.join(__dirname, 'finaloutput.txt');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function fetchData() {
    // Launch browser and open a new page
    const browser = await puppeteer.launch({ headless: true }); // Set headless: false to see what's happening
    const page = await browser.newPage();

    try {
        // Go to the Facebook Marketplace URL
        await page.goto('https://www.facebook.com/marketplace/108090452545796/search?sortBy=creation_time_descend&daysSinceListed=1&search%3Fdeliverymethod=local_pick_up&query=iphone', {
            waitUntil: 'networkidle2'
        });

        // Wait for the dialog to appear
         await page.waitForSelector('div[role="dialog"]', { timeout: 50000 }).catch(() => console.log("Login dialog did not appear"));

        // Close the dialog if it appears
        const closeButtonSelector = 'div[aria-label="Close"]';
        const isDialogPresent = await page.$(closeButtonSelector);

        if (isDialogPresent) {
            await page.click(closeButtonSelector);
            console.log("Login dialog closed");
        } else {
            console.log("Login dialog not found, no action taken");
        }

        // Define the dynamic element selector for marketplace items
        const dynamicElementSelector = '.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6';

        // Wait for a dynamic element to load
        await page.waitForSelector(dynamicElementSelector, { timeout: 20000 });

        const content = await page.content();

        // Extract data from the page
        
        const $ = cheerio.load(content);

        // Extract data from all matching elements on the page
        const data = [];
        $('span[class="x1lliihq x6ikm8r x10wlt62 x1n2onr6"]').each((index, element) => {
            data.push($(element).text().trim());
        });

        console.log("Extracted data:", data);

       

        // Take a screenshot of the page for verification
        //await page.screenshot({ path: 'marketplace.png' });
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await browser.close();
    }
}




async function fetchCookies() {
    const cookieJar = new CookieJar();

    try {
        // Make a request to the Facebook Marketplace page
        const response = await axios.get('https://www.facebook.com/marketplace/category/search?sortBy=creation_time_descend&daysSinceListed=1&search%3Fdeliverymethod=local_pick_up&query=iphone', {
            jar: cookieJar,  // Pass the cookie jar to store cookies
            withCredentials: true, // Ensure credentials (cookies) are sent with the request
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // Replace with your user agent string
            }
        });

        // Cookies are automatically stored in the cookie jar
        console.log('Cookies:', cookieJar.getCookiesSync('https://www.facebook.com'));

        // Optionally, save the cookie jar to use later for subsequent requests
        return cookieJar;
    } catch (error) {
        console.error('Error fetching cookies:', error);
        return null;
    }
}


async function makeRequestWithCookies(url, cookieJar) {
    try {
        const response = await axios.get(url, {
            jar: cookieJar,
            withCredentials: true,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'  // Replace with your user agent string
            }
        });

        //console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error making request with cookies:', error);
        return null;
    }
}

// Function to load the cities from the text file
async function loadfile(path) {
    try {
        const data = await fs.readFile(path, 'utf8');
        return data.split('\n').map(city => city.trim()).filter(city => city.length > 0);
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

async function writeToFile(path, data) {
    try {
        await fs.writeFile(path, data.join('\n'), 'utf8');
        console.log('Data has been written to the file successfully.');
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
}

// Function to fetch HTML content for a given query
async function getCities(query) {
    try {
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        const result = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        return result.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return '';
    }
}

// Function to extract the unique identifier from HTML content
async function extractCitiesUniqueIdentifier(html) {
    const $ = cheerio.load(html);
    const heading = $('h3.LC20lb.MBeuO.DKV0Md');

    if (heading.length > 0) {
        console.log($(heading[0]).text().trim(), heading[0].parent.attribs.href);
        return $(heading[0]).text().trim().concat(' - ', heading[0].parent.attribs.href);
    } else {
        return null;
    }
}

function extractIds(url) {
    const match = url.match(/\/marketplace\/([\w.-]+)\/?/);
    return match ? match[1] : null;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Main function to execute the overall process
(async function main() {
    fetchData();

    
    
})();



// Example usage


/*
	Modify-Read-Insert object property:
		'd-' Device
		'm-' Model
		's-' Storage
		'l-' link
	
	Commands:
		modify    - file 
		read      - read saves from file
		insert    - advance search to file
		del	      - delete saves from file
		delAll    - delets all in file
		load      - load from file specific item file
		loadAll   - all from file
				f-	-file pathname
				/s
			


*/
// async function run(argc = null, argv = null) {
	
// }


