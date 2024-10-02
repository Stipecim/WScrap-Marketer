import { NextFunction, Request, Response } from "express";
import express from "express";
import UpdateExpoPushTokenService from "../../Services/UpdateExpoPushTokenService.js";



const router = express.Router();


router.post("/", async(req: Request, res: Response, next: NextFunction) => {
    const expoPushToken = req.body.data;
    //console.log("NewExpoPushToken: ", expoPushToken);

    console.log(`\nServer: Client Requesting to update token: ${expoPushToken}\n`);
    const hasUpdated = await UpdateExpoPushTokenService(expoPushToken);

    if(hasUpdated) {
        
        console.log('\nServer: Token Update/Checked\n');

        try{   
            res.status(200).json({
                TokenUpdate: "Token Successfully Updated"
            });

        }catch(err) {
            console.log("\nServer-error: failed to return response(200)\n");
        }
    }else {
        
        try{   
            res.status(500).json({
                TokenUpdate: "Failed to update token"
            });

        }catch(err) {
            console.log("\nServer-error: failed to return response(200)\n");
        }
    }
    
})

export default router;