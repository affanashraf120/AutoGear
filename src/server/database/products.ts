/* eslint-disable import/prefer-default-export */

// application
import { attributesGroups } from "~/custom-server/database/product/attributesGroups";
import { brands } from "~/server/database/brands";
import { shopCategoriesList } from "~/server/database/categories";
import { prepareCategory } from "~/server/endpoints/categories";
import { IProductAttributesDef, IProductDef } from "~/server/interfaces/product-def";
import { makeIdGenerator, nameToSlug } from "~/server/utils";
import { IBrand } from "~/interfaces/brand";
import { IShopCategory } from "~/interfaces/category";
import { IProduct, IProductAttribute, Transaction } from "~/interfaces/product";

const getNextId = makeIdGenerator();

const transactionCash: Transaction = {
    transactionType: "Cash",
    flatPrice: 3200000,
};
const transactionLeased: Transaction = {
    transactionType: "Leased",
    flatPrice: 1200000,
    leased: {
        timeInterval: "month",
        terms: 10,
        leasedAmount: 100000,
    },
};

export function resolveProductAttributesDef(attributesDef: IProductAttributesDef): IProductAttribute[] {
    const attributes: IProductAttribute[] = [];
    const keys = Object.keys(attributesDef);

    for (let i = 0; i < keys.length; i += 1) {
        const attributeName = keys[i];
        const attribute: IProductAttribute = {
            name: attributeName,
            slug: nameToSlug(attributeName),
            featured: false,
            values: [],
        };

        const valuesDef = attributesDef[attributeName];
        let valueNames: string[] = [];

        if (typeof valuesDef === "string") {
            valueNames = [valuesDef];
        } else {
            if (valuesDef[0] === true) {
                attribute.featured = true;
                valuesDef.splice(0, 1);
            }

            valueNames = valuesDef as string[];
        }

        valueNames.forEach((valueName) => {
            attribute.values.push({
                name: valueName,
                slug: nameToSlug(valueName),
            });
        });

        if (attribute.values.length > 0) {
            attributes.push(attribute);
        }
    }

    return attributes;
}

function makeProducts(defs: IProductDef[]): IProduct[] {
    return defs.map((def) => {
        let badges: string[] = [];

        if (def.badges) {
            if (typeof def.badges === "string") {
                badges = [def.badges];
            } else {
                badges = def.badges.slice(0);
            }
        }

        let brand: IBrand = {
            slug: "brand",
            name: "Brand Name",
            image: "",
            country: "PAK",
        };

        if (def.brand) {
            brand = brands.find((x) => x.slug === def.brand) || brand;
        }

        const categorySlugs: string[] = def.categories || ["tools-garage"];
        const categories = categorySlugs
            .map((categorySlug) => shopCategoriesList.find((x) => x.slug === categorySlug))
            .map((x) => (x ? prepareCategory(x) : null))
            .filter((x) => x !== null) as IShopCategory[];

        const attributesDef: IProductAttributesDef = {
            // Featured attributes
            Mileage: [true, "1000km"],
            "Engine Type": [true, "Petrol"],
            Assembly: [true, "Local"],
            "Engine Displacement": [true, "1800cc"],
            Transmission: [true, "Hybrid"],
            "Body Type": [true, "Sedan"],

            // Detailed attributes
            "Registered City": ["Lahore"],
            Colors: ["Red"],
            Year: "2021",
            Province: "Punjab",
            "Last Updated": "10/02/2021",
        };
        return {
            id: `${getNextId()}`,
            name: def.name,
            excerpt: `
            Honda civic is the future.
            `,
            description: `Honda dreams of a collision-free mobile society where our customer, and everyone sharing the road, can safely and confidently enjoy the freedom of mobility. We are dedicated to identifying and implementing safety improvements through vehicle technologies, safety and education that can connect everyone sharing the road.`,
            slug: def.slug,
            sku: def.sku,
            partNumber: "BDX-750Z370-S",
            stock: "in-stock",
            price: def.price,
            compareAtPrice: def.compareAtPrice || null,
            images: def.images.slice(0),
            badges,
            rating: def.rating,
            reviews: def.reviews,
            availability: def.availability,
            compatibility: def.compatibility || "all",
            brand,
            type: attributesGroups,
            attributes: resolveProductAttributesDef({
                ...attributesDef,
                ...def.attributes,
            }),
            options: [],
            tags: ["Honda", "ISUZU", "Audi"],
            categories,
            customFields: {},
            transaction: def.transaction,
            
        };
    });
}

