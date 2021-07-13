import type { NextApiRequest, NextApiResponse } from "next";
import { validateUser } from "~/api/middlewares/validateUser";
import Message from "~/models/message";
import dbConnect from "~/utils/dbconnnect";

export default validateUser(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();
    const { _id } = req.query;
    switch (method) {
        case "GET":
            try {
                const messages = await Message.find({
                    sellerId: _id,
                });
                if (messages.length > 0) {
                    res.status(200).json({
                        success: true,
                        data: messages,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        error: "Messages not found",
                    });
                }
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
});
