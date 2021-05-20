// react
import React, { useEffect, useState } from "react";
// third-party
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
// application
import AccountLayout from "~/components/account/AccountLayout";
import AppLink from "~/components/shared/AppLink";
import AsyncAction from "~/components/shared/AsyncAction";
import PageTitle from "~/components/shared/PageTitle";
import url from "~/services/url";
import VehicleForm from "~/components/shared/VehicleForm";
import { IVehicle } from "~/interfaces/vehicle";
import { Cross12Svg, RecycleBin16Svg } from "~/svg";
import { useGarageAddItem, useGarageRemoveItem, useUserVehicles } from "~/store/garage/garageHooks";
import axios from "axios";
import { useUser } from "~/store/user/userHooks";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import Rating from "~/components/shared/Rating";
import AppImage from "~/components/shared/AppImage";
import { wishlistRemoveItem } from "~/store/wishlist/wishlistActions";
import { IProduct } from "~/interfaces/product";

function Page() {
    const intl = useIntl();
    const user = useUser();
    const vehicles = useUserVehicles();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);
    const garageAddItem = useGarageAddItem();
    const garageRemoveItem = useGarageRemoveItem();
    const [items, setItems] = useState<IProduct[]>([]);

    const getUserCars = () => {
        axios
            .get(`/api/products/${user?._id}`)
            .then((res) => {
                console.log(res.data.data);
                setItems(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(getUserCars, []);

    return (
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
                                {/* <th className="wishlist__column wishlist__column--head wishlist__column--remove">
                                        <span className="sr-only">
                                            <FormattedMessage id="TABLE_REMOVE" />
                                        </span>
                                    </th> */}
                            </tr>
                        </thead>
                        <tbody className="wishlist__body">
                            {items.map((product, index) => (
                                <tr key={index} className="wishlist__row wishlist__row--body">
                                    <td className="wishlist__column wishlist__column--body wishlist__column--image">
                                        <div className="image image--type--product">
                                            <AppLink  className="image__body">
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
                                    {/* <td
                                            className={classNames(
                                                "wishlist__column",
                                                "wishlist__column--body",
                                                "wishlist__column--remove"
                                            )}
                                        >
                                            <AsyncAction
                                                action={() => {}}
                                                render={({ run, loading }) => (
                                                    <button
                                                        type="button"
                                                        className={classNames(
                                                            "wishlist__remove",
                                                            "btn",
                                                            "btn-sm",
                                                            "btn-muted",
                                                            "btn-icon",
                                                            {
                                                                "btn-loading": loading,
                                                            }
                                                        )}
                                                        onClick={run}
                                                    >
                                                        <Cross12Svg />
                                                    </button>
                                                )}
                                            />
                                        </td> */}
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
            
            {/* <div className="card-header">
                <h5><FormattedMessage id="HEADER_ADD_VEHICLE" /></h5>
            </div>
            <div className="card-divider" /> */}
            {/* <div className="card-body card-body--padding--2">
                <VehicleForm location="account" onVehicleChange={setVehicle} />

                <div className="mt-4 pt-3">
                    <AsyncAction
                        action={() => (vehicle ? garageAddItem(vehicle.id) : Promise.resolve())}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                className={classNames('btn', 'btn-primary', {
                                    'btn-loading': loading,
                                })}
                                disabled={vehicle === null}
                                onClick={run}
                            >
                                <FormattedMessage id="BUTTON_ADD_VEHICLE" />
                            </button>
                        )}
                    />
                </div>
            </div> */}
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;
