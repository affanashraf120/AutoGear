// react
import React, { PropsWithChildren, useEffect, useState } from "react";
// third-party
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
// application
import AppLink from "~/components/shared/AppLink";
import BlockSpace from "~/components/blocks/BlockSpace";
import Redirect from "~/components/shared/Redirect";
import url from "~/services/url";
import { ILink } from "~/interfaces/link";
import { useAppRouter } from "~/services/router";
import { useAsyncAction } from "~/store/hooks";
import { useUser, useUserSignOut } from "~/store/user/userHooks";
import Loader from "~/custom/components/Loader";

interface Props extends PropsWithChildren<{}> {}

function AccountLayout(props: Props) {
    const { children } = props;
    const intl = useIntl();
    const router = useAppRouter();
    const [loading, setLoading] = useState(true);

    const navigation: ILink[] = [
        { title: `Add Vehicle`, url: url.addVehicle() },
        { title: `Add Auction`, url: url.addAuction() },
        { title: `Manage Auction`, url: url.manageAuction() },
        { title: `Manage Users`, url: url.manageUsers() },
        { title: `Manage Posts`, url: url.managePosts() },
    ];

    const onSignOutClick = () => {
        localStorage.removeItem("ALLOW_ADMIN");
        router.push(url.home());
    };

    useEffect(() => {
        const admin = localStorage.getItem("ALLOW_ADMIN");
        if (!admin) router.push(url.adminLogin());
        admin && setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <React.Fragment>
            <BlockSpace layout="after-header" />

            <div className="block">
                <div className="container container--max--xl">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">
                                    <FormattedMessage id="HEADER_NAVIGATION" />
                                </h4>
                                <ul className="account-nav__list">
                                    {navigation.map((item, index) => (
                                        <li
                                            key={index}
                                            className={classNames("account-nav__item", {
                                                "account-nav__item--active": router.pathname === item.url,
                                            })}
                                        >
                                            <AppLink href={item.url}>{item.title}</AppLink>
                                        </li>
                                    ))}
                                    <li className="account-nav__divider" role="presentation" />
                                    <li className="account-nav__item">
                                        {/* eslint-disable-next-line */}
                                        <button type="button" onClick={onSignOutClick}>
                                            <FormattedMessage id="LINK_ACCOUNT_LOGOUT" />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mt-4 mt-lg-0">{children}</div>
                    </div>
                </div>
            </div>
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default AccountLayout;
