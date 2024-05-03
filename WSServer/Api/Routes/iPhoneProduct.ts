import { NextFunction, Request, Response } from "express";
import express from "express";
import GetIphone from "../../Services/FbMarketIphone.js";
const router = express.Router();

router.get("/", async(req: Request, res: Response, next: NextFunction) => {
    console.log(req)
    const data = await GetIphone();
    
    res.status(200).json({
        data
    })
})


export default router;

