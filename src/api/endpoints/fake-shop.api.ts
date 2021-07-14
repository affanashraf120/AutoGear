/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { getBrands } from "~/server/endpoints/brands";
import { IBrand } from "~/interfaces/brand";
import { IFilterValues, IListOptions, IReviewsList } from "~/interfaces/list";
import { IOrder } from "~/interfaces/order";
import { IProductsList, IProduct } from "~/interfaces/product";
import { IReview } from "~/interfaces/review";
import { IShopCategory } from "~/interfaces/category";
import {
    IAddProductReviewData,
    ICheckoutData,
    IGetBrandsOptions,
    IGetCategoriesOptions,
    IGetCategoryBySlugOptions,
    IGetSearchSuggestionsOptions,
    IGetSearchSuggestionsResult,
    ShopApi,
} from "~/api/base";
import {
    addProductReview,
    checkout,
    getCategories,
    getCategoryBySlug,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductAnalogs,
    getProductBySlug,
    getProductReviews,
    getProductsList,
    getRelatedProducts,
    getSearchSuggestions,
    getSpecialOffers,
    getTopRatedProducts,
} from "~/server/endpoints";
import axios from "axios";
import { delayResponse } from "~/server/utils";
import { sendMail } from "~/services/email";
import { getHostUrl } from "~/services/utils";

export class FakeShopApi implements ShopApi {
    getCategoryBySlug(slug: string, options?: IGetCategoryBySlugOptions): Promise<IShopCategory> {
        return getCategoryBySlug(slug, options);
    }

    getCategories(options?: IGetCategoriesOptions): Promise<IShopCategory[]> {
        return getCategories(options);
    }

    getBrands(options?: IGetBrandsOptions): Promise<IBrand[]> {
        return getBrands(options);
    }

    async getProductsList(options: IListOptions = {}, filters: IFilterValues = {}): Promise<IProductsList> {
        return axios
            .post(`${getHostUrl()}/api/products/getProducts`, {
                options,
                filterValues: filters,
            })
            .then((res) => res.data.data);
    }

    async getProductBySlug(slug: string): Promise<IProduct> {
        // return getProductBySlug(slug);
        const url = getHostUrl();
        let response = await axios.post(`${url}/api/products/getProductBySlug`, {
            slug,
        });

        const product: IProduct = response.data.data;

        console.log(product);

        return product;
    }

    getProductReviews(productId: string, options?: IListOptions): Promise<IReviewsList> {
        return getProductReviews(productId, options);
    }

    addProductReview(productId: string, data: IAddProductReviewData): Promise<IReview> {
        return addProductReview(productId, data);
    }

    getProductAnalogs(productId: string): Promise<IProduct[]> {
        // return getProductAnalogs(productId);
        return axios.get(`${getHostUrl()}/api/products/getAllProducts`).then((res) => {
            let products = shuffle(res.data.data).slice(0, 4);
            return products;
        });
    }

    getRelatedProducts(productId: string, limit: number): Promise<IProduct[]> {
        // return getRelatedProducts(productId, limit);
        return axios.get(`${getHostUrl()}/api/products/getAllProducts`).then((res) => {
            let products = shuffle(res.data.data).slice(0, limit);
            return products;
        });
    }

    getFeaturedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        // return getFeaturedProducts(categorySlug, limit);
        return axios.get(`${getHostUrl()}/api/products/getAllProducts`).then((res) => {
            let products = shuffle(res.data.data).slice(0, limit);
            return products;
        });
    }

    getPopularProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        // return getPopularProducts(categorySlug, limit);
        return axios.get(`${getHostUrl()}/api/products/getAllProducts`).then((res) => {
            let products = shuffle(res.data.data).slice(0, limit);
            return products;
        });
    }

    getTopRatedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        // return getTopRatedProducts(categorySlug, limit);
        return axios.get(`${getHostUrl()}/api/products/getAllProducts`).then((res) => {
            let products = shuffle(res.data.data).slice(0, limit);
            return products;
        });
    }

    getSpecialOffers(limit: number): Promise<IProduct[]> {
        // return getSpecialOffers(limit);
        return axios.get(`${getHostUrl()}/api/products/getAllProducts`).then((res) => {
            let products = shuffle(res.data.data).slice(0, limit);
            return products;
        });
    }

    getLatestProducts(limit: number): Promise<IProduct[]> {
        // return getLatestProducts(limit);//
        return axios.get(`${getHostUrl()}/api/products/getAllProducts`).then((res) => {
            let products = shuffle(res.data.data).slice(0, limit);
            return products;
        });
    }

    getSearchSuggestions(query: string, options?: IGetSearchSuggestionsOptions): Promise<IGetSearchSuggestionsResult> {
        return getSearchSuggestions(query, options);
    }

    checkout(data: ICheckoutData): Promise<IOrder> {
        return checkout(data);
    }
}

function shuffle(array: any[]) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
