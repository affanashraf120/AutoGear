import type { NextApiRequest, NextApiResponse } from "next";
import Message from "~/models/message";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const doc = await Message.create({
                    ...req.body,
                });
                if (doc) {
                    res.status(200).json({
                        success: true,
                        message: "Message created",
                        data: doc,
                    });
                } else
                    res.status(500).json({
                        success: false,
                        message: "Database Error",
                        data: doc,
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
