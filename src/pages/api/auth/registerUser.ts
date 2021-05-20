import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import User from "~/models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                //Check it email exist
                const userEl = await User.find({ email: req.body.email });
                if (userEl.length > 0) {
                    res.status(401).json({
                        success: false,
                        data: "Email already exist",
                    });
                } else {
                    const user = await User.create({
                        email: req.body.email,
                        password: req.body.password,
                    });
                    res.status(200).json({
                        success: true,
                        data: {
                            _id: user._id,
                            email: user.email,
                            avatar: "https://ui-avatars.com/api/?name=" + user.email,
                        },
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    data: error,
                });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
