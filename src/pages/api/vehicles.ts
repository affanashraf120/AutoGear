import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Vehicle from "~/models/vehicle";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const vehicle = await Vehicle.create({
                    ...req.body,
                });
                res.status(201).json({ success: true, data: vehicle });
            } catch (error) {
                res.status(400).json({
                    error,
                    data: req.body,
                });
            }
            break;
        case "GET":
            try {
                const vehicles = await Vehicle.find({});
                res.status(400).json({ success: false, data: [...vehicles] });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
