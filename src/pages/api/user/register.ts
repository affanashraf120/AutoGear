import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import User from "~/models/user";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "~/api/config";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                await dbConnect();

                const data = req.body;
                const { email, phone } = data;

                const isEmail = await User.findOne({ email: email });
                const isPhone = await User.findOne({ phone: phone });

                if (isEmail)
                    return res.status(401).json({
                        success: false,
                        message: "Email Already exist",
                    });
                if (isPhone)
                    return res.status(401).json({
                        success: false,
                        message: "Phone Already exist",
                    });

                const user = new User({ ...data });

                const response = await user.save();
                console.log(response);
                if (response) {
                    const { _id, fullName, phone, email, city, isPaymentMethod } = response;
                    let token = jwt.sign({ _id, fullName, phone, email, city, isPaymentMethod }, JWT_PRIVATE_KEY);

                    res.status(200).json({
                        success: true,
                        message: "User logged in successfully",
                        data: {
                            token: token,
                        },
                    });
                } else
                    res.status(500).json({
                        success: false,
                        message: "Database Error",
                        data: response,
                    });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    data: error,
                });
            }
            break;
        default:
            res.status(400).json({ success: false, message: "Invalid Request" });
            break;
    }
};
