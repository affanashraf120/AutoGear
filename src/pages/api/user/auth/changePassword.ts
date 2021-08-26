/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable linebreak-style */
import { NextApiRequest, NextApiResponse } from "next";
import { validateUser } from "~/api/middlewares/validateUser";
import User from "~/models/user";
import dbConnect from "~/utils/dbconnnect";

export default validateUser(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "PUT":
            try {
                await dbConnect();

                const data = req.body;
                const { oldPassword, newPassword, id } = data;

                const confirmPassword = await User.find({ _id: id, password: oldPassword });
                if (confirmPassword) {
                    User.findOneAndUpdate(
                        { _id: id },
                        { password: newPassword },
                        { new: true },
                        (err: any, doc: any) => {
                            if (err) {
                                return res.status(502).json({
                                    success: false,
                                    message: "Database error",
                                });
                            }
                            return res.status(200).json({
                                success: true,
                                message: "Password changed successfully",
                            });
                        }
                    );
                } else {
                    res.status(401).json({
                        success: false,
                        message: "Wrong password provided",
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
});
