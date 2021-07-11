import type { NextApiRequest, NextApiResponse } from "next";
import { validateUser } from "~/api/middlewares/validateUser";
import Product from "~/models/product";
import dbConnect from "~/utils/dbconnnect";

export default validateUser(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    const { _id } = req.query;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const doc = await Product.find({
                    sellerId: _id,
                });
                res.status(200).json({
                    success: true,
                    data: doc,
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Server error",
                    data: error,
                });
            }
            break;
        default:
            res.status(400).json({ success: false, message: "Invalid Request" });
            break;
    }
});
