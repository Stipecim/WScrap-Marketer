import { NextFunction, Request, Response } from "express";
import express from "express";
import UpdateExpoPushTokenService from "../../Services/updateExpoPushTokenService.js";


const router = express.Router();


router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    const expoPushToken = req.body;

    const hasUpdated = await UpdateExpoPushTokenService(expoPushToken);

    if(hasUpdated) {
        res.status(200).json({
            Update: "Successful"
        });
    }

    res.status(500).json({
        Update: "Failed"
    });
    // access data base with service and store token, also make comparison
})

export default router;