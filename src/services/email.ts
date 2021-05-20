import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const getTransporter = async () => {
    const userAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        auth: {
            user: "affanashraf313@gmail.com",
            pass: "Secret@1973",
        },
    });

    return transporter;
};

export const sendMail = async (emails: string[], subject: string, text: string, html: string) => {
    const transporter: Mail = await getTransporter();
    let receiversList = "";
    emails.forEach((email, index) => {
        let emailStr = ``;

        if (index === emails.length - 1) {
            emailStr = `${email}`;
        } else {
            emailStr = `${email},`;
        }

        receiversList.concat(emailStr);
    });
    const info = await transporter.sendMail({
        from: "AutoGear.Pk",
        to: `${receiversList}`,
        subject,
        text,
        html,
    });

    return info;
};
