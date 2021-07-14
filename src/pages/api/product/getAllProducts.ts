import { verify } from "jsonwebtoken";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { JWT_PRIVATE_KEY } from "~/api/config";
import { validateUser } from "~/api/middlewares/validateUser";
import Product from "~/models/product";
import { makeApiFetchCarToProduct } from "~/server/utils";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    const { id } = req.query;

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
