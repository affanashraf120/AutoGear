// application
import { IBrand } from "./brand";
import { ICustomFields } from "./custom-fields";
import { IFilterableList, IPaginatedList } from "./list";
import { IShopCategory } from "./category";
import { IUser } from "./user";
import { IComment } from "./comment";

export interface IBaseAttributeGroup {
    name: string;
    slug: string;
    customFields?: ICustomFields;
}

export type IProductAttributeGroup = IBaseAttributeGroup & { attributes: IProductAttribute[] };
export type IProductTypeAttributeGroup = IBaseAttributeGroup & { attributes: string[] };

export interface IProductType {
    name: string;
    slug: string;
    attributeGroups: IProductTypeAttributeGroup[];
    customFields?: ICustomFields;
}

export interface IProductAttributeValue {
    name: string;
    slug: string;
    customFields?: ICustomFields;
}

export interface IProductAttribute {
    name: string;
    slug: string;
    featured: boolean;
    values: IProductAttributeValue[];
    customFields?: ICustomFields;
}

export interface IProductOptionValueBase {
    name: string;
    slug: string;
    customFields?: ICustomFields;
}

export interface IProductOptionValueColor extends IProductOptionValueBase {
    color: string;
}

export interface IProductOptionBase {
    type: string;
    name: string;
    slug: string;
    values: IProductOptionValueBase[];
    customFields?: ICustomFields;
}

export interface IProductOptionDefault extends IProductOptionBase {
    type: "default";
}

export interface IProductOptionColor extends IProductOptionBase {
    type: "color";
    values: IProductOptionValueColor[];
}

export type IProductOption = IProductOptionDefault | IProductOptionColor;

export type IProductStock = "in-stock" | "out-of-stock" | "on-backorder";

export type IProductCompatibilityResult = "all" | "fit" | "not-fit" | "unknown";

export interface IProduct {
    id: number;
    name: string;
    /**
     * A short product description without HTML tags.
     */
    excerpt: string;
    description: string;
    slug: string;
    sku?: string;
    partNumber: string; //
    stock: IProductStock; //
    price: number;
    compareAtPrice: number | null;
    images?: string[];
    badges?: string[];
    rating?: number;
    reviews?: number;
    availability?: string;
    /**
     * 'all'     - Compatible with all vehicles.
     * 'unknown' - No compatibility information. Part may not fit the specified vehicle.
     * number[]  - An array of vehicle identifiers with which this part is compatible.
     */
    compatibility: "all" | "unknown" | number[]; //
    brand?: IBrand | null;
    tags?: string[];
    type: IProductType;//
    categories?: IShopCategory[]; //
    attributes: IProductAttribute[];//
    options: IProductOption[]; //
    customFields?: ICustomFields;
}

// Add-ons

export interface ICar {
    model: string;
    version?: string;
    year: Date;
    mileage: number;
    assembly: "Local" | "Imported";
    transmission: Transmission;
    bodyType: BodyType;
    colors: string[];
    engineCapacity: number;
    engine: EngineType;
    transaction: Transaction;
    user: IUser;
    postedDate: Date;
    province: string;
    city: string;
    registrationCity: string;
}

type TransactionType = "Leased" | "Cash";

type LeasedTransaction = {
    timeInterval: "month" | "year";
    terms: number;
    leasedAmount: number;
};

export interface Transaction {
    transactionType: TransactionType;
    flatPrice: number;
    leased?: LeasedTransaction;
}

export type EngineType = {
    slug: string;
    name: string;
};

export type Transmission = {
    slug: string;
    name: string;
};

export type BodyType = {
    slug: string;
    name: string;
    image: string;
};


export type IProductsList = IPaginatedList<IProduct> & IFilterableList<IProduct>;
