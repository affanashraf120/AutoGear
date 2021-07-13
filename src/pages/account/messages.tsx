// react
import { Edit } from "@material-ui/icons";
import { Action, Column } from "material-table";
import React, { useEffect, useState } from "react";
import UserAuthService from "~/api-services/userService/UserAuthService";
// application
import AccountLayout from "~/components/account/AccountLayout";
import PageTitle from "~/components/shared/PageTitle";
import DataTable from "~/custom/components/CustomTable/DataTable";
import Loader from "~/custom/components/Loader";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";

type TableData = {
    message: string;
    email: string;
};

const headers: Column<TableData>[] = [
    {
        title: "Message",
        field: "message",
    },
    {
        title: "Email",
        field: "email",
    },
];

function Page() {
    const [data, setData] = useState<TableData[]>([]);
    const { isUserExist, getAuthorizedUser } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(false);
    const history = useAppRouter();

    const handleEdit = (_id: string) => {
        history.push(url.editCar(_id));
    };

    const getUserCars = () => {
        const user = getAuthorizedUser();
        if (user) {
            setDataFetched(false);
            UserAuthService.getMessages(user._id)
                .then((responseData) => {
                    console.log(responseData.data);
                    const tableData: TableData[] = responseData.data.map((record: any) => ({
                        email: record.email,
                        message: record.message,
                    }));
                    setData(tableData);
                    setDataFetched(true);
                })
                .catch((error) => {
                    console.log(error);
                    setDataFetched(true);
                });
        }
    };

    useEffect(() => {
        if (!isUserExist()) {
            history.push(url.signIn());
        } else setLoading(false);
        getUserCars();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className="card">
            <PageTitle>Messages</PageTitle>
            <DataTable loading={!dataFetched} title="My Posts" columns={headers} data={data} />
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;
