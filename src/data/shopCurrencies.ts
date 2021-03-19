// application
import { ICurrency } from "~/interfaces/currency";

const dataShopCurrencies: ICurrency[] = [
    {
        code: "PKR",
        symbol: "₨",
        name: "Rupee",
        rate: 155,
    },
    {
        code: "USD",
        symbol: "$",
        name: "US Dollar",
        rate: 1,
    },
];

const dataShopDefaultCurrencyCode = "USD";

export const dataShopDefaultCurrency: ICurrency = dataShopCurrencies.find(
    (x) => x.code === dataShopDefaultCurrencyCode
)!;

export default dataShopCurrencies;
