import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Product from "~/models/product";
import { makeApiFetchCarToProduct } from "~/server/utils";
import { ICarProduct } from "~/interfaces/product";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const { slug } = req.body;
                const arr = slug.split("-");
                const id = arr[arr.length - 1];
                const carProduct = await Product.findOne({ _id: id });
                const product = makeApiFetchCarToProduct(carProduct, carProduct._id);
                res.status(200).json({
                    success: true,
                    data: product,
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
