import nodemailer from 'nodemailer'
export const   transporter  = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "mernstackdevv@gmail.com",
            pass: "mardan8110"
        }
    });

export const generateOtp = ()=> {
    
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;    
}