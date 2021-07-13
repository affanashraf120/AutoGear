import type { NextApiRequest, NextApiResponse } from "next";
import Product from "~/models/product";
import dbConnect from "~/utils/dbconnnect";

const getAverage = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    let sum = 0;
    nums.forEach((num) => {
        sum += num;
    });
    return sum / nums.length;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();
    const { productId, ...review } = req.body;
    switch (method) {
        case "PUT":
            try {
                const docs = await Product.find({ _id: productId }, { reviews: true });
                if (docs.length > 0) {
                    const { reviews } = docs[0];
                    const ratings: number[] = reviews.map((review: any) => review.rating);
                    const rating = getAverage(ratings);
                    const doc = await Product.findOneAndUpdate(
                        { _id: productId },
                        { $addToSet: { reviews: review } },
                        { new: true, useFindAndModify: false }
                    );
                    await Product.findOneAndUpdate(
                        { _id: productId },
                        { rating: rating },
                        { new: true, useFindAndModify: false }
                    );
                    if (doc) {
                        res.status(200).json({
                            success: true,
                            message: "Review added",
                            data: doc,
                        });
                    } else
                        res.status(404).json({
                            success: false,
                            message: "Database Error",
                        });
                } else
                    res.status(404).json({
                        success: false,
                        message: "Database Error",
                    });
            } catch (error) {
                console.log(error);
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
