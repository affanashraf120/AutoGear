import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Product from "~/models/product";

type DateObject = {
    day: number;
    month: number;
    year: number;
};

const DAY_POST_LIMIT = 30;
const MONTH_POST_LIMIT = 20;

export const validatePostLimit =
    (nextFunction: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
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

            const sameDay = dateObjects.filter(
                (date) => date.day === day && date.month === month && date.year === year
            );
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
