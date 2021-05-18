import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import User from "~/models/user";
import _ from "lodash";

type LoginData = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                //Check if email exist
                const userEl = await User.findOne({ email: req.body.email });

                if (userEl) {
                    const user = _.pick(userEl, ["_id", "firstName", "lastName", "email", "phone"]);
                    let avatar = `https://ui-avatars.com/api/?name=${user.email}`;
                    if (user.firstName && user.lastName) {
                        avatar = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`;
                    }
                    res.status(200).json({
                        success: true,
                        data: {
                            ...user,
                            avatar,
                        },
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        data: "Email not exist",
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
