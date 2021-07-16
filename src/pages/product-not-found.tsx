// react
import React, { useEffect, useState } from "react";
// application
import AppLink from "~/components/shared/AppLink";
import BlockSpace from "~/components/blocks/BlockSpace";
import PageTitle from "~/components/shared/PageTitle";
import url from "~/services/url";
import BlockProductsCarousel from "~/components/blocks/BlockProductsCarousel";
import { useIntl } from "react-intl";
import { IProduct } from "~/interfaces/product";
import { shopApi } from "~/api";

function SitePageNotFound() {
    const intl = useIntl();
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        let canceled = false;

        shopApi.getRelatedProducts("", 8).then((result) => {
            if (canceled) {
                return;
            }

            setRelatedProducts(result);
        });

        return () => {
            canceled = true;
        };
    }, []);
    return (
        <React.Fragment>
            <PageTitle>Product Not Found</PageTitle>

            <BlockSpace layout="spaceship-ledge-height" />

            <div className="block">
                <div className="container">
                    <div className="not-found">
                        <div className="not-found__content">
                            <h1 className="not-found__title">Product Not Found</h1>
                            <p className="not-found__text">Or go to the home page to start over.</p>
                        </div>
                    </div>
                    {relatedProducts.length > 0 && (
                        <React.Fragment>
                            <BlockSpace layout="divider-nl" />

                            <BlockProductsCarousel
                                blockTitle={intl.formatMessage({ id: "HEADER_RELATED_PRODUCTS" })}
                                products={relatedProducts}
                                layout={"grid-5"}
                            />
                        </React.Fragment>
                    )}
                </div>
            </div>
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default SitePageNotFound;
