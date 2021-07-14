import { IFilterValues, IListOptions } from "~/interfaces/list";
import { getHostUrl } from "~/services/utils";
import GenericService from "./GenericService";

const GET_ALL_PRODUCTS = "getAllProducts";
const GET_FILTERED_PRODUCTS = "getFilteredProducts";

class ProductService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/product/`,
        });
    }
    getProductById = (id: string) => this.get(id).then((response) => response.data);
    getAllProducts = () => this.get(GET_ALL_PRODUCTS).then((response) => response.data);
    getFilteredProducts = (options: IListOptions = {}, filters: IFilterValues = {}) =>
        this.post(GET_FILTERED_PRODUCTS, {
            options,
            filterValues: filters,
        }).then((response) => response.data);
}

export default new ProductService();
