import type { NextApiRequest, NextApiResponse } from "next";
import AdminMessage from "~/models/adminMessage";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const docs = await AdminMessage.find({});
                if (docs.length > 0) {
                    res.status(200).json({
                        success: true,
                        message: "Message created",
                        data: docs,
                    });
                } else
                    res.status(500).json({
                        success: false,
                        message: "Database Error",
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
