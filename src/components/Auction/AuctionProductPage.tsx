import { FirebaseDatabaseTransaction } from "@react-firebase/database";
import classNames from "classnames";
import { min } from "moment";

import React from "react";
import Countdown from "react-countdown";
import { FormattedMessage } from "react-intl";
import { Button, Jumbotron } from "reactstrap";
import BlockMap from "~/components/blocks/BlockMap";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import Redirect from "~/components/shared/Redirect";
import Timer from "~/components/shared/Timer";
import ProductGallery, { IProductGalleryLayout } from "~/components/shop/ProductGallery";
import { getRealtimeProductById } from "~/services/firebase";
import url from "~/services/url";
import Features from "../../custom/components/Features";
import AuctionBidForm from "./AuctionBidForm";

const getDifference = (start_date: number, last_date: number): number => {
    // const SEC_PER_DAY = 60 * 60 * 24;
    // // Discard the time and time-zone information.
    // const utc1 = Date.UTC(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
    // const utc2 = Date.UTC(last_date.getFullYear(), last_date.getMonth(), last_date.getDate());

    // return Math.floor((utc2 - utc1) / SEC_PER_DAY);
    console.log("start_date", start_date);
    console.log("last_date", last_date);
    return last_date - start_date;
};

type Props = {
    productId: string;
    make: string;
    model: string;
    excerpt: string;
    version: string;
    images: string[];
    bid_amount: string;
    //Featured
    mileage: string;
    transmission: string;
    engineDisplacement: string;
    engine: string;
    engineType: string;
    //
    description: string;
    color: string;
    bodyType: string;
    assembly: string;
};
const galleryLayout = `product-full` as IProductGalleryLayout;

