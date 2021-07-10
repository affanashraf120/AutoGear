// react
// third-party
import { FirebaseDatabaseNode } from "@react-firebase/database";
import React from "react";
import { useIntl } from "react-intl";
import BlockHeader from "~/components/blocks/BlockHeader";
import BlockSpace from "~/components/blocks/BlockSpace";
import PageTitle from "~/components/shared/PageTitle";
import AuctionProductPage from "~/components/Auction/AuctionProductPage";
import Loader from "~/custom/components/Loader";
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

    return (
        <React.Fragment>
            <PageTitle>Car Auction</PageTitle>
            <BlockHeader breadcrumb={breadcrumb} />
            <FirebaseDatabaseNode path={`/${id}`}>
                {({ value, isLoading }) => {
                    return isLoading && value !== undefined ? (
                        <Loader height="100vh" />
                    ) : (
                        <AuctionProductPage {...value} productId={id} />
                    );
                }}
            </FirebaseDatabaseNode>
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
};

export default Page;
