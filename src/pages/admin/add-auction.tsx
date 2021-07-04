// react
// third-party
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import React from "react";
import AdminAccountLayout from "~/components/account/AdminAccountLayout";
import PageTitle from "~/components/shared/PageTitle";
import AuctionForm from "~/custom/components/Auction/AuctionForm";

const Page = () => {
    return (
        <div className="card">
            <PageTitle>Add New Car</PageTitle>

            <div className="card-header">
                <h5>Add Car</h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
                <div className="row no-gutters">
                    <FirebaseDatabaseMutation type="push" path="/">
                        {({ runMutation }) => <AuctionForm runMutation={runMutation} />}
                    </FirebaseDatabaseMutation>
                </div>
            </div>
        </div>
    );
};

Page.Layout = AdminAccountLayout;

export default Page;
