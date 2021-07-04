// react
// third-party
import { FirebaseDatabaseNode } from "@react-firebase/database";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Button, Card, CardBody, CardText, CardTitle, Jumbotron } from "reactstrap";
import BlockHeader from "~/components/blocks/BlockHeader";
import BlockMap from "~/components/blocks/BlockMap";
import BlockSpace from "~/components/blocks/BlockSpace";
import PageTitle from "~/components/shared/PageTitle";
import { IProductGalleryLayout } from "~/components/shop/ProductGallery";
import AuctionProductPage from "~/custom/components/Auction/AuctionProductPage";
import Loader from "~/custom/components/Loader";
import { IProduct } from "~/interfaces/product";
import { getRealtimeProductById } from "~/services/firebase";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";

const Page = () => {
    const intl = useIntl();
    const router = useAppRouter();
    const { id } = router.query;

    const breadcrumb = [
        { title: intl.formatMessage({ id: "LINK_HOME" }), url: url.home() },
        { title: "Auction", url: url.auction() },
        { title: `Product`, url: `/auction/${id}` },
    ];

    // const productInfoBody = (
    //
    // );

    const productActions = <div className="product__actions"></div>;

    return (
        <React.Fragment>
            <BlockHeader breadcrumb={breadcrumb} />
            <FirebaseDatabaseNode path={`/${id}`}>
                {({ value, isLoading }) => {
                    return isLoading ? <Loader height="100vh" /> : <AuctionProductPage {...value} />;
                }}
            </FirebaseDatabaseNode>
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
};

export default Page;
