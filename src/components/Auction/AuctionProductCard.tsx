import { CardActions, CardContent, Icon, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, CardFooter } from "reactstrap";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import useTime from "~/custom/hooks/useTime";
import { useAppRouter } from "~/services/router";
import Redirect from "../shared/Redirect";
import Timer from "../shared/Timer";

type AuctionCar = {
    make: string;
    model: string;
    engine: string;
    bid_amount: number;
    engineDisplacement: string;
    bodyType: string;
    images: string[];
    endDate: string;
};

type Props = {
    product: AuctionCar;
    id: string;
    onClick: (id: string) => void;
};

const AuctionProductCard = (props: Props) => {
    const { make, model, bid_amount, images, bodyType, engine, engineDisplacement, endDate } = props.product;
    const { onClick, id } = props;
    const { seconds } = useTime({
        endDate,
    });
    const [timeCompelete, setTimeCompelete] = useState(false);

    return (
        <Card style={{ margin: "0.5rem" }}>
            <CardImg top height="150px" src={images[0]} alt="Card image cap" />
            <CardBody>
                <CardTitle style={{ fontSize: "16px" }} tag="h5">
                    {make} {model}
                </CardTitle>
                <CardSubtitle tag="h6" style={{ fontSize: "12px" }} className="mb-2 text-muted">
                    {make} {model} {engine}
                </CardSubtitle>
                <CardText className="mb-2 text-muted">Displacement: {engineDisplacement}</CardText>
                <CardText className="mb-2 text-muted">Body: {bodyType}</CardText>
                <CardText className="mb-1" style={{ fontWeight: "bold" }}>
                    Bid: <CurrencyFormat value={bid_amount} />
                </CardText>
            </CardBody>
            <CardFooter>
                <CardActions style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "100%" }}>
                        {!timeCompelete && (
                            <Timer
                                time={seconds}
                                onCompelete={() => {
                                    if (!timeCompelete) setTimeCompelete(true);
                                }}
                            />
                        )}
                    </div>
                    <IconButton
                        onClick={() => {
                            onClick(id);
                        }}
                        style={{ alignSelf: "flex-start", marginTop: "10px" }}
                    >
                        {!timeCompelete ? (
                            <img src="images/bid.png" alt="bid" height="50px" width="50px" />
                        ) : (
                            <img height="50px" width="40px" alt="Closed" src="images/close.png" />
                        )}
                    </IconButton>
                </CardActions>
            </CardFooter>
        </Card>
    );
};

export default AuctionProductCard;
