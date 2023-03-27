import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const { AUTH_EMAIL, AUTH_PASS} = process.env;
// console.log(process.env.AUTH_EMAIL);
// console.log(process.env.AUTH_PASS);

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS
    },
});

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'aaron.mcglynn@ethereal.email',
//         pass: 'xReSh5gewzKD8nXvpE'
//     }
// });

//test transporter
transporter.verify((error, success) =>{
    if (error) {
        console.log(error);
    }else{
        console.log("Ready for messages");
        console.log(success)
    }

});


const sendEmail = async (mailOptions) => {
    try{
        console.log("in sendEmail")
        await transporter.sendMail(mailOptions);
        return;
    }catch (error){
        console.log(error);
    }

}

export default sendEmail;