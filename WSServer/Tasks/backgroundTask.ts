
import fbItemFetch from "./fetchComponent/fbItemFetch.js";
import gtItemFetch from "./fetchComponent/gtItemFetch.js";

function getRandomInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function scheduleTask(task: ()=> Promise<void> , minInterval: number, maxInterval: number, firstTime = false) {
    const randomInterval = firstTime ? 40000 : getRandomInterval(minInterval, maxInterval);
    setTimeout(async () => {
        await task(); 
        scheduleTask(task, minInterval, maxInterval); 
    }, randomInterval);
}

export default function startBackgroundTask() {
    const minInterval = 60000; // 1 minute in milliseconds
    const maxInterval = 300000; // 5 minutes in milliseconds

    // Schedule tasks with random intervals
    scheduleTask(gtItemFetch, minInterval, maxInterval);
    scheduleTask(fbItemFetch, minInterval, maxInterval);
}