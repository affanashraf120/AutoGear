import { getHostUrl } from "~/services/utils";
import GenericService from "./GenericService";

const VERIFICATION_CODE = "verificationCode";

class EmailService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/email/`,
        });
    }
    sendVerificationCode = (email: string, code: number) => this.post(VERIFICATION_CODE, { email, code });
}

export default new EmailService();
