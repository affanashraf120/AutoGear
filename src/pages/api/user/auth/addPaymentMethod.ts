import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import PaymentMethod from "~/models/paymentMethod";
import User from "~/models/user";
import { validateUser } from "~/api/middlewares/validateUser";
import { JWT_PRIVATE_KEY } from "~/api/config";
import jwt from "jsonwebtoken";

export default validateUser(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    const { userId } = req.body;

    switch (method) {
        case "POST":
            try {
                const doc = await PaymentMethod.create({ ...req.body });
                if (doc) {
                    const user = await User.findOneAndUpdate(
                        {
                            _id: userId,
                        },
                        {
                            isPaymentMethod: true,
                        },
                        {
                            new: true,
                        }
                    );
                    const { _id, fullName, phone, email, city, isPaymentMethod } = user;
                    let token = jwt.sign({ _id, fullName, phone, email, city, isPaymentMethod }, JWT_PRIVATE_KEY);
                    res.status(200).json({
                        success: true,
                        data: token,
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        data: doc,
                    });
                }
            } catch (error) {
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
});
