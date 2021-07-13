import { RepeatOneSharp } from "@material-ui/icons";
import { getHostUrl } from "~/services/utils";
import GenericService from "./GenericService";

const ADD_MESSAGE = "addMessage";

type Message = {
    name: string;
    email: string;
    message: string;
    date: string;
    sellerId: string;
    productId: string;
};

class MessageService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/message/`,
        });
    }
    addMessage = (data: Message) => this.post(ADD_MESSAGE, data).then((response) => response.data);
}

export default new MessageService();
