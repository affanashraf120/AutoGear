import React from "react";
import BlockSpace from "~/components/blocks/BlockSpace";
import { bodyTypes } from "~/custom-server/database/bodyTypes";
import { engineTypes } from "~/custom-server/database/engineTypes";
import { transmissions } from "~/custom-server/database/transmissions";
import CarView from "~/custom/components/product/CarView";
import { ICar, ICarPost } from "~/interfaces/custom/car";
import { IProduct } from "~/interfaces/product";

const NewCars = () => {
    // const product: IProduct = {
    //     id: 12,
    //     name: "Honda City",
    //     excerpt: "Collin Fan",
    //     description: "this is good",
    //     slug: "lsjf87",
    //     partNumber: "34",
    //     stock: "on-backorder",
    //     price: 2354235,
    //     compareAtPrice: 12,
    //     badges: ["AutoGear", "new"],
    //     compatibility: "unknown",
    //     images: ["https://static.pakwheels.com/2020/06/2020-Honda-City-official-4-1200x628-1.jpg"],
    //     type: {
    //         name: "City",
    //         slug: "",
    //         attributeGroups: [{ name: "", slug: "", customFields: [], attributes: [] }],
    //     },
    //     attributes: [
    //         {
    //             name: "Transmission",
    //             slug: "",
    //             featured: true,
    //             values: [{ slug: "transmission", name: "Transmission" }],
    //         },
    //     ],
    //     options: [],
    // };

    const car: ICar = {
        make: "Honda",
        model: "Civic",
        version: "2021",
        year: new Date(),
        transmission: transmissions[0],
        bodyType: bodyTypes[0],
        colors: ["red"],
        images: ["https://cdn.motor1.com/images/mgl/BqL4M/s1/2022-honda-civic-sedan-rendering.jpg"],
        engineCapacity: 1800,
        engineType: engineTypes[0],
    };

    const product: ICarPost = {
        //TODO
        car: car,
        postedDate: new Date(),
        mileage: 1000,
        province: "Punjab",
        city: "Lahore",
        registrationCity: "Lahore",
        rating: 3,
        images: ["https://cdn.motor1.com/images/mgl/BqL4M/s1/2022-honda-civic-sedan-rendering.jpg"],
        color: "red",
        price: 1230000,
        compareAtPrice: 1210000,
        badges: [{ slug: "autogear", name: "AutoGear", image: "" }],
        sellerPhone: "03214371392",
        assembly: "Local",
        Transaction: {
            transactionType: "Cash",
            flatPrice: 1230000,
        },
        options: [
            {
                name: "Material",
                slug: "material",
                type: "default",
                values: [
                    {
                        name: "Crystal",
                        slug: "crystal",
                    },
                ],
            },
        ],
    };

    return (
        <React.Fragment>
            <BlockSpace layout="before-footer" />
            <CarView product={product} layout="full" />
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
};

export default NewCars;

// id: number;
//     name: string;
//     /**
//      * A short product description without HTML tags.
//      */
//     excerpt: string;
//     description: string;
//     slug: string;
//     sku?: string;
//     partNumber: string;
//     stock: IProductStock;
//     price: number;
//     compareAtPrice: number|null;
//     images?: string[];
//     badges?: string[];
//     rating?: number;
//     reviews?: number;
//     availability?: string;
//     /**
//      * 'all'     - Compatible with all vehicles.
//      * 'unknown' - No compatibility information. Part may not fit the specified vehicle.
//      * number[]  - An array of vehicle identifiers with which this part is compatible.
//      */
//     compatibility: 'all' | 'unknown' | number[];
//     brand?: IBrand|null;
//     tags?: string[];
//     type: IProductType;
//     categories?: IShopCategory[];
//     attributes: IProductAttribute[];
//     options: IProductOption[];
//     customFields?: ICustomFields;
