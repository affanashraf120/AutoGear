import { IProductAttributesDef } from "~/server/interfaces/product-def";

export const attributesSet: IProductAttributesDef = {
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
