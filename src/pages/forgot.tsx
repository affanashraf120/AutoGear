// react
// third-party
import classNames from "classnames";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import EmailVerification from "~/custom/components/EmailVerification/EmailVerification";
import PageTitle from "~/components/shared/PageTitle";
import { useAppRouter } from "~/services/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLayout from "~/custom/components/FormLayout";
import BlockSpace from "~/components/blocks/BlockSpace";
import UserService from "~/api-services/userService/UserService";
import { toast } from "react-toastify";
import url from "~/services/url";

interface IForm {
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().required("Email required").email("Email must be valid"),
    password: yup
        .string()
        .required("Password required")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            `Use atleast 8 characters.
    Use both upper and lowercase characters.
    Include atleast one number and symbol(# $ ! % & etc..)`
        ),
    confirmPassword: yup
        .string()
        .required("Confirm password required")
        .oneOf([yup.ref("password"), null], "Passwords does not match"),
});

function Page() {
    const intl = useIntl();
    const [serverError, setServerError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const methods = useForm<IForm>({
        resolver: yupResolver(schema),
    });
    const { register, errors, watch, handleSubmit, trigger } = methods;
    const history = useAppRouter();
    const [verified, setVerified] = useState<boolean>(false);

    const submit = (data: IForm) => {
        if (verified) {
            setLoading(true);
            const { confirmPassword, ...rest } = data;
            //API CALL
            UserService.forgot(rest)
                .then((responseData) => {
                    setLoading(false);
                    console.log(responseData);
                    toast.success("Password changed successfully.");
                    history.push(url.signIn());
                })
                .catch((err) => {
                    console.log(err.response);
                    toast.error("Password not changed. Server error");
                    setLoading(false);
                });
        } else {
            setServerError(true);
        }
    };

    const handleVerification = (value: boolean) => {
        setVerified(value);
        setServerError(false);
    };

    return (
        <>
            <PageTitle>{intl.formatMessage({ id: "HEADER_CHANGE_PASSWORD" })}</PageTitle>

            <BlockSpace layout="after-header" />
            <FormLayout>
                <h3 className="card-title">
                    <FormattedMessage id="HEADER_CHANGE_PASSWORD" />
                </h3>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(submit)} className="col-12">
                        {serverError && <div className="alert alert-sm alert-danger">Email not verified</div>}

                        <EmailVerification verified={verified} setVerified={handleVerification} />
                        <div className="form-group">
                            <label htmlFor="signup-password">
                                <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                className={classNames("form-control", {
                                    "is-invalid": errors?.password,
                                })}
                                placeholder="Password"
                                name="password"
                                ref={register}
                            />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="signup-confirm">
                                <FormattedMessage id="INPUT_PASSWORD_REPEAT_LABEL" />
                            </label>
                            <input
                                id="signup-confirm"
                                type="password"
                                className={classNames("form-control", {
                                    "is-invalid": errors.confirmPassword,
                                })}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                ref={register}
                            />
                            <div className="invalid-feedback">{errors?.confirmPassword?.message}</div>
                        </div>

                        <div className="form-group mb-0">
                            <button
                                type="submit"
                                className={classNames("btn", "btn-primary", "mt-3", {
                                    "btn-loading": loading,
                                })}
                            >
                                <FormattedMessage id="BUTTON_CHANGE" />
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </FormLayout>
            <BlockSpace layout="before-footer" />
        </>
    );
}

export default Page;
