// react
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
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
import { ICarForm, ICarProduct, IProduct, Transaction } from "~/interfaces/product";
import { IVehicle } from "~/interfaces/vehicle";
import { engineTypes } from "~/custom-server/database/engineTypes";
import { transmissions } from "~/custom-server/database/transmissions";
import { bodyTypes } from "~/custom-server/database/bodyTypes";
import { cities } from "~/custom-server/cities";
import { provinces } from "~/custom-server/provinces";
import cloudinary from "cloudinary";
import { brands } from "~/server/database/brands";
import { attributesGroups } from "~/custom-server/database/product/attributesGroups";
import { IProductAttributesDef } from "~/server/interfaces/product-def";
import { resolveProductAttributesDef } from "~/server/database/products";
import { flatMap } from "lodash";
import { makeIdGenerator, nameToSlug } from "~/server/utils";
import { IReview } from "~/interfaces/review";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
    const user = useUser();
    const [vehicle, setVehicle] = useState<IVehicle>();
    const { register, handleSubmit, errors } = useForm<ICarForm>();
    const [file, setFile] = useState<File | null>(null);
    const [media, setMedia] = useState("");
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            const file = URL.createObjectURL(e.target.files[0]);
            // const file = e.target.files[0];
            setFile(e.target.files[0]);
        }
    };

    const imageUpload = async () => {
        if (file !== null) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "autogear");
            data.append("cloud_name", "autogear");
            const res = await fetch("https://api.cloudinary.com/v1_1/autogear/image/upload", {
                method: "POST",
                body: data,
            });
            const res2 = await res.json();
            return res2.url;
        }
    };

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

    const getNextId = makeIdGenerator();

    const submitHandler = async (data: ICarForm) => {
        const {
            excerpt,
            description,
            transactionType,
            terms,
            interval,
            price,
            color,
            mileage,
            engineType,
            assembly,
            engineDisplacement,
            transmission,
            bodyType,
            registeredCity,
            province,
        } = data;

        try {
            const mediaUrl = await imageUpload();
            const url = mediaUrl.replace("upload", "upload/c_scale,h_800,w_800");
            if (vehicle && user._id) {
                const car: ICarProduct = {
                    ...data,
                    make: vehicle.make,
                    model: vehicle.model,
                    version: vehicle.engine,
                    year: vehicle.year,
                    images: [url],
                    rating: 0,
                    reviews: [],
                    sellerId: user._id,
                    badges: [],
                    isFeatured: false,
                    isApproved: false,
                    isInspected: false,
                    customFields: ["Bumper to bumper original"],
                    postedDate: new Date().toLocaleDateString(),
                };
                axios
                    .post("/api/products/addProduct", { ...car })
                    .then((res) => {
                        console.log(res);
                        toast("Car added successfully.");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };
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
                                    <option value={type.name} key={index}>
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
                                <option value="Local">Local</option>
                                <option value="Imported">Imported</option>
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
                                    <option value={type.name} key={index}>
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
                                    <option value={type.name} key={index}>
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
                                    <option value={type.name} key={index}>
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
                                    <option value={type.name} key={index}>
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
                            <label>Engine Displacement</label>
                            <input
                                type="number"
                                id={`engineDisplacement`}
                                name={`engineDisplacement`}
                                disabled={vehicle === undefined}
                                className={classNames("form-control", {
                                    "is-invalid": errors?.engineDisplacement,
                                })}
                                placeholder={`Enter engineDisplacement`}
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">
                                {errors?.engineDisplacement?.type === "required" && (
                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                )}
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
                                <option value="Cash">Cash</option>
                                <option value="Leased">Leased</option>
                            </select>
                            <div className="invalid-feedback">
                                {errors?.transactionType?.type === "required" && (
                                    <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                )}
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
                                <option value="Month">Month</option>
                                <option value="2 Months">2 Months</option>
                                <option value="3 Month">3 Month</option>
                                <option value="4 Month">4 Month</option>
                                <option value="6 Month">6 Month</option>
                                <option value="Year">Year</option>
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

                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                id={`image`}
                                name={`image`}
                                onChange={handleFileChange}
                                disabled={vehicle === undefined}
                                className={classNames("form-control")}
                                placeholder={`Enter image`}
                            />
                        </div>

                        <img src={file ? URL.createObjectURL(file) : ""} width="100%" />

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
