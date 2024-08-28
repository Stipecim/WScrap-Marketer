
import fbItemFetch from "./fetchComponent/fbItemFetch.js";
import gtItemFetch from "./fetchComponent/gtItemFetch.js";

export default function startBackgroundTask () {
    // Set an interval to run the task every 5 minutes (300000 milliseconds)
    
    setInterval(gtItemFetch, 40000);
    setInterval(fbItemFetch, 40000);
};