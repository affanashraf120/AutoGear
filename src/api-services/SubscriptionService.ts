import { RepeatOneSharp } from "@material-ui/icons";
import { getHostUrl } from "~/services/utils";
import GenericService from "./GenericService";

const ADD_SUBSCRIPTION = "addSubscription";

class SubscriptionService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/subscription/`,
        });
    }
    addSubscription = (email: string) => this.post(ADD_SUBSCRIPTION, { email }).then((response) => response.data);
}

export default new SubscriptionService();
