import type { NextApiRequest, NextApiResponse } from "next";
import Subscription from "~/models/subscription";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const docs = await Subscription.find({});
                const emails = docs.map((doc) => doc.email);
                console.log(emails);
                if (docs.length > 0) {
                    res.status(200).json({
                        success: true,
                        data: emails,
                    });
                } else
                    res.status(404).json({
                        success: false,
                        message: "Database Error",
                    });
            } catch (error) {
                console.log(error);
                res.status(500).json({
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
