import { FirebaseDatabaseNode } from "@react-firebase/database";
import "firebase/database";
import React from "react";
import { useIntl } from "react-intl";
import { Col, Container, Row } from "reactstrap";
import BlockHeader from "~/components/blocks/BlockHeader";
import BlockSpace from "~/components/blocks/BlockSpace";
import PageTitle from "~/components/shared/PageTitle";
import Timer from "~/components/shared/Timer";
import AuctionProductCard from "~/components/Auction/AuctionProductCard";
import Loader from "~/custom/components/Loader";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";

const Auction = () => {
    const intl = useIntl();
    const router = useAppRouter();

    const breadcrumb = [
        { title: intl.formatMessage({ id: "LINK_HOME" }), url: url.home() },
        { title: `Auction`, url: url.auction() },
    ];

    return (
        <div>
            <PageTitle>Auction</PageTitle>
            <BlockHeader breadcrumb={breadcrumb} />
            <FirebaseDatabaseNode path="/" limitToFirst={12}>
                {(element) => {
                    return element.isLoading ? (
                        <Loader />
                    ) : (
                        <Container>
                            <div
                                style={{
                                    margin: "1rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Timer time={3 * 24 * 60 * 60} />
                            </div>
                            <Row noGutters>
                                {element.value &&
                                    Object.entries(element.value).map(([key, value], index) => (
                                        <Col xs="12" md="6" lg="4" xl="3" key={index}>
                                            <AuctionProductCard
                                                product={element.value[key]}
                                                onClick={(id: string) => {
                                                    router.push(`/auction/${id}`);
                                                }}
                                                id={key}
                                            />
                                        </Col>
                                    ))}
                            </Row>
                        </Container>
                    );
                }}
            </FirebaseDatabaseNode>

            <BlockSpace layout="before-footer" />
        </div>
    );
};

export default Auction;
