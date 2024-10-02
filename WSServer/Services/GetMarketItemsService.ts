import LOCALDB from "../Database/marketerdbContext.js";
import marketItem from "../model/marketItem.js";

export default async function GetMarketItemsService() {

    // initializing READWRITE to makreter.db 
    const db = new LOCALDB("GetFbListingService");

    try {
        const fbmarketitem: marketItem[] = await db.generateQuery("fbmarketitems", {}).getAll() as marketItem[];
        const gtmarketitem: marketItem[] = await db.generateQuery("gtmarketitems", {}).getAll() as marketItem[];
    
        if(fbmarketitem === undefined || gtmarketitem === undefined) {throw new Error ("No data in Database"); }

        const combinedItems = [...fbmarketitem, ...gtmarketitem];

        const sortedItems = combinedItems.sort((a, b) =>  new Date(b.timeFetched).getTime() - new Date(a.timeFetched).getTime());
        
        sortedItems.forEach((item, index) => item.id = index);

        return sortedItems;

    } catch (error) {
        console.error(`\n Server-error: ${error} \n`);
        return undefined;
    } finally {
        if(db) {
            db.Close();
        }
    }
    

}