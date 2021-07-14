import type { NextApiRequest, NextApiResponse } from "next";
import Subscription from "~/models/subscription";
import dbConnect from "~/utils/dbconnnect";
import sendgridMail, { MailDataRequired } from "@sendgrid/mail";
sendgridMail.setApiKey("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");

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();
    const { email } = req.body;
    const msg: MailDataRequired = {
        to: email,
        from: "autogear313@gmail.com", // Use the email address or domain you verified above
        subject: "Newsletter",
        text: "Newsletter",
        html: "Thanks for subscribing our newsletter. We will notify you about updates.",
    };
    switch (method) {
        case "POST":
            try {
                const doc = await Subscription.create({ email });
                if (doc) {
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
                } else
                    res.status(404).json({
                        success: false,
                        message: "Database Error",
                    });
            } catch (error) {
                console.log(error.status);
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
