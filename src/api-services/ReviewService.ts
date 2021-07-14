import { RepeatOneSharp } from "@material-ui/icons";
import { getHostUrl } from "~/services/utils";
import GenericService from "./GenericService";

const ADD_REVIEW = "addReview";
const GET_REVIEWS = "getReviews";

type Review = {
    name: string;
    email: string;
    content: string;
    date: string;
    rating: number;
    productId: string;
};

class ReviewService extends GenericService {
    constructor() {
        super({
            baseURL: `${getHostUrl()}/api/review/`,
        });
    }
    addReview = (data: Review) => this.put(ADD_REVIEW, data).then((response) => response.data);
    getReviews = (productId: string) => this.get(GET_REVIEWS, { productId }).then((response) => response.data);
}

export default new ReviewService();
