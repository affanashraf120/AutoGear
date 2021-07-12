import { RunTransaction } from "@react-firebase/database/dist/components/FirebaseDatabaseTransaction";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { Label } from "reactstrap";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";
import Loader from "../../custom/components/Loader";

type BidForm = {
    bid_amount: number;
};
type Props = {
    runTransaction: RunTransaction;
    previous_bid: number;
};

const AuctionBidForm = (props: Props) => {
    const { runTransaction, previous_bid } = props;
    const { handleSubmit, errors, register } = useForm<BidForm>();
    const [loading, setLoading] = useState(false);
    const { handleChange, invalidNumberInput } = useInputNumberValidation({
        allowLeadingZero: false,
        limit: 1000000000,
    });

    const [previousBid, setPreviousBid] = useState<number>(previous_bid);
    const [value, setValue] = useState<number>();

    useEffect(() => {
        runTransaction({
            reducer: (val) => {
                setPreviousBid(val);
            },
        });
    }, []);

    const submitHandler = (data: BidForm) => {
        const { bid_amount } = data;
        setLoading(true);
        runTransaction({
            reducer: (val) => {
                if (bid_amount > parseInt(val)) return bid_amount;
                throw { message: `Bidding amount must be higher than ${val}` };
            },
        })
            .then((res) => {
                setPreviousBid(bid_amount);
                setLoading(false);
                toast.success("Bid placed successfully");
            })
            .catch((err) => {
                setLoading(false);
                err.message && toast.error(err.message);
            });
    };
    return (
        <div className="product__actions" style={{ backgroundColor: "black", padding: "1rem" }}>
            <form className="col-12 col-lg-12 col-xl-12" onSubmit={handleSubmit(submitHandler)}>
                <div className="form-group">
                    <label style={{ color: "white", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                        Bid must be higher then{" "}
                    </label>
                    <div style={{ color: "red", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                        <CurrencyFormat value={previousBid} />
                    </div>{" "}
                    {loading ? (
                        <Loader />
                    ) : (
                        <input
                            type="number"
                            id={`bid_amount`}
                            name={`bid_amount`}
                            className={classNames("form-control", {
                                "is-invalid": errors?.bid_amount,
                            })}
                            placeholder={`Enter bid amount`}
                            ref={register({ required: true })}
                            onKeyPress={(e) => {
                                invalidNumberInput(e.key) && e.preventDefault();
                            }}
                            min={1}
                            value={value}
                            onChange={handleChange((e) => {
                                setValue(parseInt(e.target.value));
                            })}
                        />
                    )}
                    <div className="invalid-feedback">
                        {errors?.bid_amount?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className={classNames("btn", "btn-primary", "mt-3", {
                                "btn-loading": loading,
                            })}
                        >
                            Bid
                        </button>
                    </div>
                </div>
            </form>
            <div className="col-12 col-xs-6 col-sm-6 col-lg-12 col-xl-12">
                <Label style={{ color: "white" }}>Steps</Label>
                <div className="form-group">
                    <button
                        className={classNames("btn", "btn-primary", "mt-3")}
                        style={{ margin: "5px", backgroundColor: "grey" }}
                        onClick={() => {
                            setValue((prev) => prev && prev + 10000);
                        }}
                    >{`10,000`}</button>
                    <button
                        className={classNames("btn", "btn-primary", "mt-3")}
                        style={{ margin: "5px", backgroundColor: "grey" }}
                        onClick={() => {
                            setValue((prev) => prev && prev + 30000);
                        }}
                    >{`30,000`}</button>
                </div>
                <div className="form-group">
                    <button
                        className={classNames("btn", "btn-primary", "mt-3")}
                        style={{ margin: "5px", backgroundColor: "grey" }}
                        onClick={() => {
                            setValue((prev) => prev && prev + 50000);
                        }}
                    >{`50,000`}</button>
                    <button
                        className={classNames("btn", "btn-primary", "mt-3")}
                        style={{ margin: "5px", backgroundColor: "grey" }}
                        onClick={() => {
                            setValue((prev) => prev && prev + 100000);
                        }}
                    >{`100,000`}</button>
                </div>
                <div className="form-group">
                    <button
                        className={classNames("btn", "btn-primary", "mt-3")}
                        style={{ margin: "5px", backgroundColor: "grey" }}
                        onClick={() => {
                            setValue((prev) => prev && prev + 1000000);
                        }}
                    >{`1,000,000`}</button>
                    <button
                        className={classNames("btn", "btn-primary", "mt-3")}
                        style={{ margin: "5px", backgroundColor: "grey" }}
                        onClick={() => {
                            setValue((prev) => prev && prev + 2000000);
                        }}
                    >{`2,000,000`}</button>
                </div>
            </div>
        </div>
    );
};

export default AuctionBidForm;
