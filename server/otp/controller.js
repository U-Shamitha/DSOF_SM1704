import OTP from "./model.js";
import generateOTP from "./generateOTP.js";
import sendEmail from "./sendEmail.js";
import hashData from "./hashData/hashData.js";
import verifyHashedData from './hashData/verifyHashedData.js'


const { AUTH_EMAIL } = process.env;

export const verifyOTP = async ({ email, otp }) => {
    try{
        if (!(email && otp)){
            console.log("Provide values for email, otp");
            throw Error("Provide values for email, otp");
        }

        //ensure otp record exists
        const matchedOTPRecord = await OTP.findOne({
            email
        })

        if(!matchedOTPRecord){
            console.log("No otp records found");
        }

        const { expiresAt } = matchedOTPRecord;

        //checking for expired code
        if (expiresAt < Date.now()){
            await OTP.deleteOne({ email });
            console.log("Code has expired. Request for a new one.")
            throw Error("Code has expired. Request for a new one."); 
        }
        
        // not expired yet, verify value
        const hashedOTP = matchedOTPRecord.otp;
        const validOTP = await verifyHashedData(otp, hashedOTP);
        return validOTP;

    }catch(err){
        console.log(err);
        throw err;
    }
}




export const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try{
        console.log("in sendOTP")
        if(!(email && subject && message)){
            console.log("Provide values for email, subject, message");
        }

        //clear any old record
        await OTP.deleteOne({ email });

        //generate pin
        const generatedOTP = await generateOTP();

        //send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p>
                   <p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p>
                   <p>This code <b>expires in ${duration} hour(s)></b>.</p>`
        };
        await sendEmail(mailOptions);

        //save otp record
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await OTP.create({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });

        const createdOTPRecord = await newOTP.save();
        console.log(createdOTPRecord);
        return createdOTPRecord;

    }catch(err){
        throw err;
    }
};


export const deleteOTP = async (email) => {
    try{
        await OTP.deleteOne({ email });
    }catch (err){
        throw err;
    }
}
