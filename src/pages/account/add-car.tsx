// react
import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
// third-party
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import { fill, flatMap } from "lodash";
import { makeIdGenerator, nameToSlug } from "~/server/utils";
import { IReview } from "~/interfaces/review";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { ConnectionStates } from "mongoose";
import ImageUploader from "~/custom/components/ImageUploader/ImageUploader";
import TransactionFormGroup from "~/custom/components/CarFormElements/TransactionFormGroup";
import SelectionsFormGroup from "~/custom/components/CarFormElements/SelectionsFormGroup";
import DescriptionFormGroup from "~/custom/components/CarFormElements/DescriptionFormGroup";
import EngineFormGroup from "~/custom/components/CarFormElements/EngineFormGroup";

const minimumChars = 200;
const maximumChars = 1000;

const Page = () => {
    const user = useUser();
    const [vehicle, setVehicle] = useState<IVehicle>();
    const methods = useForm<ICarForm>();
    const [intervalError, setIntervalError] = useState<boolean>(false);
    const { register, handleSubmit, errors, control } = methods;
    const [file, setFile] = useState<File | null>(null);
    const [modal, setModal] = useState(false);
    const descriptionCount = useRef<HTMLElement>(null);
    const vehicleSelect = useRef<HTMLDivElement>(null);

    const imageUpload = async (file:File) => {
        if (file !== null) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "products");
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

    // if (!user?.phone) {
    //     return <Redirect href={url.accountProfile()} />;
    // }

    const submitHandler = async (data: ICarForm) => {
        if (data.transactionType === "Leased" && (!data.interval || !data.terms)) {
            setIntervalError(true);
            console.log(data.interval, data.terms);
            return;
        }
        if (data.images) console.log(data);
        // try {
        //     console.log(data);
        //     const mediaUrl = await imageUpload();
        //     const url = mediaUrl.replace("upload", "upload/c_scale,h_800,w_800");
        //     if (vehicle && user && user._id) {
        //         const car: ICarProduct = {
        //             ...data,
        //             make: vehicle.make,
        //             model: vehicle.model,
        //             version: vehicle.engine,
        //             year: vehicle.year,
        //             images: [url],
        //             rating: 0,
        //             reviews: [],
        //             sellerId: user._id,
        //             badges: [],
        //             isFeatured: false,
        //             isApproved: false,
        //             isInspected: false,
        //             customFields: ["Bumper to bumper original"],
        //             postedDate: new Date().toLocaleDateString(),
        //         };
        //         axios
        //             .post("/api/products/addProduct", { ...car })
        //             .then((res) => {
        //                 console.log(res);
        //                 toast("Car added successfully.");
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //             });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
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
                    <VehicleSelect
                        style={{ height: "auto" }}
                        className={classNames("form-control", {
                            "is-invalid": !vehicle,
                        })}
                        onVehicleChange={handleVehicleChange}
                    />
                    <div className="invalid-feedback">Select vehicle</div>
                    <FormProvider {...methods}>
                        <form className="col-12 col-lg-12 col-xl-12" onSubmit={handleSubmit(submitHandler)}>
                            <DescriptionFormGroup disabled={vehicle === undefined} />

                            <EngineFormGroup disabled={vehicle === undefined} />

                            <SelectionsFormGroup disabled={vehicle === undefined} />

                            <TransactionFormGroup disabled={vehicle === undefined} error={intervalError} />

                            <div className="form-group">
                                <Controller
                                    as={(controllerProps) => (
                                        <ImageUploader
                                            className={classNames("form-control", {
                                                "is-invalid": errors?.images,
                                            })}
                                            onChange={controllerProps.onChange}
                                        />
                                    )}
                                    name="images"
                                    control={control}
                                    rules={{ required: "Images is required" }}
                                />
                                <div className="invalid-feedback">{errors?.images && "Add images of your car"}</div>
                            </div>

                            <div className="form-group mb-0 pt-3 mt-3">
                                <button
                                    type="submit"
                                    className={classNames("btn", "btn-primary", "mt-3", {
                                        "btn-loading": false,
                                    })}
                                >
                                    <FormattedMessage id="BUTTON_SAVE" />
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

Page.Layout = AccountLayout;

export default Page;
