// react
import axios from "axios";
// third-party
import classNames from "classnames";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
// application
import AccountLayout from "~/components/account/AccountLayout";
import AppImage from "~/components/shared/AppImage";
import AppLink from "~/components/shared/AppLink";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import PageTitle from "~/components/shared/PageTitle";
import Rating from "~/components/shared/Rating";
import Loader from "~/custom/components/Loader";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import { IProduct } from "~/interfaces/product";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";
import { getHostUrl } from "~/services/utils";
import { isAuthorized } from "~/utils/user";

function Page() {
    const [items, setItems] = useState<IProduct[]>([]);
    const { user, isUserExist } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const history = useAppRouter();
    const getUserCars = () => {
        // axios
        //     .get(`/api/products/${user?._id}`)
        //     .then((res) => {
        //         console.log(res.data.data);
        //         setItems(res.data.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };
    useEffect(getUserCars, []);

    useEffect(() => {
        if (!isUserExist()) {
            history.push(url.signIn());
        } else setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className="card">
            <PageTitle>My Cars</PageTitle>
            <React.Fragment>
                <div className="card-header">
                    <h5>Cars Posts</h5>
                </div>
                <div className="card-divider" />

                <div className="wishlist">
                    <table className="wishlist__table">
                        <thead className="wishlist__head">
                            <tr className="wishlist__row wishlist__row--head">
                                <th className="wishlist__column wishlist__column--head wishlist__column--image">
                                    <FormattedMessage id="TABLE_IMAGE" />
                                </th>
                                <th className="wishlist__column wishlist__column--head wishlist__column--product">
                                    <FormattedMessage id="TABLE_PRODUCT" />
                                </th>
                                <th className="wishlist__column wishlist__column--head wishlist__column--price">
                                    <FormattedMessage id="TABLE_PRICE" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="wishlist__body">
                            {items.map((product, index) => (
                                <tr key={index} className="wishlist__row wishlist__row--body">
                                    <td className="wishlist__column wishlist__column--body wishlist__column--image">
                                        <div className="image image--type--product">
                                            <AppLink className="image__body">
                                                <AppImage
                                                    className="image__tag"
                                                    src={product.images && product.images[0]}
                                                />
                                            </AppLink>
                                        </div>
                                    </td>
                                    <td
                                        className={classNames(
                                            "wishlist__column",
                                            "wishlist__column--body",
                                            "wishlist__column--product"
                                        )}
                                    >
                                        <div className="wishlist__product-name">
                                            <AppLink href={url.product(product)}>{product.name}</AppLink>
                                        </div>
                                        <div className="wishlist__product-rating">
                                            <div className="wishlist__product-rating-stars">
                                                <Rating value={product.rating || 0} />
                                            </div>
                                            <div className="wishlist__product-rating-title">
                                                <FormattedMessage
                                                    id="TEXT_RATING_LABEL"
                                                    values={{
                                                        rating: product.rating,
                                                        reviews: product.reviews,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        className={classNames(
                                            "wishlist__column",
                                            "wishlist__column--body",
                                            "wishlist__column--price"
                                        )}
                                    >
                                        <CurrencyFormat value={product.price} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card-body card-body--padding--2">
                    <div className="vehicles-list vehicles-list--layout--account">
                        <div className="vehicles-list__body"></div>
                    </div>
                </div>
                <div className="card-divider" />
            </React.Fragment>
        </div>
    );
}

Page.Layout = AccountLayout;

// Page.getInitialProps = async (ctx: NextPageContext) => {
//     const loginBaseUrl = `${getHostUrl()}${url.signIn()}`;
//     const loginUrl = url.signIn();
//     const userApiUrl = `${getHostUrl()}/api/user`;
//     const json = await isAuthorized(userApiUrl, loginBaseUrl, loginUrl, ctx);
//     return { user: json.data };
// };

export default Page;
