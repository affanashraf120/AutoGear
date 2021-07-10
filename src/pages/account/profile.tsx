// react
import React, { useEffect, useState } from "react";
// third-party
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
// application
import AccountLayout from "~/components/account/AccountLayout";
import PageTitle from "~/components/shared/PageTitle";
import { useAsyncAction } from "~/store/hooks";
import { useUser, useUserEditProfile } from "~/store/user/userHooks";
import { validateEmail } from "~/services/validators";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";
import Loader from "~/custom/components/Loader";

interface IForm {
    firstName: string;
    lastName: string;
    // email: string;
    phone: string;
}

function Page() {
    const intl = useIntl();
    const userEditProfile = useUserEditProfile();
    const { user, isUserExist } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const history = useAppRouter();

    const { register, handleSubmit, reset, errors } = useForm<IForm>({
        defaultValues: {
            firstName: "",
            lastName: "",
            // email: "",
            phone: "",
        },
    });

    const [submit, submitInProgress] = useAsyncAction(
        async (data: IForm) => {
            if (user && user.email) await userEditProfile({ ...data, email: user?.email });

            toast.success(intl.formatMessage({ id: "TEXT_TOAST_PROFILE_SAVED" }));
        },
        [userEditProfile, intl]
    );

    // useEffect(() => {
    //     reset({
    //         firstName: user?.firstName || "",
    //         lastName: user?.lastName || "",
    //         // email: user?.email || "",
    //         phone: user?.phone || "",
    //     });
    // }, [user, reset]);

    useEffect(() => {
        if (!isUserExist()) {
            history.push(url.signIn());
        } else setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className="card">
            <PageTitle>{intl.formatMessage({ id: "HEADER_EDIT_PROFILE" })}</PageTitle>

            <div className="card-header">
                <h5>
                    <FormattedMessage id="HEADER_EDIT_PROFILE" />
                </h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                        <form onSubmit={handleSubmit(submit)}>
                            <div className="form-group">
                                <label htmlFor="profile-first-name">
                                    <FormattedMessage id="INPUT_FIRST_NAME_LABEL" />
                                </label>
                                <input
                                    type="text"
                                    id="profile-first-name"
                                    name="firstName"
                                    className={classNames("form-control", {
                                        "is-invalid": errors.firstName,
                                    })}
                                    placeholder={intl.formatMessage({ id: "INPUT_FIRST_NAME_PLACEHOLDER" })}
                                    ref={register({ required: true })}
                                />
                                <div className="invalid-feedback">
                                    {errors.firstName?.type === "required" && (
                                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-last-name">
                                    <FormattedMessage id="INPUT_LAST_NAME_LABEL" />
                                </label>
                                <input
                                    type="text"
                                    id="profile-last-name"
                                    name="lastName"
                                    className={classNames("form-control", {
                                        "is-invalid": errors.lastName,
                                    })}
                                    placeholder={intl.formatMessage({ id: "INPUT_LAST_NAME_PLACEHOLDER" })}
                                    ref={register({ required: true })}
                                />
                                <div className="invalid-feedback">
                                    {errors.lastName?.type === "required" && (
                                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-phone">
                                    <FormattedMessage id="INPUT_PHONE_NUMBER_LABEL" />
                                </label>
                                <input
                                    type="text"
                                    id="profile-phone"
                                    name="phone"
                                    className={classNames("form-control", {
                                        "is-invalid": errors.phone,
                                    })}
                                    placeholder={intl.formatMessage({ id: "INPUT_PHONE_NUMBER_PLACEHOLDER" })}
                                    ref={register({ required: true })}
                                />
                                <div className="invalid-feedback">
                                    {errors.phone?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <button
                                    type="submit"
                                    className={classNames("btn", "btn-primary", "mt-3", {
                                        "btn-loading": submitInProgress,
                                    })}
                                >
                                    <FormattedMessage id="BUTTON_SAVE" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;
