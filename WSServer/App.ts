import express from "express";
import cors from "cors";
const app = express();
import bodyParser from "body-parser";
import startBackgroundTask from "./Tasks/backgroundTask.js";




// Api Controllers
    import updateToken from "./Api/Controllers/UpdateExpoPushToken.js";
    import getFbListing from "./Api/Controllers/GetFbListing.js";
//--------------

// Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
    origin: '*', // public ip adress can port forwarded ISP provider
}));
//-------- new spesific cors needed



// ------- BackgroundTasks ----- ///
    startBackgroundTask();
// -----------------------------///


app.use("/updateToken", updateToken);
app.use("/getfblisting", getFbListing);




export default app