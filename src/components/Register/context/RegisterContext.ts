import React, { Dispatch, SetStateAction } from "react";
import { defaultValues, RegisterData } from "../types";

interface ContextType {
    // State variables
    emailVerified: boolean;
    phoneVerified: boolean;
    // State functions
    setEmailVerified: Dispatch<SetStateAction<boolean>>;
    setPhoneVerified: Dispatch<SetStateAction<boolean>>;
}

export const RegisterContext = React.createContext<ContextType>({
    emailVerified: false,
    phoneVerified: false,
    setEmailVerified: () => {},
    setPhoneVerified: () => {},
});
