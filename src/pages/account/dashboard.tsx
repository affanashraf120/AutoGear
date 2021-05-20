// react
import React, { useEffect, useState } from "react";
// third-party
import { FormattedMessage, useIntl } from "react-intl";
// application
import AccountLayout from "~/components/account/AccountLayout";
import AddressCard from "~/components/shared/AddressCard";
import AppImage from "~/components/shared/AppImage";
import AppLink from "~/components/shared/AppLink";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import PageTitle from "~/components/shared/PageTitle";
import url from "~/services/url";
import { accountApi } from "~/api";
import { IAddress } from "~/interfaces/address";
import { IOrder } from "~/interfaces/order";
import { useUser } from "~/store/user/userHooks";
import { useDispatch } from "react-redux";
import { userSetCurrent } from "~/store/user/userAction";

function Page() {
    const intl = useIntl();
    const user = useUser();
    const dispatch = useDispatch();
    const [address, setAddress] = useState<IAddress | null>(null);

    const isAuth = () => {
        const user = localStorage.getItem("userEmail");
        if (user) {
            return true;
        } else return false;
    };

    useEffect(() => {
        console.log(user);
        if (user) {
            accountApi.getDefaultAddress().then(setAddress);
        } else {
            setAddress(null);
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard">
            <PageTitle>{intl.formatMessage({ id: "HEADER_DASHBOARD" })}</PageTitle>

            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">
                        <AppImage src={user.avatar} />
                    </div>
                    <div className="profile-card__name">
                        {`${user.firstName ? user.firstName : ``} ${user.lastName ? user.lastName : ``}`}
                    </div>
                    <div className="profile-card__email">{user.email}</div>
                    <div className="profile-card__edit">
                        <AppLink href={url.accountProfile()} className="btn btn-secondary btn-sm">
                            <FormattedMessage id="BUTTON_EDIT_PROFILE" />
                        </AppLink>
                    </div>
                </div>
            </div>

            {!address && (
                <div className="dashboard__address card">
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <div className="text-center w-75">
                            <p>
                                <FormattedMessage id="TEXT_CALL_ADD_ADDRESS" />
                            </p>

                            <AppLink href={url.accountAddressNew()} className="btn btn-secondary btn-sm">
                                <FormattedMessage id="BUTTON_ADD_ADDRESS" />
                            </AppLink>
                        </div>
                    </div>
                </div>
            )}

            {address && (
                <AddressCard
                    className="dashboard__address"
                    address={address}
                    label={<FormattedMessage id="TEXT_DEFAULT_ADDRESS" />}
                    featured
                    footer={
                        <AppLink href={url.accountAddressEdit(address)}>
                            <FormattedMessage id="LINK_EDIT_ADDRESS" />
                        </AppLink>
                    }
                />
            )}
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;
