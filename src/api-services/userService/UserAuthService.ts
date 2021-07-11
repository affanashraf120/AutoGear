import { AxiosInterceptorManager, AxiosRequestConfig } from "axios";
import { getHostUrl } from "~/services/utils";
import { getUserAuthToken } from "~/utils/auth";
import GenericService from "../GenericService";

const ADD_POST = "addPost";

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
}

export default new UserAuthService();
