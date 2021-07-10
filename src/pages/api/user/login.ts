import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import User from "~/models/user";
import _ from "lodash";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "~/api/config";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const { email, password } = req.body;
                //Check if email exist
                const isEmail = await User.findOne({ email: email });

                if (!isEmail)
                    return res.status(401).json({
                        success: false,
                        message: "Email not exist",
                    });

                const user = await User.findOne({ email, password });
                if (user) {
                    const { _id, fullName, phone, email } = user;
                    let token = jwt.sign({ _id, fullName, phone, email }, JWT_PRIVATE_KEY);
                    // res.setHeader(
                    //     "Set-Cookie",
                    //     cookie.serialize("USER_AUTH_TOKEN", token, {
                    //         httpOnly: true,
                    //         secure: process.env.NODE_ENV !== "development",
                    //         sameSite: "strict",
                    //         maxAge: 3600,
                    //         path: "/",
                    //     })
                    // );

                    res.status(200).json({
                        success: true,
                        message: "User logged in successfully",
                        data: {
                            token: token,
                        },
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: "Invalid password",
                    });
                }
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
