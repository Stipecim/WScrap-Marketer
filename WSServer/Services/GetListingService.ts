import LOCALDB from "../Database/marketerdbContext.js";
import marketItem from "../model/marketItem.js";

export default async function GetFbListingService() {

    // initializing READWRITE to makreter.db 
    const db = new LOCALDB("GetFbListingService");

    try {
        const fbmarketitem: marketItem[] = await db.generateQuery("fbmarketitems", {}).getAll() as marketItem[];
        const gtmarketitem: marketItem[] = await db.generateQuery("gtmarketitems", {}).getAll() as marketItem[];
    
        if(fbmarketitem === undefined || gtmarketitem === undefined) {throw new Error ("No data in Database"); }
        
        return [...fbmarketitem, ...gtmarketitem];

    } catch (error) {
        console.error("Error: ", error);
        return undefined;
    } finally {
        if(db) {
            db.Close();
        }
    }
    

}