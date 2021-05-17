import classNames from "classnames";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import PageTitle from "~/components/shared/PageTitle";
import Redirect from "~/components/shared/Redirect";
import axios from "axios";
import AdminAccountLayout from "~/components/account/AdminAccountLayout";
import dbConnect from "~/utils/dbconnnect";
import vehicle from "~/models/vehicle";

type Vehicle = {
    _id: string;
    make: string;
    model: string;
    engine: string;
    year: number | number[];
};

type Props = {
    vehicles: Vehicle[];
};

// export async function getServerSideProps() {
//     try {
//         const response = await axios.get("/api/vehicles");
//         console.log(response);
//         return { props: { vehicles: response.data } };
//     } catch (error) {
//         console.log(error);
//         return { props: {} };
//     }
// }

const Page = () => {
    // const { vehicles } = props;
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        axios
            .get("/api/vehicles")
            .then((res: any) => {
                console.log(res.data.vehicles);
                setVehicles(res.data.vehicles);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="card">
            <div className="card-header">
                <h5>Vehiles</h5>
            </div>
            <div className="card-divider" />
            {vehicles?.map((vehicle: any, index) => {
                return <div key={index} >{vehicle.make}</div>;
            })}
        </div>
    );
};

Page.Layout = AdminAccountLayout;

export default Page;
