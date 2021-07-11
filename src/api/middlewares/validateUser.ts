import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { JWT_PRIVATE_KEY } from "../config";

export const validateUser = (nextFunction: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            verify(token.toString(), JWT_PRIVATE_KEY, async function (err, decoded) {
                if (!err && decoded) {
                    return await nextFunction(req, res);
                }
                return res.status(401).json({ message: "Unauthorized access" });
            });
        } else {
            return res.status(401).json({ message: "Unauthorized access" });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            data: error,
        });
    }
};
