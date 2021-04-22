// application
import { AppAction } from "~/store/types";
import { IProduct } from "~/interfaces/product";
import { ICarPost } from "~/interfaces/custom/car";

export const COMPARE_ADD_ITEM = "COMPARE_ADD_ITEM";
export const COMPARE_REMOVE_ITEM = "COMPARE_REMOVE_ITEM";
export const COMPARE_CLEAR = "COMPARE_CLEAR";

export interface CompareAddItemAction {
    type: typeof COMPARE_ADD_ITEM;
    // product: IProduct;
    product: ICarPost;
}

export interface CompareRemoveItemAction {
    type: typeof COMPARE_REMOVE_ITEM;
    // productId: number;
    productId: string;
}

export interface CompareClearAction {
    type: typeof COMPARE_CLEAR;
}

export type CompareAction = CompareAddItemAction | CompareRemoveItemAction | CompareClearAction;

export type CompareThunkAction<T = void> = AppAction<CompareAction, T>;
