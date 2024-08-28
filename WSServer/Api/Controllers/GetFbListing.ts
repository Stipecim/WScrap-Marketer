import express, { NextFunction, Request, Response } from "express";
import GetFbListingService from "../../Services/GetFbListingService.js";
import Iphone from "../../model/marketItem.js";
const router = express.Router();

export default router.get('/iphones', async(req: Request, res: Response, next: NextFunction) => {
    console.log("Request from client recieved: iphones");
    const iphones: Iphone[] | undefined =  await GetFbListingService();
    console.log(iphones);
    
    if(iphones) {     
        res.status(200).json({
            iphones
        })
    } else {
        res.status(404).json({
            Status: "Currently not available"
        })

    }

});


