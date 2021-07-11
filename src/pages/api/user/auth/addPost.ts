import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/utils/dbconnnect";
import Product from "~/models/product";
import { verify } from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "~/api/config";

const DAY_POST_LIMIT = 3;
const MONTH_POST_LIMIT = 20;

const validateUser = (nextFunction: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;
    if (token) {
        verify(token.toString(), JWT_PRIVATE_KEY, async function (err, decoded) {
            if (!err && decoded) {
                req.body.user = decoded;
                return await nextFunction(req, res);
            }
            res.status(401).json({ message: "Unauthorized access" });
        });
    } else {
        res.status(401).json({ message: "Unauthorized access" });
    }
};

type DateObject = {
    day: number;
    month: number;
    year: number;
};

const validatePostLimit = (nextFunction: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { postedDate, user } = req.body;
    const postDate = new Date(postedDate);
    const day = postDate.getDate();
    const month = postDate.getMonth() + 1;
    const year = postDate.getFullYear();
    const { _id } = user;
    const products = await Product.find({ sellerId: _id }, { postedDate });
    if (products.length > 0) {
        const dates = products.map((product) => product.postedDate);
        const dateObjects: DateObject[] = dates.map((date) => {
            const el = new Date(date);
            const obj: DateObject = {
                day: el.getDate(),
                month: el.getMonth() + 1,
                year: el.getFullYear(),
            };
            return obj;
        });

        const sameDay = dateObjects.filter((date) => date.day === day && date.month === month && date.year === year);
        //Day post limit
        if (sameDay.length > DAY_POST_LIMIT) {
            return res.status(429).json({
                message: "Day post limit exceeded",
                data: {
                    dayPosts: sameDay,
                },
            });
        }

        //Month post limit
        const sameMonth = dateObjects.filter((date) => date.month === month && date.year === year);
        if (sameMonth.length > MONTH_POST_LIMIT) {
            return res.status(429).json({
                message: "Monthly post limit exceeded",
                data: {
                    monthPosts: sameMonth,
                },
            });
        }
        return await nextFunction(req, res);
    } else {
        return await nextFunction(req, res);
    }
};

export default validateUser(
    validatePostLimit(async (req: NextApiRequest, res: NextApiResponse) => {
        const { method } = req;

        await dbConnect();

        switch (method) {
            case "POST":
                try {
                    const doc = await Product.create({
                        ...req.body,
                    });

                    if (doc) {
                        res.status(200).json({
                            success: true,
                            message: "Product created successfully",
                            data: doc,
                        });
                    } else
                        res.status(500).json({
                            success: false,
                            message: "Database Error",
                            data: doc,
                        });
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        message: "Server error",
                        data: error,
                    });
                }
                break;
            default:
                res.status(400).json({ success: false, message: "Invalid Request" });
                break;
        }
    })
);
