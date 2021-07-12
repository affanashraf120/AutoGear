// react
import React, { useRef } from "react";
// third-party
import classNames from "classnames";
import Slick from "react-slick";
import { FormattedMessage } from "react-intl";
// application
import AppLink from "~/components/shared/AppLink";
import AppSlick, { ISlickProps } from "~/components/shared/AppSlick";
import Arrow from "~/components/shared/Arrow";
import Decor from "~/components/shared/Decor";
import ProductCard from "~/components/shared/ProductCard";
import Timer from "~/components/shared/Timer";
import { baseUrl } from "~/services/utils";
import { IProduct } from "~/interfaces/product";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import AuctionProductCard from "../Auction/AuctionProductCard";
import { useAppRouter } from "~/services/router";

interface Props {
    products: IProduct[];
    loading?: boolean;
}

const slickSettings: ISlickProps = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        { breakpoint: 1399, settings: { slidesToShow: 4, slidesToScroll: 4 } },
        { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 459, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
};

function BlockAuction(props: Props) {
    const { products, loading = false } = props;
    const router = useAppRouter();
    const slickRef = useRef<Slick>(null);

    const handleNextClick = () => {
        if (slickRef.current) {
            slickRef.current.slickNext();
        }
    };

    const handlePrevClick = () => {
        if (slickRef.current) {
            slickRef.current.slickPrev();
        }
    };

    const rootClasses = classNames("block", "block-sale", { "block-sale--loading": loading });

    return (
        <FirebaseDatabaseNode path="/" limitToFirst={12}>
            {(element) => (
                <div className={classNames("block", "block-sale", { "block-sale--loading": element.isLoading })}>
                    <div className="block-sale__content">
                        <div className="block-sale__header">
                            <div className="block-sale__title">
                                {/* <FormattedMessage id="HEADER_DEAL_ZONE_TITLE" />
                                 */}
                                Car Auction
                            </div>
                            <div className="block-sale__subtitle">
                                {/* <FormattedMessage id="HEADER_DEAL_ZONE_SUBTITLE" />
                                 */}
                                Place your bid to win
                            </div>
                            {/* <div className="block-sale__timer">
                                <Timer time={3 * 24 * 60 * 60} />
                            </div> */}
                            <div className="block-sale__controls">
                                <Arrow
                                    className="block-sale__arrow block-sale__arrow--prev"
                                    direction="prev"
                                    onClick={handlePrevClick}
                                />
                                <div className="block-sale__link">
                                    <AppLink href="/auction">
                                        {/* <FormattedMessage id="LINK_VIEW_ALL_AVAILABLE_OFFERS" /> */}
                                        View all auction cars here
                                    </AppLink>
                                </div>
                                <Arrow
                                    className="block-sale__arrow block-sale__arrow--next"
                                    direction="next"
                                    onClick={handleNextClick}
                                />
                                <Decor type="center" className="block-sale__header-decor" />
                            </div>
                        </div>

                        <div className="block-sale__body">
                            {/* <Decor type="bottom" className="block-sale__body-decor" /> */}
                            <div
                                className="block-sale__image"
                                style={{ backgroundImage: `url(${baseUrl("/images/sale.jpg")})` }}
                            />
                            <div className="block-sale__loader" />
                            <div className="container">
                                <div className="block-sale__carousel">
                                    <AppSlick ref={slickRef} {...slickSettings}>
                                        {element.value &&
                                            Object.entries(element.value).map(([key, value], index) => (
                                                <div key={index} className="block-sale__item">
                                                    <AuctionProductCard
                                                        product={element.value[key]}
                                                        onClick={(id: string) => {
                                                            router.push(`/auction/${id}`);
                                                        }}
                                                        id={key}
                                                    />
                                                </div>
                                            ))}
                                    </AppSlick>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </FirebaseDatabaseNode>
    );
}

export default React.memo(BlockAuction);
