// react
import React, { useEffect } from "react";
// application
import { useCurrency } from "~/store/currency/currencyHooks";
import { ICurrency } from "~/interfaces/currency";

interface Props {
    value: number;
    currency?: ICurrency;
}

function CurrencyFormat(props: Props) {
    const { value, currency: propCurrency } = props;
    const siteCurrency = useCurrency();
    const currency = propCurrency || siteCurrency;

    return (
        <React.Fragment>
            {currency.symbol}
            {(value * currency.rate).toFixed(0)}
        </React.Fragment>
    );
}

export default CurrencyFormat;
