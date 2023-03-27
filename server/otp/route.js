import express from 'express';
import { sendOTP, verifyOTP } from './controller.js';

const router = express.Router();

//verify otp
router.post("/verify-otp",  async (req, res) => {
    try{
        console.log("in verify otp");
        let { email, otp } = req.body;
        const validOTP = await verifyOTP({ email, otp });
        console.log('validOTP: '+validOTP);
        res.status(200).json({ valid: validOTP});
    }catch(err){
        res.status(400).send(err.message)
    }
})


//request new verification otp
router.post("/send-otp",async (req, res) => {
    try{
        console.log("in route of otp")

        const {email, subject, message, duration} = req.body;

        const createdOTP = await sendOTP({
            email,
            subject,
            message,
            duration
        });
        res.status(200).json(createdOTP);
        console.log(createdOTP);

    }catch(err){
        res.status(400).send(err.message);
    }
})

export default router;