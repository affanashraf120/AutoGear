import React, { Dispatch, SetStateAction } from "react";
type User = {
    avatar: string;
    email: string;
    _id: string;
    fullName: string;
};

interface ContextType {
    // State variables
    user: User | undefined;
    // State functions
    logout: () => void;
    isUserExist: () => boolean;
    getAuthorizedUser: () => User | undefined;
    setAuthorizedUser: (token: string) => void;
}

export const AuthContext = React.createContext<ContextType>({
    user: undefined,
    logout: () => {},
    isUserExist: () => false,
    getAuthorizedUser: () => undefined,
    setAuthorizedUser: () => {},
});
