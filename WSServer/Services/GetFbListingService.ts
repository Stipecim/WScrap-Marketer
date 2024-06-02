import LOCALDB from "../Database/marketerdbContext.js";
import Iphone from "../model/Iphone.js";

export default async function GetFbListingService() {

    // initializing READWRITE to makreter.db 
    const db = new LOCALDB("GetFbListingService");

    const iphones: Iphone[] = await db.generateQuery("iPhone", {}).getAll() as Iphone[];

    if(iphones === undefined) {console.error("No data in Database"); return undefined;}
    
    return iphones;

}