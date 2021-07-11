import classNames from "classnames";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";

type Props = {
    disabled: boolean;
    error: boolean;
};

const TransactionFormGroup = (props: Props) => {
    const { disabled, error } = props;
    const { register, errors } = useFormContext();
    const [transactionType, setTransactionType] = useState<string>("Cash");
    const priceValidation = useInputNumberValidation({
        allowLeadingZero: false,
        limit: 100000000,
    });
    const termsValidation = useInputNumberValidation({
        allowLeadingZero: false,
        limit: 70,
    });

    const isCash = (): boolean => {
        return transactionType === "Cash";
    };

    return (
        <>
            <div className="form-group">
                <label>Transaction Type</label>
                <select
                    id={`transactionType`}
                    name={`transactionType`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.transactionType,
                    })}
                    placeholder={`Enter transactionType`}
                    ref={register({ required: true })}
                    onChange={(e) => {
                        setTransactionType(e.target.value);
                    }}
                >
                    <option value="Cash">Cash</option>
                    <option value="Leased">Leased</option>
                </select>
                <div className="invalid-feedback">
                    {errors?.transactionType?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>{transactionType === "Cash" ? "Price" : "Leased Amount"}</label>
                <input
                    type="number"
                    id={`price`}
                    name={`price`}
                    min={1}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.price,
                    })}
                    placeholder={`Enter ${transactionType === "Cash" ? "Price" : "Leased Amount"}`}
                    ref={register({ required: true })}
                    onKeyPress={(e) => {
                        priceValidation.invalidNumberInput(e.key) && e.preventDefault();
                    }}
                    onChange={priceValidation.handleChange()}
                />
                <div className="invalid-feedback">
                    {errors?.price?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Interval</label>
                <select
                    id={`interval`}
                    name={`interval`}
                    ref={register}
                    disabled={transactionType === "Cash"}
                    className={classNames("form-control", {
                        "is-invalid": !isCash() && error,
                    })}
                    placeholder={`Enter interval`}
                >
                    <option value={undefined}>none</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="4 Months">4 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="Year">Year</option>
                </select>
                <div className="invalid-feedback">
                    {!isCash() && error ? "Interval and terms both are required" : ""}
                </div>
            </div>

            <div className="form-group">
                <label>Terms</label>
                <input
                    type="number"
                    id={`terms`}
                    name={`terms`}
                    ref={register}
                    disabled={transactionType === "Cash"}
                    onKeyPress={(e) => {
                        termsValidation.invalidNumberInput(e.key) && e.preventDefault();
                    }}
                    onChange={termsValidation.handleChange()}
                    className={classNames("form-control", {
                        "is-invalid": !isCash() && error,
                    })}
                    placeholder={`Total terms`}
                />
                <div className="invalid-feedback">
                    {!isCash() && error ? "Interval and terms both are required" : ""}
                </div>
            </div>
        </>
    );
};

export default TransactionFormGroup;
