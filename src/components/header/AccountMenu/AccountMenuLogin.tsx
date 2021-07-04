import classNames from "classnames";
import React, { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import AppLink from "~/components/shared/AppLink";
import { useSignInForm } from "~/services/forms/sign-in";
import url from "~/services/url";
import { validateEmail } from "~/services/validators";

interface Props {
    onCloseMenu: () => void;
}

const AccountMenuLogin = (props:Props) => {
    const { onCloseMenu } = props;
    const intl = useIntl();

    const signInForm = useSignInForm({
        onSuccess: useCallback(() => {
            if (onCloseMenu) {
                onCloseMenu();
            }
        }, [onCloseMenu]),
    });

    return (
        <React.Fragment>
            <form className="account-menu__form" onSubmit={signInForm.submit} >
                <div className="account-menu__form-title">
                    <FormattedMessage id="HEADER_LOGIN_TO_YOUR_ACCOUNT" />
                </div>
                {signInForm.serverError && (
                    <div className="alert alert-xs alert-danger mt-n2">
                        <FormattedMessage id={signInForm.serverError} />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="header-signin-email" className="sr-only">
                        <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                    </label>
                    <input
                        id="header-signin-email"
                        type="email"
                        className={classNames("form-control", "form-control-sm", {
                            "is-invalid": signInForm.errors.email,
                        })}
                        placeholder="customer@example.com"
                        name="email"
                        ref={signInForm.register({ required: true, validate: { email: validateEmail } })}
                    />
                    <div className="invalid-feedback">
                        {signInForm.errors.email?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                        {signInForm.errors.email?.type === "email" && (
                            <FormattedMessage id="ERROR_FORM_INCORRECT_EMAIL" />
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="header-signin-password" className="sr-only">
                        <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                    </label>
                    <div
                        className={classNames("account-menu__form-forgot", {
                            "is-invalid": signInForm.errors.password,
                        })}
                    >
                        <input
                            id="header-signin-password"
                            type="password"
                            className={classNames("form-control", "form-control-sm", {
                                "is-invalid": signInForm.errors.password,
                            })}
                            placeholder={intl.formatMessage({ id: "INPUT_PASSWORD_PLACEHOLDER" })}
                            name="password"
                            ref={signInForm.register({ required: true })}
                        />
                        <AppLink href={url.passwordRecovery()} className="account-menu__form-forgot-link">
                            <FormattedMessage id="LINK_FORGOT" />
                        </AppLink>
                    </div>
                    <div className="invalid-feedback">
                        {signInForm.errors.password?.type === "required" && (
                            <FormattedMessage id="ERROR_FORM_REQUIRED" />
                        )}
                    </div>
                </div>

                <div className="form-group account-menu__form-button">
                    <button
                        type="submit"
                        className={classNames("btn", "btn-primary", "btn-sm", {
                            "btn-loading": signInForm.submitInProgress,
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