const AuctionProductPage = (props: Props) => {
    const {
        make,
        model,
        version,
        images,
        bid_amount,
        excerpt,
        mileage,
        transmission,
        engine,
        engineDisplacement,
        description,
        engineType,
        color,
        bodyType,
        assembly,
        productId,
    } = props;

    console.log(Date.parse("2021-7-6"));

    return (
        <>
            <div className={classNames("block-split", { "block-split--has-sidebar": false })}>
                <div className="container">
                    <div
                        style={{
                            margin: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* <Countdown
                            autoStart={true}
                            renderer={({ days, hours, minutes, seconds, completed }) => {
                                console.log("days", days);
                                console.log("hours", hours);
                                console.log("minutes", minutes);
                                console.log("seconds", seconds);
                                return (
                                    <span>
                                        {days}:{hours}:{minutes}:{seconds}
                                    </span>
                                );
                            }}
                        /> */}
                        <Timer time={Date.parse("07/07/2021") - Date.now()} />
                    </div>
                    <div className="block-split__row row no-gutters">
                        <div className="block-split__item block-split__item-content col-auto">
                            <div className={`product product--layout--full`}>
                                <div className="product__body">
                                    <div className="product__card product__card--one" />
                                    <div className="product__card product__card--two" />

                                    <ProductGallery
                                        images={images || []}
                                        layout={galleryLayout}
                                        className="product__gallery"
                                    />

                                    <div className="product__header">
                                        <h1 className="product__title">{`${make} ${model}`}</h1>
                                    </div>

                                    <div className="product__main">
                                        {excerpt && (
                                            <div
                                                className="product__excerpt"
                                                style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
                                            >
                                                {excerpt}
                                            </div>
                                        )}

                                        <div className="product__features">
                                            <div className="product__features-title">
                                                <FormattedMessage id="TEXT_KEY_FEATURES" />:
                                            </div>
                                            <ul>
                                                <li>
                                                    Mileage
                                                    {": "}
                                                    <span>{mileage}</span>
                                                </li>
                                                <li>
                                                    Engine
                                                    {": "}
                                                    <span>{engine}</span>
                                                </li>
                                                <li>
                                                    Displacement
                                                    {": "}
                                                    <span>{engineDisplacement}</span>
                                                </li>
                                                <li>
                                                    Transmission
                                                    {": "}
                                                    <span>{transmission}</span>
                                                </li>
                                                <li>
                                                    Engine Type
                                                    {": "}
                                                    <span>{engineType}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="product__info">
                                        {/* Form */}
                                        <div className="product__info-card">
                                            <div className="product__info-body" style={{ color: "grey" }}>
                                                <div
                                                    className="product__price product__price--current"
                                                    style={{ overflow: "auto" }}
                                                >
                                                    <CurrencyFormat value={parseInt(bid_amount)} />
                                                </div>
                                                <div className="product__meta">
                                                    <table>
                                                        <tbody>
                                                            <React.Fragment>
                                                                <tr>
                                                                    <th>Make</th>
                                                                    <td>{make}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Model</th>
                                                                    <td>{model}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Version</th>
                                                                    <td>{engine}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <FormattedMessage id="TABLE_COUNTRY" />
                                                                    </th>
                                                                    <td>
                                                                        <FormattedMessage id={`COUNTRY_NAME_PAK`} />
                                                                    </td>
                                                                </tr>
                                                            </React.Fragment>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <FirebaseDatabaseTransaction path={`/${productId}/bid_amount`}>
                                                {({ runTransaction }) => (
                                                    <AuctionBidForm
                                                        runTransaction={runTransaction}
                                                        previous_bid={parseInt(bid_amount)}
                                                    />
                                                )}
                                            </FirebaseDatabaseTransaction>
                                        </div>

                                        <Features />
                                    </div>

                                    <div className="product__tabs product-tabs product-tabs--layout--full">
                                        <div className="product-tabs__content">
                                            <div
                                                className={classNames("product-tabs__pane", {
                                                    "product-tabs__pane--active": true,
                                                })}
                                            >
                                                <div
                                                    className="typography"
                                                    style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
                                                    // dangerouslySetInnerHTML={{ __html: description }}
                                                >
                                                    {description}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-tabs__content">
                                            <div
                                                className={classNames("product-tabs__pane", {
                                                    "product-tabs__pane--active": true,
                                                })}
                                            >
                                                <div className="spec">
                                                    <div className="spec__section">
                                                        <h4 className="spec__section-title">Engine</h4>
                                                        <div className="spec__row">
                                                            <div className="spec__name">Engine Type</div>
                                                            <div className="spec__value">{engineType}</div>
                                                        </div>
                                                        <div className="spec__row">
                                                            <div className="spec__name">Displacement</div>
                                                            <div className="spec__value">{engineDisplacement} cc</div>
                                                        </div>
                                                    </div>
                                                    <div className="spec__section">
                                                        <h4 className="spec__section-title">Mileage & Transmission</h4>
                                                        <div className="spec__row">
                                                            <div className="spec__name">Mileage</div>
                                                            <div className="spec__value">{mileage} KM</div>
                                                        </div>
                                                        <div className="spec__row">
                                                            <div className="spec__name">Transmission</div>
                                                            <div className="spec__value">{transmission}</div>
                                                        </div>
                                                    </div>
                                                    <div className="spec__section">
                                                        <h4 className="spec__section-title">Body</h4>
                                                        <div className="spec__row">
                                                            <div className="spec__name">Color</div>
                                                            <div className="spec__value">{color}</div>
                                                        </div>
                                                        <div className="spec__row">
                                                            <div className="spec__name">Body Type</div>
                                                            <div className="spec__value">{bodyType}</div>
                                                        </div>
                                                        <div className="spec__row">
                                                            <div className="spec__name">Assembly</div>
                                                            <div className="spec__value">{assembly}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Jumbotron style={{ marginTop: "1rem" }}>
                        <h1 className="display-5">Car Location</h1>
                        {/* <p className="lead">Live car auction location</p> */}
                        <hr className="my-2" />
                        <p>Bid higher to win and get your best car from our live location.</p>
                        <p className="lead">
                            <Button
                                color="primary"
                                onClick={() => {
                                    const url =
                                        "https://www.google.com/maps?ll=31.47316,74.345278&z=12&t=m&hl=en&gl=US&mapclient=embed&cid=274721290364248792";
                                    window.open(url, "_blank", "noopener,noreferrer");
                                }}
                            >
                                View large map
                            </Button>
                        </p>
                        <BlockMap />
                    </Jumbotron>
                </div>
            </div>
        </>
    );
};

export default AuctionProductPage;
