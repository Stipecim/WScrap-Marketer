import LOCALDB from "../Database/marketerdbContext.js";
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
    console.log("MarketService")
    try {
        
        if(!marketItems) throw new Error("MarketItemService: Something went wrong with fetching the data..");

        let tableName: string = "";

        switch(marketItems[0].platform) {
            case 'facebook':
                tableName = "fbMarketItem";
                break;
            case 'gumtree':
                tableName = "gtMarketItem";
                break;
        }

        const isEmpty = await db.isTableEmpty(tableName);

        if(isEmpty) {
            
            await Promise.all(marketItems.map(async (item) => {
                await db.generateQuery(tableName, item).insert();
            }));
            
        } else {

            // if table occupied get first id 0 from table
            const items: marketItem [] = await db.generateQuery(tableName, {}).getAll() as marketItem[];
            
            // if product id has same uniqueId as one in database do not do anything  
            if(items[0].name !== marketItems[0].name) {
                console.log("items are not same!");
                // Have the table contents been deleted 
                const hasDeleted = await db.generateQuery(tableName, {}).emptyTableAll();
                
                
                const newMarketItemsList = sortList(marketItems, items);
                
                // if deleted insert new iphone products
                if(hasDeleted) {
                    await Promise.all(newMarketItemsList.map(async (item) => {
                        await db.generateQuery(tableName, item).insert();
                    }));
                }
                
            }
        }

    } catch (error) {
        console.log(error);
       
    } finally {
        if(db) {
            db.Close();
        }
    }
    
   
}