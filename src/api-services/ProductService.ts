import { getHostUrl } from "~/services/utils";
import GenericService from "./GenericService";

class ProductService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/product/`,
        });
    }
    getProductById = (id: string) => this.get(id).then(response => response.data)
}

export default new ProductService();
