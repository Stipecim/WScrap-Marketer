// access database trough here and update
// check between new pushtoken and last pushtoken

import {Expo } from "expo-server-sdk";
import LOCALDB from "../Database/marketerdbContext.js";
import { ExpoPushToken } from "../model/ExpoPushToken.js";


// need to test this part a bit more


export default async function UpdateExpoPushTokenService(expoPushToken: ExpoPushToken) {
    //initialization of READWRITE to marketer.db
    const db = new LOCALDB("ExpoPushTokenService");
    
    
    // if token is expo valid token
    if(Expo.isExpoPushToken(expoPushToken.token)) {

        // is the table empty
        const isEmpty = await db.isTableEmpty("expoPushToken");
        
        // if table empty insert into a table
        if(isEmpty) {
            await db.generateQuery("expoPushToken", {expoPushToken}).insert();
            console.log("New Expo token inserted");
            return true;
        } else {

            // else delete contents of table than insert again 
            const currentExpoPushToken = await db.generateQuery("expoPushToken", {}).get() as ExpoPushToken;
            if(currentExpoPushToken.token !== expoPushToken.token) {
                
                const hasDeleted = await db.generateQuery("expoPushToken", {}).emptyTableAll();
                
                if(hasDeleted) {
                    await db.generateQuery("expoPushToken", {expoPushToken}).insert();
                    console.log("ExpoToken has been updated");
                    return true;
                }
            }
        }

    }

    
    console.error("Expo Push Token is not valid", "from UpdateExpoPushTokenService");
    return false;
    
}