// react
import React, { useEffect } from "react";
import { useState } from "react";
// third-party
import { FormattedMessage, useIntl } from "react-intl";
// application
import AccountLayout from "~/components/account/AccountLayout";
import AppImage from "~/components/shared/AppImage";
import AppLink from "~/components/shared/AppLink";
import PageTitle from "~/components/shared/PageTitle";
import Loader from "~/custom/components/Loader";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";

function Page() {
    const intl = useIntl();
    const { user, isUserExist } = useAuthContext();
    const history = useAppRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isUserExist()) {
            history.push(url.signIn());
        } else setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className="dashboard">
                <PageTitle>{intl.formatMessage({ id: "HEADER_DASHBOARD" })}</PageTitle>

                {user && (
                    <div className="dashboard__profile card profile-card">
                        <div className="card-body profile-card__body">
                            <div className="profile-card__avatar">
                                <AppImage src={user.avatar} />
                            </div>
                            <div className="profile-card__name">{`${user.fullName}`}</div>
                            <div className="profile-card__email">{user.email}</div>
                            <div className="profile-card__edit">
                                <AppLink href={url.accountProfile()} className="btn btn-secondary btn-sm">
                                    <FormattedMessage id="BUTTON_EDIT_PROFILE" />
                                </AppLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

Page.Layout = AccountLayout;

export default Page;
