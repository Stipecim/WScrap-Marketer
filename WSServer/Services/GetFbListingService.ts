import LOCALDB from "../Database/marketerdbContext.js";
import Iphone from "../model/marketItem.js";

export default async function GetFbListingService() {

    // initializing READWRITE to makreter.db 
    const db = new LOCALDB("GetFbListingService");

    try {
        const iphones: Iphone[] = await db.generateQuery("iPhone", {}).getAll() as Iphone[];

    
        if(iphones === undefined) {throw new Error ("No data in Database"); }
        
        return iphones;

    } catch (error) {
        console.error("Error Retrieving iPhone form Database", error);
        return undefined;
    } finally {
        if(db) {
            db.Close();
        }
    }
    

}