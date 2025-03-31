const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email, title, body) => {
    try {
      
        let transporter = nodemailer.createTransport({
            // host: process.env.MAIL_HOST,
            // // For secure connection (use 587 for TLS)
            //  // true for 465, false for other ports
            // auth: {
            //     user: process.env.MAIL_USER,
            //     pass: process.env.MAIL_PASS,
            // },


            host: "smtp.gmail.com",
            auth: {
                user: "sahilsingh1892007@gmail.com",
                pass: "iavgaalbmmmbmobt",
            },
        });
    
        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeHelp - by Babbar',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
     
        console.log("Email sent: ", info.messageId);
        return info;
    } catch (error) {
        console.log("Error sending email: ", error.message);
    }
};

module.exports = mailSender;
