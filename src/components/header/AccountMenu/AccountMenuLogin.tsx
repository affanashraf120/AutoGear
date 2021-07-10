import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import AppLink from "~/components/shared/AppLink";
import { useSignInForm } from "~/services/forms/sign-in";
import url from "~/services/url";
import { validateEmail } from "~/services/validators";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UserService from "~/api-services/userService/UserService";
import { setUserAuthToken } from "~/utils/auth";
import { toast } from "react-toastify";
import { useAppRouter } from "~/services/router";
import { useAuthContext } from "~/custom/hooks/useAuthContext";

interface Props {
    onCloseMenu: () => void;
}

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

const AccountMenuLogin = (props: Props) => {
    const intl = useIntl();
    const { onCloseMenu } = props;
    const [serverError, setServerError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const history = useAppRouter();
    const { register, errors, handleSubmit } = useForm<IForm>({
        resolver: yupResolver(schema),
    });
    const { setAuthorizedUser } = useAuthContext();
    const submit = (data: IForm) => {
        console.log(data);
        setLoading(true);
        UserService.login(data)
            .then((responseData) => {
                setLoading(false);
                setServerError(undefined);
                console.log(responseData);
                toast.success("User logged in successfully");
                setAuthorizedUser(responseData.data.token)
                onCloseMenu();
            })
            .catch((err) => {
                setLoading(false);
                const {
                    data: { message },
                } = err.response;
                console.log(message);
                message && setServerError(message);
                toast.error(message || "Sever error");
            });
    };

    return (
        <React.Fragment>
            <form className="account-menu__form" onSubmit={handleSubmit(submit)}>
                <div className="account-menu__form-title">
                    <FormattedMessage id="HEADER_LOGIN_TO_YOUR_ACCOUNT" />
                </div>
                {serverError && <div className="alert alert-xs alert-danger mt-n2">{serverError}</div>}

                <div className="form-group">
                    <label htmlFor="header-signin-email" className="sr-only">
                        <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                    </label>
                    <input
                        id="header-signin-email"
                        type="email"
                        className={classNames("form-control", "form-control-sm", {
                            "is-invalid": errors?.email,
                        })}
                        placeholder="user@domain.com"
                        name="email"
                        ref={register({ required: true, validate: { email: validateEmail } })}
                    />
                    <div className="invalid-feedback">
                        {errors.email?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                        {errors.email?.type === "email" && <FormattedMessage id="ERROR_FORM_INCORRECT_EMAIL" />}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="header-signin-password" className="sr-only">
                        <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                    </label>
                    <div
                        className={classNames("account-menu__form-forgot", {
                            "is-invalid": errors.password,
                        })}
                    >
                        <input
                            id="header-signin-password"
                            type="password"
                            className={classNames("form-control", "form-control-sm", {
                                "is-invalid": errors.password,
                            })}
                            placeholder="password"
                            name="password"
                            ref={register({ required: true })}
                        />
                        <AppLink href={url.passwordRecovery()} className="account-menu__form-forgot-link">
                            <FormattedMessage id="LINK_FORGOT" />
                        </AppLink>
                    </div>
                    <div className="invalid-feedback">
                        {errors.password?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                    </div>
                </div>

                <div className="form-group account-menu__form-button">
                    <button
                        type="submit"
                        className={classNames("btn", "btn-primary", "btn-sm", {
                            "btn-loading": loading,
                        })}
                    >
                        <FormattedMessage id="BUTTON_LOGIN" />
                    </button>
                </div>

                <div className="account-menu__form-link">
                    <AppLink href={url.signUp()} onClick={onCloseMenu}>
                        <FormattedMessage id="LINK_CREATE_ACCOUNT" />
                    </AppLink>
                </div>
            </form>
        </React.Fragment>
    );
};

export default AccountMenuLogin;
