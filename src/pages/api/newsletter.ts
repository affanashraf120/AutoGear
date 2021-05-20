import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const { name, email, subject, message } = req.body;

                const transporter = nodemailer.createTransport(
                    sendgridTransport({
                        auth: {
                            api_key: "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",
                        },
                    })
                );

                let response = await transporter.sendMail({
                    to: ["affanashraf313@gmail.com"],
                    from: "tylermerren@revisionfitnessapp.com",
                    subject: subject,
                    html: `<div><h4>Name : ${name}</h4><h4>Email : ${email}</h4><h4>Message : ${message}</h4></div>`,
                });

                res.status(200).json({
                    success: true,
                    data: response,
                });
            } catch (error) {
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
