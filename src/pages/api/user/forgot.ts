import { NextApiRequest, NextApiResponse } from "next";
import User from "~/models/user";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "PUT":
            try {
                await dbConnect();

                const data = req.body;
                const { email, password } = data;

                const isEmail = await User.findOne({ email: email });

                if (!isEmail)
                    return res.status(401).json({
                        success: false,
                        message: "Email not exist",
                    });

                const doc = await User.findOneAndUpdate({ email }, { password: password }, { new: true });
                const updated = doc.password === password;

                if (updated) {
                    res.status(200).json({
                        success: true,
                        message: "Password changed successfully",
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
