import React, { useEffect, useState } from "react";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";
import { getUserFromToken, isUserLoggedIn, removeUserAuthToken, setUserAuthToken } from "~/utils/auth";

type User = {
    avatar: string;
    email: string;
    _id: string;
    fullName: string;
    city: string;
    isPaymentMethod: boolean;
};

const useAuthorizedUser = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (isUserLoggedIn()) {
            setUser(getUserFromToken());
        }
    }, []);

    const logout = () => {
        removeUserAuthToken();
        setUser(undefined);
    };

    const isUserExist = (): boolean => {
        if (isUserLoggedIn()) {
            setUser(getUserFromToken());
            return true;
        }
        return false;
    };

    const getAuthorizedUser = () => {
        const user = getUserFromToken();
        setUser(user);
        return user;
    };

    const setAuthorizedUser = (token: string) => {
        setUserAuthToken(token);
        const user = getUserFromToken();
        setUser(user);
        return user;
    };

    return {
        user,
        logout,
        isUserExist,
        getAuthorizedUser,
        setAuthorizedUser,
    };
};

export default useAuthorizedUser;
