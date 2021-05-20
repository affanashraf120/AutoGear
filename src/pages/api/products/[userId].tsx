import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Product from "~/models/product";
import { makeApiFetchCarToProduct } from "~/server/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.query;

        await dbConnect();

        const carProducts = await Product.find({ sellerId: userId });
        let products = carProducts.map((carProduct) => makeApiFetchCarToProduct(carProduct, carProduct._id));

        if (products) {
            res.status(200).json({
                success: true,
                data: products,
            });
        } else {
            res.status(200).json({
                success: false,
                data: "Not found",
            });
        }
    } catch (error) {
        res.status(200).json({
            success: false,
            data: "Catch block error",
        });
    }
};
