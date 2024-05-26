// access database trough here and update
// check between new pushtoken and last pushtoken

import {Expo } from "expo-server-sdk";
import LOCALDB from "../Database/marketerdbContext.js";
import { ExpoPushToken } from "../model/ExpoPushToken.js";


export default async function UpdateExpoPushTokenService(expoPushToken: ExpoPushToken) {
    //initialization of READWRITE to marketer.db
    const db = new LOCALDB("PushNotificationService");
    

    // if token is expo valid token
    if(Expo.isExpoPushToken(expoPushToken.Token)) {
        const isEmpty = await db.isTableEmpty("expoPushToken");
    
        if(isEmpty) {
            await db.generateQuery("expoPushToken", {expoPushToken}).insert();
            console.log("New Expo token inserted updated");
            return true;
        } else {

            const currentExpoPushToken = await db.generateQuery("expoPushToken", {}).get() as ExpoPushToken;
            if(currentExpoPushToken.Token !== expoPushToken.Token) {
                
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