import classNames from "classnames";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import PageTitle from "~/components/shared/PageTitle";
import Redirect from "~/components/shared/Redirect";
import axios from "axios";
import AdminAccountLayout from "~/components/account/AdminAccountLayout";

type IVehicleForm = {
    from: number;
    to: number;
    make: string;
    model: string;
    engine: string;
};

const Page = () => {
    const { register, handleSubmit, errors } = useForm<IVehicleForm>();

    const getYearsTillNow = (startYear: number): number[] => {
        const year = new Date().getFullYear();
        const years = Array.from(new Array(20), (val, index) => index + year);
        return years;
    };

    const getDropList = () => {
        const year = new Date().getFullYear() - 21;
        return Array.from(new Array(22), (v, i) => (
            <option key={i} value={year + i}>
                {year + i}
            </option>
        ));
    };

    const onSubmit = (data: IVehicleForm) => {
        console.log(data)
        const startTime = data.from
        const endTime = data.to
        let year;
        if (startTime === endTime) {
            year = [startTime];
        } else {
            year = [startTime, endTime];
        }
        const vehicle = {
            make: data.make,
            model: data.model,
            engine: data.engine,
            year,
        };
        //
        axios
            .post("/api/vehicles", { ...vehicle })
            .then((res) => {
                console.log(res);
                alert("Vehicle added successfully.")
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    return (
        <div className="card">
            <PageTitle>Add Vehicle</PageTitle>

            <div className="card-header">
                <h5>Add Vehicle</h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
                <form className="col-12" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group ">
                        <label>Make</label>
                        <input
                            type="text"
                            id="make"
                            name="make"
                            className={classNames("form-control", {
                                "is-invalid": errors?.make,
                            })}
                            placeholder={`Enter brand name here..`}
                            ref={register({ required: true })}
                        />
                    </div>

                    <div className="form-group ">
                        <label>Model</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            className={classNames("form-control", {
                                "is-invalid": errors?.model,
                            })}
                            placeholder={`Enter model name here..`}
                            ref={register({ required: true })}
                        />
                    </div>

                    <div className="form-group ">
                        <label>Version</label>
                        <input
                            type="text"
                            id="engine"
                            name="engine"
                            className={classNames("form-control", {
                                "is-invalid": errors?.engine,
                            })}
                            placeholder={`Enter engine type detail here..`}
                            ref={register({ required: true })}
                        />
                    </div>

                    <div className="form-group ">
                        <label>Years</label>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div className="form-group">
                            <label>From</label>
                                <select
                                    name="from"
                                    id="from"
                                    className={classNames("form-control", {
                                        "is-invalid": errors?.from,
                                    })}
                                    ref={register({ required: true })}
                                >
                                    {getDropList()}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>To</label>
                                <select
                                    name="to"
                                    id="to"
                                    className={classNames("form-control", {
                                        "is-invalid": errors?.from,
                                    })}
                                    ref={register({ required: true })}
                                >
                                    {getDropList()}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-0 pt-3 mt-3">
                        <button type="submit" className={classNames("btn", "btn-primary")}>
                            <FormattedMessage id="BUTTON_SAVE" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

Page.Layout = AdminAccountLayout;

export default Page;
