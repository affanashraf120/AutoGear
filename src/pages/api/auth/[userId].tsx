import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import User from "~/models/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.query;

        await dbConnect();

        const user = await User.findOne({ _id: userId });

        if (user) {
            res.status(200).json({
                success: true,
                data: user,
            });
        } else {
            res.status(200).json({
                success: false,
                data: "Not found",
            });
        }
    } catch (error) {
        res.status(200).json({
            success: false,
            data: "Catch block error",
        });
    }
};
