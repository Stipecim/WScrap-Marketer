import { NextFunction, Request, Response } from "express";
import express from "express";
import { sendPushNotificationsAsync } from "../../Firebase/pushNotification.js";

const router = express.Router();


router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token.data;
    // access data base with service and store token, also make comparison
})

export default router;