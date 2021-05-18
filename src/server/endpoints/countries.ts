/* eslint-disable import/prefer-default-export */

// application
import { clone } from "~/server/utils";
import { ICountry } from "~/interfaces/country";

const countries: ICountry[] = [
    { code: "PAK", name: "Pakistan" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "CH", name: "China" },
    { code: "IT", name: "Italy" },
    { code: "RU", name: "Russia" },
    { code: "JAP", name: "Japan" },
    { code: "US", name: "United States" },
];

export function getCountries(): Promise<ICountry[]> {
    return Promise.resolve(clone(countries));
}
