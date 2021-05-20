import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Product from "~/models/product";
import { makeApiFetchCarToProduct } from "~/server/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const { make, model } = req.body;
                const carProduct = await Product.findOne({
                    make,
                    model,
                });
                if (carProduct) {
                    const product = makeApiFetchCarToProduct(carProduct, carProduct._id);
                    res.status(200).json({
                        success: true,
                        data: product,
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        data: "Not Found",
                    });
                }
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
