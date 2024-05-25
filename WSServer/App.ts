import express from "express";
import cors from "cors";
const app = express();
import bodyParser from "body-parser";
import startBackgroundTask from "./Tasks/backgroundTask.js";




// Api Controllers
    import iPhoneProductRoutes from "./Api/Controllers/iPhoneProduct.js";
    import getToken from "./Api/Controllers/expoDevicePushToken.js";
    
//--------------

// Settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
    origin: ':8081', // public ip adress can port forwarded ISP provider
}));
//-------- new spesific cors needed

// ------- BackgroundTasks ----- ///
    startBackgroundTask();
// -----------------------------///

app.use("/iphoneproducts", iPhoneProductRoutes);
app.use("/postToken", getToken);




export default app