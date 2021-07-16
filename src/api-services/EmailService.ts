import { getHostUrl } from "~/services/utils";
import GenericService from "./GenericService";

const VERIFICATION_CODE = "verificationCode";
const POST_CONFIRMATION = "postConfirmation";
const FEATURED_AD_ORDER = "featuredTransaction";
const SEND_MESSAGE = "sendMessage";

class EmailService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/email/`,
        });
    }
    sendVerificationCode = (email: string, code: number) => this.post(VERIFICATION_CODE, { email, code });
    postConfirmation = (email: string, fullName: string) => this.post(POST_CONFIRMATION, { email, fullName });
    featuredAd = (email: string) => this.post(FEATURED_AD_ORDER, { email });
    sendMessage = (email: string, message: string) => this.post(SEND_MESSAGE, { email, message });
}

export default new EmailService();
