import { IProductType } from "~/interfaces/product";

export const attributesGroups: IProductType = {
    slug: "default",
    name: "Default",
    attributeGroups: [
        {
            name: "Engine",
            slug: "engine",
            attributes: ["engine-type", "engine-displacement"],
        },
        {
            name: "Transmission",
            slug: "transmission",
            attributes: ["transmission"],
        },
        {
            name: "Mileage",
            slug: "mileage",
            attributes: ["mileage"],
        },
        {
            name: "Body",
            slug: "body",
            attributes: ["colors", "body-type", "assembly"],
        },
        {
            name: "Region",
            slug: "region",
            attributes: ["registered-city", "province"],
        },
        {
            name: "Date",
            slug: "date",
            attributes: ["year", "last-updated"],
        },
    ],
    // slug: "default",
    // name: "Default",
    // attributeGroups: [
    //     {
    //         name: "Engine",
    //         slug: "engine",
    //         attributes: [
    //             "speed",
    //             "power-source",
    //             "battery-cell-type",
    //             "voltage",
    //             "battery-capacity",
    //             "material",
    //             "engine-type",
    //         ],
    //     },
    //     {
    //         name: "Dimensions",
    //         slug: "dimensions",
    //         attributes: ["length", "width", "height"],
    //     },
    // ],
};
