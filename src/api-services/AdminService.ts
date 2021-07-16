import { RepeatOneSharp } from "@material-ui/icons";
import GenericService from "./GenericService";
import { getHostUrl } from "../services/utils";

const SEND_MESSAGE = "sendMessage";
const GET_MESSAGES = "getMessages";

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
            baseURL: `${getHostUrl()}/api/admin/`,
        });
    }
    sendMessage = (data: Message) => this.post(SEND_MESSAGE, data).then((response) => response.data);
    getMessages = () => this.get(GET_MESSAGES).then((response) => response.data);
}

export default new MessageService();
