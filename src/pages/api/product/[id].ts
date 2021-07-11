import { verify } from "jsonwebtoken";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { JWT_PRIVATE_KEY } from "~/api/config";
import { validateUser } from "~/api/middlewares/validateUser";
import Product from "~/models/product";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const doc = await Product.findOne({
                    _id: id,
                });
                if (doc)
                    res.status(200).json({
                        success: true,
                        data: doc,
                    });
                else
                    res.status(404).json({
                        success: false,
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
};
