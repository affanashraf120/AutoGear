// react
import React from "react";
import { FormattedMessage } from "react-intl";
// application
import AppImage from "~/components/shared/AppImage";
import AppLink from "~/components/shared/AppLink";
import { IUser } from "~/interfaces/user";
import url from "~/services/url";
import { useUser, useUserSignOut } from "~/store/user/userHooks";
import { removeUserAuthToken } from "~/utils/auth";

type User = {
    avatar: string;
    email: string;
    _id: string;
    fullName: string;
};

interface Props {
    onCloseMenu: () => void;
    user: User;
    onLogout: () => void;
}

function AccountMenuList(props: Props) {
    const { onCloseMenu, user, onLogout } = props;

    const onLogOutButtonClick = () => {
        removeUserAuthToken();
        onCloseMenu();
        onLogout();
    };

    return (
        <React.Fragment>
            <AppLink href={url.accountDashboard()} className="account-menu__user" onClick={onCloseMenu}>
                <div className="account-menu__user-avatar">
                    <AppImage src={user.avatar} />
                </div>
                <div className=" account-menu__user-info">
                    <div className=" account-menu__user-name">{`${user.fullName}`}</div>
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
                        My Posts
                    </AppLink>
                </li>
                <li>
                    <AppLink href={url.accountProfile()} onClick={onCloseMenu}>
                        Edit Profile
                    </AppLink>
                </li>
                <li>
                    <AppLink href={url.addCar()} onClick={onCloseMenu}>
                        Add New Post
                    </AppLink>
                </li>
                <li>
                    <AppLink href={url.accountAddresses()} onClick={onCloseMenu}>
                        Edit Address
                    </AppLink>
                </li>
            </ul>
            <div className="account-menu__divider" />
            {/* <ul className="account-menu__links">
                <li>
                    <button type="button" onClick={onLogOutButtonClick}>
                        <FormattedMessage id="LINK_ACCOUNT_LOGOUT" />
                    </button>
                </li>
            </ul> */}
        </React.Fragment>
    );
}

export default AccountMenuList;
