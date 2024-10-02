import LOCALDB from "../Database/marketerdbContext.js";
import { sendPushNotificationsAsync } from "../ExpoPushNotification/pushNotification.js";
import SendPushNotificationService from "../ExpoPushNotification/sendPushNotification.js";
import marketItem from "../model/marketItem.js";
import sortList from "../util/sortList.js";


/*
    This funcionality is designed to fill database with fetched
    market items and check if fetched items contain newly
    item published on sales market. 
*/

export default async function MarketItemService(marketItems: marketItem[] | null) {
    
    // initialization of READWRITE to marketer.db
    const db = new LOCALDB("MarketItemService");
    
    try {
        
        if(!marketItems) throw new Error("MarketItemService: Something went wrong with fetching the data..");

        let tableName: string = "";

        switch(marketItems[0].platform) {
            case 'facebook':
                tableName = "fbmarketitems";
                break;
            case 'gumtree':
                tableName = "gtmarketitems";
                break;
        }

        const isEmpty = await db.isTableEmpty(tableName);

        if(isEmpty) {
            
            await Promise.all(marketItems.map(async (item) => {
                await db.generateQuery(tableName, item).insert();
            }));
            
            SendPushNotificationService(marketItems[0]);
        } else {

            // if table occupied get first id 0 from table
            const fromDbMarketIems: marketItem [] = await db.generateQuery(tableName, {}).getAll() as marketItem[];
            
            // if product id has same uniqueId as one in database do not do anything  
            if(fromDbMarketIems[0].name !== marketItems[0].name) {
                
                // Have the table contents been deleted 
                const hasDeleted = await db.generateQuery(tableName, {}).emptyTableAll();
                
                
                const newMarketItemsList = sortList(marketItems, fromDbMarketIems);
                
                // if deleted insert new iphone products
                if(hasDeleted) {
                    await Promise.all(newMarketItemsList.map(async (item) => {
                        await db.generateQuery(tableName, item).insert();
                    }));
                }
                
                SendPushNotificationService(marketItems[0]);
            }
        }

    } catch (error) {
        console.log(`\n Server-error: ${error} \n`);
       
    } finally {
        if(db) {
            db.Close();
        }
    }
    
   
}