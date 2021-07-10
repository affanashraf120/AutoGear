import { IUser } from "~/interfaces/api/userServices";
import { getHostUrl } from "~/services/utils";
import GenericService from "../GenericService";

const REGISTER = "register";
const FORGOT = "forgot";
const LOGIN = "login";

type RequestData = {
    email: string;
    password: string;
};

class UserService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/user/`,
        });
    }
    register = (data: IUser) => this.post(REGISTER, data).then((response) => response.data);
    forgot = (data: RequestData) => this.put(FORGOT, data).then((response) => response.data);
    login = (data: RequestData) => this.post(LOGIN, data).then((response) => response.data);
}

export default new UserService();
