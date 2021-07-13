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
    _id: string;
    make: string;
    model: string;
    price: string;
    status: string;
    productType: string;
    postedDate: string;
};

const headers: Column<TableData>[] = [
    {
        title: "Make",
        field: "make",
    },
    {
        title: "Model",
        field: "model",
    },
    {
        title: "Price",
        field: "price",
    },
    {
        title: "Status",
        field: "status",
    },
    {
        title: "Type",
        field: "productType",
    },
    {
        title: "Date",
        field: "postedDate",
    },
];

function Page() {
    const [data, setData] = useState<TableData[]>([]);
    const { isUserExist, getAuthorizedUser } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(true);
    const history = useAppRouter();

    const handleEdit = (_id: string) => {
        history.push(url.editCar(_id));
    };

    const actions: Action<any>[] = [
        {
            icon: Edit,
            tooltip: "Edit Post",
            onClick: (event, data) => {
                handleEdit(data._id);
            },
        },
    ];

    const handleDelete = (data: any) =>
        UserAuthService.deletePost(data._id)
            .then((responseData) => {
                console.log(responseData);
                getUserCars();
            })
            .catch((error) => {
                console.log(error.response);
            });

    const getUserCars = () => {
        const user = getAuthorizedUser();
        if (user) {
            setDataFetched(false);
            UserAuthService.getPosts(user._id)
                .then((responseData) => {
                    const products = responseData.data;
                    const tableRecods: TableData[] = products.map((product: any) => {
                        const { isFeatured, isApproved } = product;
                        let status = isApproved ? "Approved" : "Not Approved";
                        let productType = isFeatured ? "Featured" : "Post";
                        const record: TableData = {
                            _id: product._id,
                            make: product.make,
                            model: product.model,
                            price: product.price,
                            status: status,
                            productType: productType,
                            postedDate: product.postedDate,
                        };
                        return record;
                    });
                    console.log(responseData);
                    setDataFetched(true);
                    setData(tableRecods);
                })
                .catch((error) => {
                    console.log(error.response);
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
            <PageTitle>My Posts</PageTitle>
            <DataTable
                actions={actions}
                onRowDelete={handleDelete}
                loading={!dataFetched}
                title="My Posts"
                columns={headers}
                data={data}
            />
        </div>
    );
}

Page.Layout = AccountLayout;

export default Page;
