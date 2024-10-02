//import fetchConfig from '../../fetchconfig.json';
//import fetchConfig from './fetchconfig.json';
import axios from 'axios';
import * as cheerio from 'cheerio';
import marketItem from '../../model/marketItem';
import MarketItemService from '../../Services/MarketItemService';
import evaluateConfig from '../../util/evaluateConfig';

// import path from 'path';
// import fs from 'fs';

/*
    Using Axios to fetch html document from gumtree static
    website. Cheerio for loading html to extract items on
    sale.
*/

// function getAssetPath(file:any) {
//     return path.join(__dirname, file);
// }

// const fetchConfig = JSON.parse(fs.readFileSync(getAssetPath('fetchconfig.json'), 'utf8'));

export default async function gtItemFetch() {

    const item = evaluateConfig().evaluatedConfigCache?.eFetchConfig.item;
    const itemLocation = evaluateConfig().evaluatedConfigCache?.eFetchConfig.location.gumtree;
    const radius = evaluateConfig().evaluatedConfigCache?.eFetchConfig.radius.gumtree;

    const currentTime = new Date().toISOString();

    try {
        //console.log( `https://www.gumtree.com/search?featured_filter=false&q=${item}&search_location=${itemLocation}&distance=${radius}&urgent_filter=false&sort=date&search_distance=10&search_scope=false&photos_filter=false`);

        const { data } = await  axios.get(
            `https://www.gumtree.com/search?featured_filter=false&q=${item}&search_location=${itemLocation}&distance=${radius}&urgent_filter=false&sort=date&search_distance=10&search_scope=false&photos_filter=false`
        );

        const $ = cheerio.load(data);

        const gtItems: marketItem[] = [];

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
                timeFetched: currentTime,
                platform: 'gumtree'
            })

        })

        MarketItemService(gtItems);

        console.log(gtItems);

    } catch (err){
        console.log(err);
    }
}