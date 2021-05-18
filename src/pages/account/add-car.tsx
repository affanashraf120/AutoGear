// react
import React, { useEffect, useState } from "react";
// third-party
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
// application
import AccountLayout from "~/components/account/AccountLayout";
import AddressForm, { getAddressFormDefaultValue, IAddressForm } from "~/components/shared/AddressForm";
import Checkbox from "~/components/shared/Checkbox";
import PageTitle from "~/components/shared/PageTitle";
import url from "~/services/url";
import { accountApi } from "~/api";
import { IAddress } from "~/interfaces/address";
import { IEditAddressData } from "~/api/base";
import { useAppRouter } from "~/services/router";
import { useAsyncAction } from "~/store/hooks";
import CustomProductForm from "~/components/shared/CustomProductForm";
import VehicleSelect from "~/components/shared/VehicleSelect";
import { useUser } from "~/store/user/userHooks";
import Redirect from "~/components/shared/Redirect";
import { IProduct } from "~/interfaces/product";
import { IVehicle } from "~/interfaces/vehicle";
import { engineTypes } from "~/custom-server/database/engineTypes";
import { transmissions } from "~/custom-server/database/transmissions";
import { bodyTypes } from "~/custom-server/database/bodyTypes";
import { cities } from "~/custom-server/cities";
import { provinces } from "~/custom-server/provinces";

type ICarForm = {
    excerpt: string; //
    description: string; //
    // images: string[];
    transactionType: string;//
    terms?: string;//
    interval?: string;//
    price: string; //
    color: string; //
    mileage: number; //
    engineType: string; //
    assembly: string; //
    engineDisplacement: number;
    transmission: string; //
    bodyType: string; //
    registeredCity: string; //
    province: string;//
};

const Page = () => {
    const user = useUser();
    const [vehicle, setVehicle] = useState<IVehicle>();
    const { register, handleSubmit, errors } = useForm<ICarForm>();

    const handleVehicleChange = (vehicle: IVehicle | null) => {
        if (vehicle !== null) setVehicle(vehicle);
    };

    const getDropList = () => {
        const year = new Date().getFullYear() - 21;
        return Array.from(new Array(22), (v, i) => (
            <option key={i} value={year + i}>
                {year + i}
            </option>
        ));
    };

    if (!user?.phone) {
        return <Redirect href={url.accountProfile()} />;
    }

    const submitHandler = (data: any) => {};
    return (
        <div className="card">
            <PageTitle>Add New Car</PageTitle>

            <div className="card-header">
                <h5>Add Car</h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
                <div className="row no-gutters">
                    <VehicleSelect onVehicleChange={handleVehicleChange} />
                    <form className="col-12 col-lg-10 col-xl-8" onSubmit={handleSubmit(submitHandler)}>
                        <div className="form-group">
                            <label>Excerpt</label>
                            <input
                                type="text"
                                id={`excerpt`}
                                name={`excerpt`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.excerpt,
                                })}
                                placeholder={`Enter excerpt`}
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">
                                {errors?.excerpt?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="textarea"
                                id={`description`}
                                name={`description`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.description,
                                })}
                                placeholder={`Enter description`}
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">
                                {errors?.description?.type === "required" && (
                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Mileage</label>
                            <input
                                type="number"
                                id={`mileage`}
                                name={`mileage`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.mileage,
                                })}
                                placeholder={`Enter mileage`}
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">
                                {errors?.description?.type === "required" && (
                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Engine Type</label>
                            <select
                                id={`engineType`}
                                name={`engineType`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.engineType,
                                })}
                                placeholder={`Enter engineType`}
                                ref={register({ required: true })}
                            >
                                {engineTypes.map((type, index) => (
                                    <option value={type.slug} key={index}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.engineType?.type === "required" && (
                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Assembly</label>
                            <select
                                id={`assembly`}
                                name={`assembly`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.assembly,
                                })}
                                placeholder={`Enter assembly`}
                                ref={register({ required: true })}
                            >
                                <option value="local">Local</option>
                                <option value="imported">Imported</option>
                            </select>
                            <div className="invalid-feedback">
                                {errors?.assembly?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Transmission</label>
                            <select
                                id={`transmission`}
                                name={`transmission`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.transmission,
                                })}
                                placeholder={`Enter transmission`}
                                ref={register({ required: true })}
                            >
                                {transmissions.map((type, index) => (
                                    <option value={type.slug} key={index}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.transmission?.type === "required" && (
                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Body Type</label>
                            <select
                                id={`bodyType`}
                                name={`bodyType`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.transmission,
                                })}
                                placeholder={`Enter transmission`}
                                ref={register({ required: true })}
                            >
                                {bodyTypes.map((type, index) => (
                                    <option value={type.slug} key={index}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.bodyType?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Registered City</label>
                            <select
                                id={`registeredCity`}
                                name={`registeredCity`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.registeredCity,
                                })}
                                placeholder={`Enter registeredCity`}
                                ref={register({ required: true })}
                            >
                                {cities.map((type, index) => (
                                    <option value={type.slug} key={index}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.registeredCity?.type === "required" && (
                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Province</label>
                            <select
                                id={`province`}
                                name={`province`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.province,
                                })}
                                placeholder={`Enter province`}
                                ref={register({ required: true })}
                            >
                                {provinces.map((type, index) => (
                                    <option value={type.slug} key={index}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.province?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Color</label>
                            <input
                                type="textarea"
                                id={`color`}
                                name={`color`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.color,
                                })}
                                placeholder={`Enter color`}
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">
                                {errors?.color?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Price/Leased price</label>
                            <input
                                type="number"
                                id={`price`}
                                name={`price`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.price,
                                })}
                                placeholder={`Enter price`}
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">
                                {errors?.price?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Transaction Type</label>
                            <select
                                id={`transactionType`}
                                name={`transactionType`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.transactionType,
                                })}
                                placeholder={`Enter transactionType`}
                                ref={register({ required: true })}
                            >
                                <option value="cash">Cash</option>
                                <option value="leased">Leased</option>
                            </select>
                            <div className="invalid-feedback">
                                {errors?.transactionType?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Interval</label>
                            <select
                                id={`interval`}
                                name={`interval`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.interval,
                                })}
                                placeholder={`Enter interval`}
                            >
                                <option value=""></option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Terms</label>
                            <input
                                type="number"
                                id={`terms`}
                                name={`terms`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.terms,
                                })}
                                placeholder={`Enter terms`}
                            />
                        </div>

                        {/* <div className="form-group">
                            <label>Image</label>
                            <input
                                type="file"
                                id={`image`}
                                name={`image`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.im,
                                })}
                                placeholder={`Enter image`}
                            />
                        </div> */}


                        <div className="form-group mb-0 pt-3 mt-3">
                            <button type="submit" className={classNames("btn", "btn-primary")}>
                                <FormattedMessage id="BUTTON_SAVE" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Page.Layout = AccountLayout;

export default Page;
