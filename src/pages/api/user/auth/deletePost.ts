import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { JWT_PRIVATE_KEY } from "~/api/config";
import { validateUser } from "~/api/middlewares/validateUser";
import Product from "~/models/product";
import dbConnect from "~/utils/dbconnnect";

export default validateUser(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    const { productId } = req.query;

    await dbConnect();

    switch (method) {
        case "DELETE":
            try {
                const doc = await Product.findOneAndDelete({ _id: productId });

                if (doc) {
                    res.status(200).json({
                        success: true,
                        message: "Product deleted successfully",
                        data: doc,
                    });
                } else
                    res.status(500).json({
                        success: false,
                        message: "Database Error",
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
