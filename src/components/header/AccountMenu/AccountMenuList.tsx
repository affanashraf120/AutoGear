// react
import React from "react";
import { FormattedMessage } from "react-intl";
// application
import AppImage from "~/components/shared/AppImage";
import AppLink from "~/components/shared/AppLink";
import { IUser } from "~/interfaces/user";
import url from "~/services/url";
import { useUser, useUserSignOut } from "~/store/user/userHooks";

interface Props {
    onCloseMenu: () => void;
    user: IUser;
}

function AccountMenuList(props: Props) {
    const { onCloseMenu, user } = props;
    const userSignOut = useUserSignOut();

    const onLogOutButtonClick = () => {
        userSignOut().then(() => {
            if (onCloseMenu) {
                onCloseMenu();
            }
        });
    };

    return (
        <React.Fragment>
            <AppLink href={url.accountDashboard()} className="account-menu__user" onClick={onCloseMenu}>
                <div className="account-menu__user-avatar">
                    <AppImage src={user.avatar} />
                </div>
                <div className=" account-menu__user-info">
                    <div className=" account-menu__user-name">
                        {`${user.firstName ? user.firstName : ``} ${user.lastName ? user.lastName : ``}`}
                    </div>
                    <div className=" account-menu__user-email">{user.email}</div>
                </div>
            </AppLink>
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
                <li>
                    <AppLink href={url.accountDashboard()} onClick={onCloseMenu}>
                        <FormattedMessage id="LINK_ACCOUNT_DASHBOARD" />
                    </AppLink>
                </li>
                <li>
                    <AppLink href={url.accountGarage()} onClick={onCloseMenu}>
                        <FormattedMessage id="LINK_ACCOUNT_GARAGE" />
                    </AppLink>
                </li>
                <li>
                    <AppLink href={url.accountProfile()} onClick={onCloseMenu}>
                        <FormattedMessage id="LINK_ACCOUNT_PROFILE" />
                    </AppLink>
                </li>
                <li>
                    <AppLink href={url.addCar()} onClick={onCloseMenu}>
                        <FormattedMessage id="LINK_ACCOUNT_ADD_CAR" />
                    </AppLink>
                </li>
                <li>
                    <AppLink href={url.accountAddresses()} onClick={onCloseMenu}>
                        <FormattedMessage id="LINK_ACCOUNT_ADDRESSES" />
                    </AppLink>
                </li>
            </ul>
            <div className="account-menu__divider" />
            <ul className="account-menu__links">
                <li>
                    <button type="button" onClick={onLogOutButtonClick}>
                        <FormattedMessage id="LINK_ACCOUNT_LOGOUT" />
                    </button>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default AccountMenuList;
