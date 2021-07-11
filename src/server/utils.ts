import { attributesGroups } from "~/custom-server/database/product/attributesGroups";
import { ICarProduct, IProduct, Transaction } from "~/interfaces/product";
import { IVehicle } from "~/interfaces/vehicle";
import { brands } from "~/myData/brandsData";
import { resolveProductAttributesDef } from "~/server/database/products";
import { IProductAttributesDef } from "~/server/interfaces/product-def";
import { IVehicleDef } from "./interfaces/vehicle-def";

export function makeIdGenerator() {
    let lastId = 0;

    return (() => () => {
        lastId += 1;

        return lastId;
    })();
}

export function delayResponse<T>(input: Promise<T> | (() => Promise<T>), time = 500): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(resolve, time);
    }).then(() => (input instanceof Promise ? input : input()));
}

export function error<T>(message: string): Promise<T> {
    return Promise.reject<T>(new Error(message));
}

export function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

export function nameToSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/, "-")
        .replace(/-+/, "-");
}

export function makeApiFetchCarToProduct(carProduct: ICarProduct, _id: string): IProduct {
    const {
        make,
        model,
        version,
        year,
        excerpt,
        description,

        price,
        transactionType,
        terms,
        interval,

        mileage,
        engineType,
        engineDisplacement,
        transmission,

        assembly,
        bodyType,
        color,
        images,

        registeredCity,
        province,

        rating,
        reviews,
        sellerId,
        badges,
        isFeatured,
        isApproved,
        isAutoGear,
        customFields,
        postedDate,
    } = carProduct;

    const attributesDef: IProductAttributesDef = {
        // Featured attributes
        Mileage: [true, `${mileage}Km`],
        "Engine Type": [true, `${engineType}`],
        Assembly: [true, `${assembly}`],
        "Engine Displacement": [true, `${engineDisplacement}cc`],
        Transmission: [true, `${transmission}`],
        "Body Type": [true, `${bodyType}`],

        // Detailed attributes
        "Registered City": [`${registeredCity}`],
        Colors: [`${color}`],
        Year: `${year}`,
        Province: `${province}`,
        "Last Updated": `${postedDate}`,
    };
    let transaction: Transaction;
    if (transactionType === "Cash") {
        transaction = {
            transactionType: "Cash",
            flatPrice: price,
        };
    } else {
        transaction = {
            transactionType: "Leased",
            flatPrice: price,
            leased: {
                leasedAmount: price,
                terms: terms ? terms : 0,
                timeInterval: interval ? interval : "month",
            },
        };
    }
    const product: IProduct = {
        id: _id,
        name: `${make} ${model}`,
        version,
        sellerId,
        excerpt,
        description,
        slug: `${nameToSlug(`${make} ${model}-${_id}`)}`,
        price,
        compareAtPrice: null,
        images,
        brand: brands.find((brand) => brand.name === make.toUpperCase()),
        type: attributesGroups,
        attributes: resolveProductAttributesDef({
            ...attributesDef,
        }),
        tags: [`${make}`, `${make} ${model}`],
        rating,
        options: [],
        transaction,
        partNumber: "",
        stock: "in-stock",
        compatibility: "unknown",
    };

    return product;
}

const getNextId = makeIdGenerator();

export function makeVehicles(defs: IVehicleDef[]): IVehicle[] {
    return defs
        .map((def) => {
            const range = typeof def.year === "number" ? [def.year, def.year] : def.year;
            const years = [];

            for (let i = range[0]; i <= range[1]; i += 1) {
                years.push(i);
            }

            return years.map((year) => ({
                id: getNextId(),
                year,
                make: def.make,
                model: def.model,
                engine: def.engine,
            }));
        })
        .reduce((acc, v) => [...acc, ...v], []);
}
