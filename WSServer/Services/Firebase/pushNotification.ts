
// different structrue 

import { Expo, ExpoPushMessage, ExpoPushToken } from 'expo-server-sdk';




export async function sendPushNotificationsAsync(pushToken: ExpoPushToken, title: string, body: string){
  // Create a new Expo SDK client
  let expo = new Expo();
  



  // Check if the push token is valid
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }




  
  // Create a message
  let messages: ExpoPushMessage[] = [{
    to: pushToken,
    title: title,
    body: body,
  }];

  // Send the notification
  (async () => {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(messages);
      console.log(ticketChunk);
    } catch (error) {
      console.error(error);
    }
  })();
}