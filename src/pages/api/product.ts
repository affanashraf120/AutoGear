import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();
    res.status(200).json({ name: "John Doe" });
};
