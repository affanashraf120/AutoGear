import GenericService from "../GenericService";

class UserAuthService extends GenericService {
    constructor() {
        super({
            headers: {
                Authorization: "",
            },
            baseURL: "",
        });
    }
}

export default new UserAuthService();
