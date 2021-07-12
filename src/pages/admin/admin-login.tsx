// react
// third-party
import classNames from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BlockSpace from "~/components/blocks/BlockSpace";
// application
import AppLink from "~/components/shared/AppLink";
import PageTitle from "~/components/shared/PageTitle";
import Redirect from "~/components/shared/Redirect";
import FormLayout from "~/custom/components/FormLayout";
import { useSignInForm } from "~/services/forms/sign-in";
import { useSignUpForm } from "~/services/forms/sign-up";
import url from "~/services/url";
import { validateEmail } from "~/services/validators";
import { useUser } from "~/store/user/userHooks";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import UserService from "~/api-services/userService/UserService";
import { toast } from "react-toastify";
import { setUserAuthToken } from "~/utils/auth";
import { useAppRouter } from "~/services/router";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import { useEffect } from "react";

const EMAIL = "autogear313@domain.pk";
const PASSWORD = "Gatsby@1973";

interface IForm {
    email: string;
    password: string;
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
});

function Page() {
    const intl = useIntl();
    const [serverError, setServerError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const history = useAppRouter();
    const { register, errors, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
    });

    const submit = (data: IForm) => {
        if (data.email === EMAIL && data.password === PASSWORD) {
            localStorage.setItem("ALLOW_ADMIN", "admin");
            toast.success("Admin Login Access");
            history.push(url.adminDashboard());
        } else {
            setServerError("Invalid email or password");
        }
    };

    useEffect(() => {
        const admin = localStorage.getItem("ALLOW_ADMIN");
        if (admin) history.push(url.adminDashboard());
    }, []);

    return (
        <React.Fragment>
            <PageTitle>{intl.formatMessage({ id: "HEADER_LOGIN" })}</PageTitle>

            <BlockSpace layout="after-header" />

            <FormLayout>
                {/*  */}
                <h3 className="card-title">
                    <FormattedMessage id="HEADER_LOGIN" />
                </h3>
                <form onSubmit={handleSubmit(submit)}>
                    {serverError && <div className="alert alert-sm alert-danger">{serverError}</div>}
                    <div className="form-group">
                        <label htmlFor="signin-email">
                            <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                        </label>
                        <input
                            id="signin-email"
                            type="email"
                            className={classNames("form-control", {
                                "is-invalid": errors.email,
                            })}
                            placeholder="user@domain.com"
                            name="email"
                            ref={register}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="signin-password">
                            <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                        </label>
                        <input
                            id="signin-password"
                            type="password"
                            className={classNames("form-control", {
                                "is-invalid": errors.password,
                            })}
                            placeholder={intl.formatMessage({ id: "INPUT_PASSWORD_PLACEHOLDER" })}
                            name="password"
                            ref={register}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                    <div className="form-group mb-0">
                        <button
                            type="submit"
                            className={classNames("btn", "btn-primary", "mt-3", {
                                "btn-loading": loading,
                            })}
                        >
                            <FormattedMessage id="BUTTON_LOGIN" />
                        </button>
                    </div>
                </form>
                {/*  */}
            </FormLayout>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
