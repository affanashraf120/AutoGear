import React from "react";
import ProductForm from "~/components/shop/ProductForm";
import ShopPageProduct from "~/components/shop/ShopPageProduct";
import ShopPageShop from "~/components/shop/ShopPageShop";
import CarsView from "~/custom/components/CarsView";
import { IProduct } from "~/interfaces/product";

const CarView = () => {
    const product: IProduct = {
        id: 12,
        name: "Honda City",
        excerpt: "Collin Fan",
        description: "this is good",
        slug: "lsjf87",
        partNumber: "34",
        stock: "on-backorder",
        price: 2354235,
        compareAtPrice: 12,
        badges: ["AutoGear", "new"],
        compatibility: "unknown",
        images: ["https://static.pakwheels.com/2020/06/2020-Honda-City-official-4-1200x628-1.jpg"],
        type: {
            name: "City",
            slug: "",
            attributeGroups: [{ name: "", slug: "", customFields: [], attributes: [] }],
        },
        attributes: [],
        options: [],
    };

    return (
        <React.Fragment>
            {/* <ShopPageProduct product={product} layout={"full"} /> */}
            <CarsView />
            {/* <ShopPageShop layout="grid" gridLayout="grid-3-sidebar" /> */}
        </React.Fragment>
    );
};

export default CarView;

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
