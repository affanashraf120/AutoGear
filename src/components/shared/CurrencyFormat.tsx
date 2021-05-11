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

    return (
        <React.Fragment>
            {formatter.format(value * currency.rate)}
            {/* {currency.symbol}
            {(value * currency.rate).toFixed(0)} */}
        </React.Fragment>
    );
}

export default CurrencyFormat;
