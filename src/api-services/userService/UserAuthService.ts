import { getHostUrl } from "~/services/utils";
import { getUserAuthToken } from "~/utils/auth";
import GenericService from "../GenericService";

const ADD_POST = "addPost";
const GET_POSTS = "getPosts";
const EDIT_POST = "editPost";
const DELETE_POST = "deletePost";
const GET_MESSAGES = "getMessages";
const ADD_PAYMENT_METHOD = "addPaymentMethod";
const CHANGE_PASSWORD = "changePassword"

type PaymentMethod = {
    name: string;
    number: number;
    cvc: number;
    expiry: string;
    userId: string;
};

type ChangePassword = {
    oldPassword: string,
    newPassword: string,
    id:string
}

class UserAuthService extends GenericService {
    constructor() {
        super(
            {
                baseURL: `${getHostUrl()}/api/user/auth/`,
            },
            (value) => {
                value.headers["Authorization"] = getUserAuthToken();
                return value;
            }
        );
    }

    addPost = (data: any) => this.post(ADD_POST, data).then((response) => response.data);
    getPosts = (_id: string) => this.get(GET_POSTS, { _id }).then((response) => response.data);
    editPost = (data: any) => this.put(EDIT_POST, { ...data }).then((response) => response.data);
    deletePost = (productId: string) => this.delete(DELETE_POST, { productId }).then((response) => response.data);
    getMessages = (_id: string) => this.get(GET_MESSAGES, { _id }).then((response) => response.data);
    addPaymentMethod = (data: PaymentMethod) => this.post(ADD_PAYMENT_METHOD, data).then((response) => response.data);
    changePassword = (data:ChangePassword) => this.put(CHANGE_PASSWORD,data).then((response) => response.data);
}

export default new UserAuthService();
