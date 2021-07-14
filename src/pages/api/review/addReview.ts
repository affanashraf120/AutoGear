import type { NextApiRequest, NextApiResponse } from "next";
import Product from "~/models/product";
import dbConnect from "~/utils/dbconnnect";

const getAverage = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    else if (nums.length === 1) return nums[0];
    let sum = 0;
    nums.forEach((num) => {
        sum += num;
    });
    return Math.ceil(sum / nums.length);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();
    const { productId, ...review } = req.body;
    switch (method) {
        case "PUT":
            try {
                const data = await Product.findOne({ _id: productId }, { reviews: true });
                if (data) {
                    let { reviews } = data;
                   
                    reviews.push(review);
                    const ratings: number[] = reviews.map((review: any) => review.rating);
                    const rating = getAverage(ratings);
                   
                    const doc = await Product.findOneAndUpdate(
                        { _id: productId },
                        { $addToSet: { reviews: review } },
                        { new: true, useFindAndModify: false }
                    );
                    const doc1 = await Product.findOneAndUpdate(
                        { _id: productId },
                        { rating: rating },
                        { new: true, useFindAndModify: false }
                    );
                    if (doc && doc1) {
                        res.status(200).json({
                            success: true,
                            message: "Review added",
                            data: doc1,
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
