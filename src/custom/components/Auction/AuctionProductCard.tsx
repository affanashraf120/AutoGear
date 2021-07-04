import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import { useAppRouter } from "~/services/router";

type AuctionCar = {
    make: string;
    model: string;
    version: string;
    bid_amount: number;
    images: string[];
};

type Props = {
    product: AuctionCar;
    id: string;
    onClick: (id: string) => void;
};

const AuctionProductCard = (props: Props) => {
    const { make, model, bid_amount, images } = props.product;
    const { onClick, id } = props;

    return (
        <Card style={{ margin: "0.5rem" }}>
            <CardImg top src={images[0]} alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h5">{make}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {make} {model}
                </CardSubtitle>
                {/* <CardText>
                    <CurrencyFormat value={bid_amount} />
                </CardText> */}
                <Button
                    onClick={() => {
                        onClick(id);
                    }}
                >
                    Bid
                </Button>
            </CardBody>
        </Card>
    );
};

export default AuctionProductCard;
