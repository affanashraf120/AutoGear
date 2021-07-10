import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const { name, email, subject, message } = req.body;

                res.status(200).json({
                    success: true,
                    data: {},
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
