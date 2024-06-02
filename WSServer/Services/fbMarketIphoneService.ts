import { ExpoPushTicket } from "expo-server-sdk";
import LOCALDB from "../Database/marketerdbContext.js";
import Iphone from "../model/Iphone.js";
import { sendPushNotificationsAsync } from "./Firebase/pushNotification.js";
import { ExpoPushToken } from "../model/ExpoPushToken.js";

export default async function fbMarketIphoneService(iphones: Iphone[]) {
    
    // initialization of READWRITE to marketer.db
    const db = new LOCALDB("fbMarketIphoneService");
    
    try {
        // is table empty 
        const isEmpty = await db.isTableEmpty("iPhone");

        if(isEmpty) {
            // if table is empty insert new iphone products to a table
            iphones.forEach( async (iphone ) => {
                await db.generateQuery("iPhone", iphone).insert();
            });
            
        } else {

            // if table occupied get first id 0 from table
            const iphone: Iphone = await db.generateQuery("iPhone", {id: 0}).get() as Iphone;
            
            // if product id has same uniqueId as one in database do not do anything  
            if(iphone.uniqueId !== iphones[0].uniqueId) {
                
                // Have the table contents been deleted 
                const hasDeleted = await db.generateQuery("iPhone", {}).emptyTableAll(); 
                
                // if deleted insert new iphone products
                if(hasDeleted) {
                    iphones.forEach( async (iphone ) => {
                        await db.generateQuery("iPhone", iphone).insert();
                    });
                }

                // push a notification 

                // get expo token from database
                //const expoPushToken = await db.generateQuery("expoPushToken", {id:0}).get() as ExpoPushToken;

                //if(expoPushToken === undefined) throw new Error("Unable to get token from database");

                //sendPushNotificationsAsync(expoPushToken.token, iphone.name, iphone.price);
                console.log("PushNotification-Sent");
            }
        }

    

    } catch (error) {
        console.log(error);
    }
    
    db.Close();
}