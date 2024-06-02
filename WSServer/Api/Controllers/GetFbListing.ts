import express, { NextFunction, Request, Response } from "express";
import GetFbListingService from "../../Services/GetFbListingService.js";
import Iphone from "../../model/Iphone.js";
const router = express.Router();

export default router.get('/iphones', async(req: Request, res: Response, next: NextFunction) => {
    const iphones: Iphone[] | undefined =  await GetFbListingService()

    if(undefined) {
        res.status(404).json({
            Status: "Currently not available"
        })
    } else {
        res.status(200).json({
            iphones
        })
    }


});


