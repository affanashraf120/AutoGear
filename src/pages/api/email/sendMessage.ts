import type { NextApiRequest, NextApiResponse } from "next";
import sendgridMail from "@sendgrid/mail";
sendgridMail.setApiKey("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");

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { email, message } = req.body;
    const msg = {
        to: email,
        from: "autogear313@gmail.com", // Use the email address or domain you verified above
        subject: "AutoGear Administration",
        text: "Message",
        html: ` <strong>${message}</strong>`,
    };
    switch (method) {
        case "POST":
            try {
                sendgridMail
                    .send(msg)
                    .then((response) => {
                        res.status(200).json({
                            success: true,
                            data: response,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(400).json({
                            success: false,
                            data: error.response,
                        });
                    });
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    success: false,
                    data: error,
                });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
