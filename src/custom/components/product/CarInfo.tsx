import React from "react";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import { ICarPost } from "~/interfaces/custom/car";

const CarInfo = (product: ICarPost) => {
    return (
        <React.Fragment>
            <div className="product__info-body">
                <div className="product__prices-stock">
                    <div className="product__prices">
                        {product.compareAtPrice && (
                            <React.Fragment>
                                <div className="product__price product__price--old">
                                    <CurrencyFormat value={product.compareAtPrice} />
                                </div>
                                <div className="product__price product__price--new">
                                    <CurrencyFormat value={product.price} />
                                </div>
                            </React.Fragment>
                        )}
                        {!product.compareAtPrice && (
                            <div className="product__price product__price--current">
                                <CurrencyFormat value={product.price} />
                            </div>
                        )}
                    </div>
                </div>

                {/* <div className="product__meta">
                    <table>
                        <tbody>
                            <tr></tr>
                        </tbody>
                    </table>
                </div> */}
            </div>
        </React.Fragment>
    );
};

export default CarInfo;
