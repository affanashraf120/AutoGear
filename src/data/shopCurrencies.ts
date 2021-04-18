// application
import { ICurrency } from "~/interfaces/currency";

const dataShopCurrencies: ICurrency[] = [
    {
        code: "PKR",
        symbol: "₨",
        name: "Rupee",
        rate: 1,
    },
    {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
        rate: 0.0055,
    },
    {
        code: 'GBP',
        symbol: '£',
        name: 'Pound Sterling',
        rate: 0.0048,
    },
    {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        rate: 0.0065,
    },
    {
        code: 'RUB',
        symbol: '₽',
        name: 'Russian Ruble',
        rate: 0.50,
    },
];

const dataShopDefaultCurrencyCode = "PKR";

export const dataShopDefaultCurrency: ICurrency = dataShopCurrencies.find(
    (x) => x.code === dataShopDefaultCurrencyCode
)!;

export default dataShopCurrencies;
