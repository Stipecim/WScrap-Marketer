import GetIphone from "./Utility/FbMarketIphone.js";

export default function startBackgroundTask () {
    // Set an interval to run the task every 5 minutes (300000 milliseconds)
    setInterval(GetIphone, 10000);
};