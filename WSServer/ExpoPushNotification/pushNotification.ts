
// different structrue 

import { Expo, ExpoPushMessage, ExpoPushToken } from 'expo-server-sdk';




export async function sendPushNotificationsAsync(pushToken: ExpoPushToken, title: string, body: string){
  // Create a new Expo SDK client
  let expo = new Expo();
  



  // Check if the push token is valid
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`\nServer: Push token ${pushToken} is not a valid Expo push token\n`);
    return;
  }




  
  // Create a message
  let messages: ExpoPushMessage[] = [{
    to: pushToken,
    title: title,
    body: body,
    data: { someLocalData: 'goes here' }

  }];

  // Send the notification
  (async () => {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(messages);
      console.log(`\n Server: ${ticketChunk} \n`);
    } catch (error) {
      console.error(`\n Server-error: ${error} \n`);
    }
  })();
}