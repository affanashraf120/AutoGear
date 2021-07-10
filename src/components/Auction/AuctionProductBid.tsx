import { RunTransaction } from "@react-firebase/database/dist/components/FirebaseDatabaseTransaction";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
    runTransaction: RunTransaction;
};

type BidPrice = {
    bid_amount: number;
};

const AuctionCard = (props: Props) => {
    const { runTransaction } = props;
    const { register, handleSubmit } = useForm<BidPrice>();
    const updateBidPrice = async (price: number) => {
        const response = await runTransaction({
            reducer: (value) => {
                if (price > value) return price;
                else return value;
            },
        });
        console.log(response);
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => {
                    updateBidPrice(data.bid_amount);
                })}
            >
                <input type="number" name="bid_amount" ref={register} min={10000} required={true} />
                <input type="submit" value="Bid" />
            </form>
        </div>
    );
};

export default AuctionCard;
