// react
import React from "react";
// third-party
import classNames from "classnames";
import { FormProvider } from "react-hook-form";
import { FormattedMessage } from "react-intl";
// application
import AppLink from "~/components/shared/AppLink";
import CompatibilityStatusBadge from "~/components/shared/CompatibilityStatusBadge";
import PageTitle from "~/components/shared/PageTitle";
import Rating from "~/components/shared/Rating";
import ProductForm from "~/components/shop/ProductForm";
import ProductGallery, { IProductGalleryLayout } from "~/components/shop/ProductGallery";
import ProductSidebar from "~/components/shop/ProductSidebar";
import ProductTabs from "~/components/shop/ProductTabs";
import { IProductPageLayout, IProductPageSidebarPosition } from "~/interfaces/pages";
import { IProduct } from "~/interfaces/product";
import { useProductForm } from "~/services/forms/product";
import Features from "../Features";
import CarActions from "./CarActions";
import CarInfo from "./CarInfo";
import ProductTagsAndShare from "./ProductTagsAndShare";
import { ICar, ICarPost } from "~/interfaces/custom/car";

interface Props {
    product: ICarPost;
    layout: IProductPageLayout;
    sidebarPosition?: IProductPageSidebarPosition;
}

const CarView = (props: Props) => {
    const { product, layout, sidebarPosition = "start" } = props;
    const galleryLayout = `product-${layout}` as IProductGalleryLayout;
    // const productForm = useProductForm(product);

    if (!product) {
        return null;
    }

    // const featuredAttributes = product.attributes.filter((x) => x.featured);

    return (
        <React.Fragment>
            <PageTitle>{product.car.make}</PageTitle>

            <div className={classNames("block-split", { "block-split--has-sidebar": layout === "sidebar" })}>
                <div className="container">
                    <div className="block-split__row row no-gutters">
                        {/* {layout === "sidebar" && sidebarPosition === "start" && (
                            <div className="block-split__item block-split__item-sidebar col-auto">
                                <ProductSidebar />
                            </div>
                        )} */}

                        <div className="block-split__item block-split__item-content col-auto">
                            <div className={`product product--layout--${layout}`}>
                                <div className="product__body">
                                    <div className="product__card product__card--one" />
                                    <div className="product__card product__card--two" />

                                    <ProductGallery
                                        images={product.images || []}
                                        layout={galleryLayout}
                                        className="product__gallery"
                                    />

                                    <div className="product__header">
                                        <h1 className="product__title">{product.car.make}</h1>
                                        <h3 className="product__title">{product.car.model}</h3>

                                        <div className="product__subtitle">
                                            <div className="product__rating">
                                                <div className="product__rating-stars">
                                                    <Rating value={product.rating || 0} />
                                                </div>
                                                <div className="product__rating-label">
                                                    <AppLink href={{ href: { hash: "product-tab-reviews" } }}>
                                                        <FormattedMessage
                                                            id="TEXT_RATING_LABEL"
                                                            values={{
                                                                rating: product.rating,
                                                                reviews: product.reviews,
                                                            }}
                                                        />
                                                    </AppLink>
                                                </div>
                                            </div>

                                            {/* <CompatibilityStatusBadge className="product__fit" product={product} /> */}
                                        </div>
                                    </div>

                                    {layout === "full" && (
                                        <div className="product__main">
                                            <div className="product__features">
                                                <div className="product__features-title">
                                                    <FormattedMessage id="TEXT_KEY_FEATURES" />:
                                                </div>
                                                <ul>
                                                    <li>
                                                        Year
                                                        {": "}
                                                        {product.car.year.getFullYear()}
                                                    </li>
                                                    <li>
                                                        Engine
                                                        {": "}
                                                        {product.car.engineType.name}
                                                    </li>
                                                    <li>
                                                        Engine Capacity
                                                        {": "}
                                                        {product.car.engineCapacity}cc
                                                    </li>
                                                    <li>
                                                        Mileage
                                                        {": "}
                                                        {product.mileage} km
                                                    </li>
                                                    <li>
                                                        Transmission
                                                        {": "}
                                                        {product.car.transmission.name}
                                                    </li>
                                                </ul>
                                                <div className="product__features-link">
                                                    <AppLink href={{ href: { hash: "product-tab-specification" } }}>
                                                        <FormattedMessage id="LINK_SEE_FULL_SPECIFICATION" />
                                                    </AppLink>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/*------ Car info, actions and features ----------*/}
                                    <div className="product__info">
                                        <div className="product__info-card">
                                            <CarInfo {...product} />
                                            <CarActions {...product} />
                                        </div>

                                        {/* <FormProvider {...productForm.methods}>
                                            <form onSubmit={productForm.submit} className="product__info-card">
                                                <CarInfo {...product} />

                                                {product.options.length > 0 && (
                                                    <ProductForm
                                                        options={product.options}
                                                        className="product__form"
                                                        namespace="options"
                                                    />
                                                )}

                                                <CarActions {...product} />

                                                <ProductTagsAndShare {...product} />
                                            </form>
                                        </FormProvider> */}

                                        <Features />
                                    </div>
                                    {/* ---------------------------------------------------- */}

                                    {/* <ProductTabs className="product__tabs" product={product} layout={layout} /> */}
                                </div>
                            </div>
                        </div>

                        {layout === "sidebar" && sidebarPosition === "end" && (
                            <div className="block-split__item block-split__item-sidebar col-auto">
                                <ProductSidebar />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CarView;
