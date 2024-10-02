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

        if(expoPushToken[0].token === undefined) console.log("\nServer: ExpoToken not inside database, use app to send ExpoPushToken\n");

        sendPushNotificationsAsync(expoPushToken[0].token, marketItem.name, marketItem.price);
        console.log("\nServer: PushNotification-Sent\n");

    } catch (err) {
        console.log(`\nServer-error: ${err}\n`);
    }
}