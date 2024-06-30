import nodemailer from "nodemailer"; 

export const mailer = async ({ email, subject, message }) => {
    try { 
        const transport = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_ID, 
                pass: process.env.PASSWORD,
            },
        }); 

        const mailOption = {
            from: process.env.USER_ID,
            to: email,
            subject: subject,
            html: message,
        };
        const mailResponse = await transport.sendMail(mailOption);
        // console.log(mailResponse); 
        return mailResponse;
    } catch (error) {
        throw new Error(error.message);
    }
};
