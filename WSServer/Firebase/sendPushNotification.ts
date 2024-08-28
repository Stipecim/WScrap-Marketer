import LOCALDB from "../Database/marketerdbContext.js";
import { sendPushNotificationsAsync } from "./pushNotification.js";
import { ExpoPushTokenDB } from "../model/ExpoPushToken.js";
import marketItem from "../model/marketItem.js";

export default async function SendPushNotificationService(marketItem: marketItem) {

    const db = new LOCALDB("SendPushNotificationService");


    // push a notification 

    // get expo token from database

    try {
        const expoPushToken = await db.generateQuery("expoPushToken", {}).getAll() as ExpoPushTokenDB[];

        // console.log(expoPushToken, " |token| ");

        if(expoPushToken[0].token === undefined) throw new Error("SendPushNotificationService: Unable to get token from database");

        sendPushNotificationsAsync(expoPushToken[0].token, marketItem.name, marketItem.price);
        console.log("PushNotification-Sent");

    } catch (err) {
        console.log(err);
    }
}