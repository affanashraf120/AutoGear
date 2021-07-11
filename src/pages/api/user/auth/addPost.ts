import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Product from "~/models/product";
import { verify } from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "~/api/config";
import { validateUser } from "~/api/middlewares/validateUser";
import { validatePostLimit } from "~/api/middlewares/validatePostLimit";

export default validateUser(
    validatePostLimit(async (req: NextApiRequest, res: NextApiResponse) => {
        const { method } = req;

        await dbConnect();

        switch (method) {
            case "POST":
                try {
                    const doc = await Product.create({
                        ...req.body,
                    });

                    if (doc) {
                        res.status(200).json({
                            success: true,
                            message: "Product created successfully",
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
    })
);
