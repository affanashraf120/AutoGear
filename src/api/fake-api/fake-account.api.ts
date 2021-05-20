/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { IAddress } from "~/interfaces/address";
import { IOrder } from "~/interfaces/order";
import { IOrdersList } from "~/interfaces/list";
import { IUser } from "~/interfaces/user";
import { AccountApi, IEditAddressData, IEditProfileData, IGetOrdersListOptions } from "~/api/base";
import {
    accountChangePassword,
    accountEditProfile,
    accountSignIn,
    accountSignOut,
    accountSignUp,
    addAddress,
    delAddress,
    editAddress,
    getAddress,
    getAddresses,
    getDefaultAddress,
    getOrderById,
    getOrderByToken,
    getOrdersList,
} from "~/server/endpoints";
import axios from "axios";

export class FakeAccountApi extends AccountApi {
    signIn(email: string, password: string): Promise<IUser> {
        return axios.post("/api/auth/loginUser", { email: email, password: password }).then((response) => {
            console.log(response.data.data);
            return {
                ...response.data.data,
            };
        });
    }

    signUp(email: string, password: string): Promise<IUser> {
        return axios.post("/api/auth/registerUser", { email: email, password: password }).then((response) => {
            console.log(response.data.data);
            return {
                ...response.data.data,
            };
        });
    }

    signOut(): Promise<void> {
        return accountSignOut();
    }

    editProfile(data: IEditProfileData): Promise<IUser> {
        return axios.put("/api/auth/editProfile", data).then((response) => {
            console.log(response.data.data);
            return {
                ...response.data.data,
            };
        });
    }

    changePassword(oldPassword: string, newPassword: string, id: string): Promise<void> {
        const data = { oldPassword, newPassword, id };
        
        console.log(data);
        return axios.put("/api/auth/changePassword", data).then((res) => {
            console.log(res.data.data);
            return res.data.data;
        });
    }

    addAddress(data: IEditAddressData): Promise<IAddress> {
        return addAddress(data);
    }

    editAddress(addressId: number, data: IEditAddressData): Promise<IAddress> {
        return editAddress(addressId, data);
    }

    delAddress(addressId: number): Promise<void> {
        return delAddress(addressId);
    }

    getDefaultAddress(): Promise<IAddress | null> {
        return getDefaultAddress();
    }

    getAddress(addressId: number): Promise<IAddress> {
        return getAddress(addressId);
    }

    getAddresses(): Promise<IAddress[]> {
        return getAddresses();
    }

    getOrdersList(options?: IGetOrdersListOptions): Promise<IOrdersList> {
        return getOrdersList(options);
    }

    getOrderById(id: number): Promise<IOrder> {
        return getOrderById(id);
    }

    getOrderByToken(token: string): Promise<IOrder> {
        return getOrderByToken(token);
    }
}
