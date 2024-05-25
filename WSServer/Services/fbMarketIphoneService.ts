import LOCALDB from "../Database/marketerdbContext.js";

export default async function fbMarketIphoneService() {

    const db = new LOCALDB("fbMarketIphoneService");
    
    try {
        const isEmpty = await db.isTableEmpty("iPhone");
        if(isEmpty) {
            // construct "GET" function in LOCALDB  
        }
        // This service will compare data in database and based on result we will push notification to expo cloud server 
        // this service will also store data in database based on conditions 

    } catch (error) {
        console.log(error);
    }
    
    
}