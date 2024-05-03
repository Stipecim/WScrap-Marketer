import express from "express";
import cors from "cors";
const app = express();


// Api Routes 
    import iPhoneProductRoutes from "./Api/Routes/iPhoneProduct.js"
//--------------


app.use(cors({
    origin: ':8081', // public ip adress can port forwarded ISP provider
}));

app.use("/iphoneproducts", iPhoneProductRoutes);




export default app