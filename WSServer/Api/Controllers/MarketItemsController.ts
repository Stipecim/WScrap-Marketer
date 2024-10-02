import express, { NextFunction, Request, Response } from "express";
import marketItem from "../../model/marketItem.js";
import GetMarketItemsService from "../../Services/GetMarketItemsService.js";
const router = express.Router();

export default router.get('/', async(req: Request, res: Response, next: NextFunction) => {
    
    console.log(`\nServer: Client Requesting from: ${req.ip}\n`);
    
    
    const marketItems: marketItem[] | undefined =  await GetMarketItemsService();

    
    
    if(marketItems) {  
        try{   
            res.status(200).json({
                marketItems
            });

            console.log("All market items sent to client:\n", marketItems, "\n -----------------------------------------");
        }catch(err) {
            console.log("\nServer-error: failed to return response(200)\n");
        }

    } else {
        try{
            res.status(500).json({
                Status: "Items not found",
                Type: "Response"
            })

         }catch(err) {
             console.log("\nServer-error: failed to return response(500)\n");
         }
    }

});


