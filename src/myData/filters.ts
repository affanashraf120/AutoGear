import { IFilter } from "~/interfaces/filter";

export const carFilters: IFilter[] = [
    {
        slug: "price",
        name: "Price range",
        type: "range",
        min: 2000000,
        max: 10000000,
        value: [1, 2000000],
    },
    {
        name: "Rating",
        slug: "rating",
        type: "rating",
        value: [],
        items: [
            {
                rating: 1,
                count: 2,
            },
            {
                rating: 2,
                count: 2,
            },
            {
                rating: 3,
                count: 2,
            },
            {
                rating: 4,
                count: 2,
            },
            {
                rating: 5,
                count: 2,
            },
        ],
    },
    {
        name: "Body Type",
        slug: "body-type",
        type: "check",
        items: [
            {
                slug: "sedan",
                name: "Sedan",
                count: 23,
            },
            {
                slug: "compact-sedan",
                name: "Compact Sedan",
                count: 23,
            },
            {
                slug: "hatchback",
                name: "Hatchback",
                count: 23,
            },
            {
                slug: "suv",
                name: "SUV",
                count: 23,
            },
            {
                slug: "compact-suv",
                name: "Compact SUV",
                count: 23,
            },
            {
                slug: "crossover",
                name: "Crossover",
                count: 23,
            },
            {
                slug: "coupe",
                name: "Coupe",
                count: 23,
            },
            {
                slug: "convertible",
                name: "Convertible",
                count: 23,
            },
            {
                slug: "mini-vehicle",
                name: "Mini Vehicle",
                count: 23,
            },
        ],
        value: [],
    },
    {
        name: "Makes",
        slug: "makes",
        type: "check",
        items: [
            {
                slug: "honda",
                name: "Honda",
                count: 12,
            },
            {
                slug: "toyota",
                name: "Toyota",
                count: 12,
            },
            {
                slug: "suzuki",
                name: "Suzuki",
                count: 12,
            },
            {
                slug: "bmw",
                name: "BMW",
                count: 12,
            },
            {
                slug: "kia",
                name: "KIA",
                count: 12,
            },
        ],
        value: [],
    },
    
];
