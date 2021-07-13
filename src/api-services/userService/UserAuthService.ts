import { getHostUrl } from "~/services/utils";
import { getUserAuthToken } from "~/utils/auth";
import GenericService from "../GenericService";

const ADD_POST = "addPost";
const GET_POSTS = "getPosts";
const EDIT_POST = "editPost";
const DELETE_POST = "deletePost";
const GET_MESSAGES = "getMessages";

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
}

export default new UserAuthService();
