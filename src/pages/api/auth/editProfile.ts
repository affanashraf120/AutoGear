import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import User from "~/models/user";
import { IEditProfileData } from "~/api/base/account.api";
import _ from "lodash";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "PUT":
            try {
                const { firstName, lastName, phone, email } = req.body;
                const filter = { email };
                const update = { firstName, lastName, phone };
                const userEl = await User.findOneAndUpdate(filter, update, {
                    useFindAndModify: true,
                });
                if (userEl) {
                    const user = _.pick(userEl, ["_id", "firstName", "lastName", "email", "phone"]);
                    res.status(200).json({
                        success: true,
                        data: {
                            ...user,
                            avatar: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`,
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
