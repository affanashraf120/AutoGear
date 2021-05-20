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
        // return getProductsList(options, filters);

        console.log("Filters", filters);
        console.log("Options", options);
        const url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : `${process.env.VERCEL_URL}`;

        return axios
            .post(`${url}/api/products/getProducts`, {
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
        return getProductAnalogs(productId);
    }

    getRelatedProducts(productId: string, limit: number): Promise<IProduct[]> {
        return getRelatedProducts(productId, limit);
    }

    getFeaturedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        return getFeaturedProducts(categorySlug, limit);
    }

    getPopularProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        return getPopularProducts(categorySlug, limit);
    }

    getTopRatedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
        return getTopRatedProducts(categorySlug, limit);
    }

    getSpecialOffers(limit: number): Promise<IProduct[]> {
        return getSpecialOffers(limit);
    }

    getLatestProducts(limit: number): Promise<IProduct[]> {
        return getLatestProducts(limit);
    }

    getSearchSuggestions(query: string, options?: IGetSearchSuggestionsOptions): Promise<IGetSearchSuggestionsResult> {
        return getSearchSuggestions(query, options);
    }

    checkout(data: ICheckoutData): Promise<IOrder> {
        return checkout(data);
    }
}
