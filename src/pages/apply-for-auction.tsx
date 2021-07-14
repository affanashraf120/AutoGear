import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Cards, { Focused, ReactCreditCardProps } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import BlockSpace from "~/components/blocks/BlockSpace";
import AppLink from "~/components/shared/AppLink";
import PageTitle from "~/components/shared/PageTitle";
import FormLayout from "~/custom/components/FormLayout";
import Loader from "~/custom/components/Loader";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";
import MaskInput from "react-maskinput";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";
import UserAuthService from "~/api-services/userService/UserAuthService";
import { toast } from "react-toastify";

type CreditCard = {
    name: string;
    number: number;
    cvc: number;
    expiry: string;
};

const Page = () => {
    const { getAuthorizedUser, setAuthorizedUser } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const history = useAppRouter();
    const [cvc, setCvc] = useState("");
    const [expiry, setExpiry] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [focus, setFocus] = useState<Focused | undefined>("number");
    const { register, errors, handleSubmit } = useForm<CreditCard>();
    const numberValidation = useInputNumberValidation({
        maxLength: 16,
    });
    const expiryValidation = useInputNumberValidation({
        maxLength: 4,
    });
    const cvcValidation = useInputNumberValidation({
        allowLeadingZero: true,
        maxLength: 3,
    });

    useEffect(() => {
        if (!getAuthorizedUser()) history.push(url.signIn());
        else setLoading(false);
    }, []);

    const submit = (data: CreditCard) => {
        console.log(data);
        const user = getAuthorizedUser();
        user &&
            UserAuthService.addPaymentMethod({ ...data, userId: user._id })
                .then((responseData) => {
                    console.log(responseData.data);
                    setAuthorizedUser(responseData.data);
                    toast.success("Payment method verified");
                    history.push(url.auction());
                })
                .catch((error) => {
                    console.log(error.response);
                    toast.error("Payment method not verified");
                });
    };

    return loading ? (
        <Loader />
    ) : (
        <React.Fragment>
            <PageTitle>Apply for auction</PageTitle>
            <BlockSpace layout="after-header" />

            <FormLayout>
                <h3 className="card-title">Add Payment Method For Auction</h3>
                <div className="form-group">
                    <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={number} />
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group">
                        <label>Number</label>
                        <input
                            type="number"
                            className={classNames("form-control", {
                                "is-invalid": errors.number,
                            })}
                            onInput={() => {
                                setFocus("number");
                            }}
                            value={number}
                            onKeyPress={(e) => {
                                numberValidation.invalidNumberInput(e.key) && e.preventDefault();
                            }}
                            onChange={numberValidation.handleChange((e) => {
                                e.target.value.length <= 16 && setNumber(e.target.value);
                            })}
                            placeholder="4242 4242 4242 4242"
                            name="number"
                            ref={register}
                        />
                        <div className="invalid-feedback">{errors.number?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className={classNames("form-control", {
                                "is-invalid": errors.name,
                            })}
                            value={name}
                            onInput={() => {
                                setFocus("name");
                            }}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Affan Ashraf"
                            name="name"
                            ref={register}
                        />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Expiry</label>
                        <input
                            type="number"
                            className={classNames("form-control", {
                                "is-invalid": errors.expiry,
                            })}
                            onInput={() => {
                                setFocus("expiry");
                            }}
                            onKeyPress={(e) => {
                                expiryValidation.invalidNumberInput(e.key) && e.preventDefault();
                            }}
                            onChange={expiryValidation.handleChange((e) => {
                                e.target.value.length <= 4 && setExpiry(e.target.value);
                            })}
                            value={expiry}
                            placeholder="12 / 21"
                            name="expiry"
                            ref={register}
                        />
                        <div className="invalid-feedback">{errors.expiry?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>CVC</label>
                        <input
                            type="number"
                            className={classNames("form-control", {
                                "is-invalid": errors.cvc,
                            })}
                            onInput={() => {
                                setFocus("cvc");
                            }}
                            onKeyPress={(e) => {
                                cvcValidation.invalidNumberInput(e.key) && e.preventDefault();
                            }}
                            onChange={cvcValidation.handleChange((e) => {
                                e.target.value.length <= 3 && setCvc(e.target.value);
                            })}
                            value={cvc}
                            placeholder="456"
                            name="cvc"
                            ref={register}
                        />
                        <div className="invalid-feedback">{errors.cvc?.message}</div>
                    </div>

                    <div className="form-group mb-0">
                        <button
                            type="submit"
                            className={classNames("btn", "btn-primary", "mt-3", {
                                "btn-loading": loading,
                            })}
                        >
                            Save Details
                        </button>
                    </div>
                </form>
            </FormLayout>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
};

export default Page;
