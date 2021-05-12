export interface IUser {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

interface User {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    addresses:[],
    postcode: string,
    country:string,
}

// interface Address