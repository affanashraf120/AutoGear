// react
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "~/custom/components/Loader";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import useAuthorizedUser from "~/custom/hooks/useAuthorizedUser";
import { useSignInForm } from "~/services/forms/sign-in";
import { useUser } from "~/store/user/userHooks";
import { getUserAuthToken, getUserFromToken } from "~/utils/auth";
import AccountMenuList from "./AccountMenuList";
import AccountMenuLogin from "./AccountMenuLogin";

type User = {
    avatar: string;
    email: string;
    _id: string;
    fullName: string;
};

interface Props {
    onCloseMenu: () => void;
}

function AccountMenu(props: Props) {
    const { onCloseMenu } = props;
    const { user, logout } = useAuthContext();

    const signOutUser = () => {
        logout();
    };

    return (
        <div className="account-menu">
            {user ? (
                <AccountMenuList user={user} onCloseMenu={onCloseMenu} onLogout={signOutUser} />
            ) : (
                <AccountMenuLogin {...props} />
            )}
        </div>
    );
}

export default AccountMenu;
