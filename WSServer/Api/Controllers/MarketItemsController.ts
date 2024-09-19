import express, { NextFunction, Request, Response } from "express";
import GetListingService from "../../Services/GetListingService.js";
import marketItem from "../../model/marketItem.js";
const router = express.Router();

export default router.get('/', async(req: Request, res: Response, next: NextFunction) => {
    
    console.log("Client Requesting from:", req.ip);
    
    
    const marketItems: marketItem[] | undefined =  await GetListingService();

    console.log("All market items sent to client:\n", marketItems, "\n -----------------------------------------");
    
    if(marketItems) {     
        res.status(200).json({
            marketItems
        })
    } else {
        res.status(500).json({
            Status: "Items not found",
            Type: "Response"
        })

    }

});


