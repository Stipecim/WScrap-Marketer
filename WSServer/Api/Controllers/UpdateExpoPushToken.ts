import { NextFunction, Request, Response } from "express";
import express from "express";
import UpdateExpoPushTokenService from "../../Services/UpdateExpoPushTokenService.js";



const router = express.Router();


router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    const expoPushToken = req.body.data;
    console.log("expoPushToken", expoPushToken);

    const hasUpdated = await UpdateExpoPushTokenService(expoPushToken);

    if(hasUpdated) {
        res.status(200).json({
            TokenUpdate: "Successful"
        });
    }else {
        res.status(500).json({
            TokenUpdate: "Failed"
        });
    }

    
    
})

export default router;