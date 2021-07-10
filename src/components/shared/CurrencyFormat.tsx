// react
import React, { useEffect } from "react";
// application
import { useCurrency } from "~/store/currency/currencyHooks";
import { ICurrency } from "~/interfaces/currency";
import { useIntl } from "react-intl";

interface Props {
    value: number;
    currency?: ICurrency;
}

function CurrencyFormat(props: Props) {
    const { value, currency: propCurrency } = props;
    const siteCurrency = useCurrency();
    const currency = propCurrency || siteCurrency;
    const formatter = new Intl.NumberFormat(currency.code, {
        style: "currency",
        currency: currency.code,
        minimumFractionDigits: 0,
    });
    const currencyString = formatter.format(value * currency.rate);

    return (
        <React.Fragment>
            {currency.code === "PKR" || currency.code === "RUB" ? currencyString.substring(4) : currencyString.substring(1)}
            {" "}
            {currency.symbol}
        </React.Fragment>
    );
}

export default CurrencyFormat;
