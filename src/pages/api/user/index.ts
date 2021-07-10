import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { JWT_PRIVATE_KEY } from "~/api/config";
import { verify } from "jsonwebtoken";
import jwtDecode from "jwt-decode";

export const authenticated = (nextFunction: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.USER_AUTH_TOKEN!, JWT_PRIVATE_KEY, async function (err, decoded) {
        if (!err && decoded) {
            return await nextFunction(req, res);
        }
        res.status(401).json({ message: "Unauthorized access" });
    });
};

export default authenticated(async function getUser(req: NextApiRequest, res: NextApiResponse) {
    const payload: any = jwtDecode(req.cookies.USER_AUTH_TOKEN);
    const { email } = payload;
    let avatar = `https://ui-avatars.com/api/?name=${email}`;
    const user = {
        avatar,
        ...payload,
    };

    res.status(200).json({
        success: true,
        data: user,
    });
});
