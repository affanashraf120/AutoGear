import type { NextApiRequest, NextApiResponse } from "next";
import { IFilterValues, IListOptions } from "~/interfaces/list";
import { IProduct } from "~/interfaces/product";
import Product from "~/models/product";
import { AbstractFilterBuilder } from "~/server/filters/abstract-filter-builder";
import { CategoryFilterBuilder } from "~/server/filters/category-filter-builder";
import { CheckFilterBuilder } from "~/server/filters/check-filter-builder";
import { ColorFilterBuilder } from "~/server/filters/color-filter-builder";
import { RadioFilterBuilder } from "~/server/filters/radio-filter-builder";
import { RangeFilterBuilder } from "~/server/filters/range-filter-builder";
import { RatingFilterBuilder } from "~/server/filters/rating-filter-builder";
import { VehicleFilterBuilder } from "~/server/filters/vehicle-filter-builder";
import { makeApiFetchCarToProduct } from "~/server/utils";
import dbConnect from "~/utils/dbconnnect";

const getDate = (dateString: number): string => {
    const date = new Date(dateString);
    const formatedDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    return formatedDate;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                const carProducts = await Product.find({});
                let products = carProducts.map((carProduct) => makeApiFetchCarToProduct(carProduct, carProduct._id));
                const dbProducts = products;
                const options: IListOptions = req.body.options;
                const filterValues: IFilterValues = req.body.filterValues;

                console.log("******Before Filter*******");
                console.log("Filters Values", filterValues);
                console.log("Options", options);
                const filters: AbstractFilterBuilder[] = [
                    // new CategoryFilterBuilder("category", "Categories"),
                    // new VehicleFilterBuilder("vehicle", "Vehicle"),
                    new RangeFilterBuilder("price", "Price"),
                    new CheckFilterBuilder("brand", "Brand"),
                    // new RadioFilterBuilder("discount", "With Discount"),
                    new RatingFilterBuilder("rating", "Rating"),
                    // new ColorFilterBuilder("color", "Color"),
                ];

                if (filterValues) {
                    console.log("******After Filter*******");
                    console.log("Filters", filters);
                    filters.forEach((filter) => {
                        filter.makeItems(products, filterValues[filter.slug]);
                    });
                    console.log("******After Make Items*******");

                    // Calculate items count for filter values.
                    filters.forEach((filter) => filter.calc(dbProducts, filters));

                    console.log("***********After Items Count****************");

                    // Apply filters to products list.
                    products = products.filter((product) =>
                        filters.reduce<boolean>((mr, filter) => mr && filter.test(product), true)
                    );
                    console.log("***********After Apply Filters****************");
                }

                const page = options?.page || 1;
                const limit = options?.limit || 16;
                const sort = options?.sort || "default";
                const total = products.length;
                const pages = Math.ceil(products.length / limit);
                const from = (page - 1) * limit + 1;
                const to = Math.min(page * limit, total);

                // Sort items array.
                products = products.sort((a, b) => {
                    if (["name_asc", "name_desc"].includes(sort)) {
                        if (a.name === b.name) {
                            return 0;
                        }

                        return (a.name > b.name ? 1 : -1) * (sort === "name_asc" ? 1 : -1);
                    }

                    return 0;
                });

                const items = products.slice(from - 1, to) as unknown as Array<IProduct>;

                const result = {
                    items,
                    page,
                    limit,
                    sort,
                    total,
                    pages,
                    from,
                    to,
                    filters: filters.map((x) => x.build()),
                };

                res.status(200).json({
                    success: true,
                    data: result,
                });
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    success: false,
                    data: "Catch block error",
                });
            }
            break;
        default:
            res.status(400).json({ success: false, data: "Default Error" });
            break;
    }
};
