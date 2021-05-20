import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import User from "~/models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "PUT":
            try {
                const { oldPassword, newPassword, id } = req.body;
                console.log(req.body)
                const userEl = await User.findOne({ _id: id });
                console.log(userEl)
                if (userEl) {
                    if (userEl.password === oldPassword) {
                        const filter = { _id: id };
                        const update = { password: newPassword };
                        const user = await User.findOneAndUpdate(filter, update, {
                            useFindAndModify: true,
                        });
                        res.status(200).json({
                            success: true,
                            data: {
                                _id: user._id,
                                user,
                            },
                        });
                    } else {
                        res.status(400).json({
                            success: false,
                            data: "Wrong password entered",
                        });
                    }
                } else {
                    res.status(400).json({
                        success: false,
                        data: "User not exist",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    data: "Catch block error",
                });
            }
            break;
        default:
            res.status(400).json({ success: false, data:"Default error" });
            break;
    }
};
