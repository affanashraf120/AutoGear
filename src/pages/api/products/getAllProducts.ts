import type { NextApiRequest, NextApiResponse } from "next";
import Product from "~/models/product";
import { makeApiFetchCarToProduct } from "~/server/utils";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const carProducts = await Product.find({});
                let products = carProducts.map((carProduct) => makeApiFetchCarToProduct(carProduct, carProduct._id));
                res.status(200).json({
                    success: true,
                    data: products,
                });
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    success: false,
                    data: "Catch block error",
                });
            }
            break;
        default:
            res.status(400).json({ success: false, data: "Default Error" });
            break;
    }
};
