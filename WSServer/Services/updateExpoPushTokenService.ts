// access database trough here and update
// check between new pushtoken and last pushtoken

import {Expo, ExpoPushToken } from "expo-server-sdk";
import LOCALDB from "../Database/marketerdbContext.js";
import { ExpoPushTokenDB } from "../model/ExpoPushToken.js";



// need to test this part a bit more


export default async function UpdateExpoPushTokenService(token: ExpoPushToken) {
    //initialization of READWRITE to marketer.db
    const db = new LOCALDB("ExpoPushTokenService");
    
    try {
        
        // if token is expo valid token
        if(Expo.isExpoPushToken(token)) {

            // is the table empty
            const isEmpty = await db.isTableEmpty("expopushtoken");

            // if table empty insert into a table
            if(isEmpty) {
                await db.generateQuery("expopushtoken", {token}).insert();
                //console.log("New Expo token inserted");
                return true;
            } else {

                // else delete contents of table than insert again 
                const currentExpoPushToken = await db.generateQuery("expopushtoken", {}).getAll() as ExpoPushTokenDB[];
                
                if(currentExpoPushToken[0].token !== token) {

                    const hasDeleted = await db.generateQuery("expopushtoken", {}).emptyTableAll();

                    if(hasDeleted) {
                        await db.generateQuery("expoPushToken", {token}).insert();
                        //console.log("Database: ExpoToken has been updated");
                        return true;
                    }
                }
                
                return true;
            }

        }

    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if(db) {
            db.Close();
        }
    }

    
    
    return false;
    
}