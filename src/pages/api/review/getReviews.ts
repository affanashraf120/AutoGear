import type { NextApiRequest, NextApiResponse } from "next";
import Product from "~/models/product";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { productId } = req.query;
    switch (method) {
        case "GET":
            try {
                const doc = await Product.find({ _id: productId });
                if (doc.length > 0) {
                    res.status(200).json({
                        success: true,
                        data: doc,
                    });
                } else
                    res.status(404).json({
                        success: false,
                        message: "Database Error",
                        data: doc,
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
