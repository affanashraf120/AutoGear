export interface IUser {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    // Address
    city: string;
    state: string;
    postCode: string;
    address: string;
    isPaymentMethod: boolean;
    // Limit
}
