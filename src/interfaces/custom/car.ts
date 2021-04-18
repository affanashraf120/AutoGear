import { IComment } from "../comment";
import { IProductOption } from "../product";

export interface ICarPost {
    car: ICar;
    postedDate: Date;
    mileage: number;
    province: string;
    city: string;
    registrationCity: string;
    rating: number;
    reviews?: IComment[];
    images: string[];
    color: string;
    price: number;
    compareAtPrice: number | null;
    badges: Badge[];
    features?: Feature[];
    sellerPhone: string;
    assembly: "Local" | "Imported";
    Transaction: Transaction;
    options: IProductOption[]
}

export interface ICar {
    make: string;
    model: string;
    version: string;
    year: Date;
    transmission: Transmission;
    bodyType: BodyType;
    colors: string[];
    images: string[];
    engineCapacity: number;
    engineType: EngineType;
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

export type Badge = {
    slug: string;
    name: string;
    image: string;
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

export type Feature = {
    slug: string;
    name: string;
    image: string;
    meta?: string;
};
