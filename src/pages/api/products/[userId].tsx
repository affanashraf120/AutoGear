import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Product from "~/models/product";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.query;

        await dbConnect();

        const products = await Product.find({ sellerId: userId });

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