const productsDef: IProductDef[] = [
    {
        name: "Honda City 1.3L",
        slug: "honda-city-1.3l",
        brand: "honda",
        sku: "140-10441-B",
        price: transactionCash.flatPrice,
        images: ["https://www.honda.com.pk/wp-content/uploads/2010/09/city-1.3-720x420.jpg"],
        badges: ["new", "hot"],
        rating: 4,
        reviews: 3,
        availability: "in-stock",
        compatibility: [1, 2],
        attributes: {
            Color: "White",
        },
        transaction: transactionCash,
    },
    {
        name: "Suzuki Cultus",
        slug: "suzuki-cultus",
        sku: "140-10443-z",
        brand: "suzuki",
        price: transactionLeased.flatPrice,
        images: ["https://propakistani.pk/wp-content/uploads/2017/12/suzuki-cultus-2017-back-view.jpg"],
        badges: ["sale", "new", "hot"],
        rating: 4,
        reviews: 3,
        availability: "in-stock",
        compatibility: [1, 2],
        attributes: {
            Color: "White",
        },
        transaction: transactionLeased,
    },
    {
        name: "Toyota Land Cruiser",
        slug: "toyota-land-cruiser",
        brand: "Toyota",
        sku: "12-349jr8",
        images: ["https://s.wsj.net/public/resources/images/BN-TH470_RUMBLE_GR_20170504132712.jpg"],
        rating: 5,
        reviews: 22,
        availability: "in-stock",
        attributes: {
            Color: "Black",
        },
        price: 2000000,
        transaction: transactionCash,
    },
    {
        name: "Toyota Prado",
        slug: "toyota-prado",
        sku: "12-dhfjken9d7",
        images: ["https://www.europeanbusinessreview.com/wp-content/uploads/2021/01/20200803_01_02_s-1280x720.jpg"],
        rating: 5,
        reviews: 22,
        availability: "in-stock",
        brand: "honda",
        attributes: {
            Color: "Metallic Grey",
        },
        price: 1400000,
        transaction: transactionLeased,
    },
    {
        name: "Honda Civic",
        slug: "honda-civic2",
        sku: "12-dhd7",
        price: transactionCash.flatPrice,
        transaction: transactionCash,
        images: [
            "https://pictures.dealer.com/h/highcountryhondaglenwoodsprings/1065/49959fc31f9faf05c7e2770e167ee11cx.jpg?impolicy=downsize&w=568",
        ],
        rating: 5,
        reviews: 22,
        availability: "in-stock",
        brand: "honda",
        attributes: {
            Color: "Metallic Grey",
        },
    },
    {
        name: "Toyota Fortuner",
        slug: "toyota-fortuner",
        sku: "12-dlkmnf89hd7",
        images: ["https://static.autox.com/uploads/2020/08/toyota-fortuner-trd.jpg"],
        rating: 5,
        reviews: 22,
        availability: "in-stock",
        brand: "toyota",
        attributes: {
            Color: "Metallic Grey",
        },
        price: transactionLeased.flatPrice,
        transaction: transactionLeased,
    },
    {
        name: "Toyota Aqua",
        slug: "toyota-aqua",
        sku: "12-dme08uefhd7",
        price: 260000,
        transaction: transactionCash,
        images: [
            "https://cache3.pakwheels.com/system/car_generation_pictures/3874/original/rear_side_view.JPG?1451548518",
        ],
        rating: 5,
        reviews: 22,
        availability: "in-stock",
        brand: "toyota",
        attributes: {
            Color: "Metallic Grey",
        },
    },
    {
        name: "Honda Vezel",
        slug: "honda-vezel",
        sku: "12-dhmcve090e8d7",
        images: ["https://cache2.pakwheels.com/system/car_generation_pictures/3834/original/side_view.png?1451461491"],
        rating: 5,
        reviews: 22,
        availability: "in-stock",
        brand: "honda",
        attributes: {
            Color: "Metallic Grey",
        },
        price: 440000,
        transaction: transactionLeased,
    },
];

export const products: IProduct[] = makeProducts(productsDef);
