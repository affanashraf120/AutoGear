import classNames from "classnames";
import React from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import AsyncAction from "~/components/shared/AsyncAction";
import InputNumber from "~/components/shared/InputNumber";
import { ICarPost } from "~/interfaces/custom/car";
import { IProduct } from "~/interfaces/product";
import { useProductForm } from "~/services/forms/product";
import { useCompareAddItem } from "~/store/compare/compareHooks";
import { useWishlistAddItem } from "~/store/wishlist/wishlistHooks";
import { Compare16Svg, Wishlist16Svg } from "~/svg";

const CarActions = (product: ICarPost) => {
    const wishlistAddItem = useWishlistAddItem();
    const compareAddItem = useCompareAddItem();
    // const productForm = useProductForm(product);

    return (
        <React.Fragment>
            <div className="product__actions">
                {/* {product.stock !== "out-of-stock" && (
                    <React.Fragment>
                        <div className="product__actions-item product__actions-item--quantity">
                            <Controller
                                name="quantity"
                                rules={{
                                    required: true,
                                }}
                                render={({ value, onChange, onBlur }) => (
                                    <InputNumber size="lg" min={1} value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                            />
                        </div>
                        <div className="product__actions-item product__actions-item--addtocart">
                            <button
                                type="submit"
                                className={classNames("btn", "btn-primary", "btn-lg", "btn-block", {
                                    "btn-loading": productForm.submitInProgress,
                                })}
                            >
                                <FormattedMessage id="BUTTON_ADD_TO_CART" />
                            </button>
                        </div>
                        <div className="product__actions-divider" />
                    </React.Fragment>
                )} */}
                <AsyncAction
                    action={() => wishlistAddItem(product)}
                    render={({ run, loading }) => (
                        <button
                            type="button"
                            className={classNames("product__actions-item", "product__actions-item--wishlist", {
                                "product__actions-item--loading": loading,
                            })}
                            onClick={run}
                        >
                            <Wishlist16Svg />
                            <span>
                                <FormattedMessage id="BUTTON_ADD_TO_WISHLIST" />
                            </span>
                        </button>
                    )}
                />
                <AsyncAction
                    action={() => compareAddItem(product)}
                    render={({ run, loading }) => (
                        <button
                            type="button"
                            className={classNames("product__actions-item", "product__actions-item--compare", {
                                "product__actions-item--loading": loading,
                            })}
                            onClick={run}
                        >
                            <Compare16Svg />
                            <span>
                                <FormattedMessage id="BUTTON_ADD_TO_COMPARE" />
                            </span>
                        </button>
                    )}
                />
            </div>
        </React.Fragment>
    );
};

export default CarActions;
