import jwtDecode from "jwt-decode";

type User = {
    avatar: string;
    email: string;
    _id: string;
    fullName: string;
    city: string;
    isPaymentMethod: boolean;
};

export const setUserAuthToken = (token: string) => {
    localStorage.setItem("USER_AUTH_TOKEN", token);
};

export const getUserAuthToken = (): string | null => {
    const token = localStorage.getItem("USER_AUTH_TOKEN");
    return token;
};

export const removeUserAuthToken = () => {
    console.log("Logout");
    localStorage.removeItem("USER_AUTH_TOKEN");
};

export const getUserFromToken = (): User | undefined => {
    const token = getUserAuthToken();
    if (token) {
        const payload: any = jwtDecode(token);
        const { email } = payload;
        let avatar = `https://ui-avatars.com/api/?name=${email}`;
        const user: User = {
            avatar,
            ...payload,
        };
        return user;
    }
    return undefined;
};

export const isUserLoggedIn = () => {
    const token = getUserAuthToken();
    if (token) return true;
    return false;
};
