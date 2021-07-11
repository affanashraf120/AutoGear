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
import { NextPageContext } from "next";
import { getHostUrl } from "~/services/utils";
import { isAuthorized } from "~/utils/user";
import Loader from "~/custom/components/Loader";
import { getUserFromToken, isUserLoggedIn, setUserAuthToken } from "~/utils/auth";
import useAuthorizedUser from "~/custom/hooks/useAuthorizedUser";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControl, FormGroup, FormLabel } from "@material-ui/core";
import UserAuthService from "~/api-services/userService/UserAuthService";
import EmailService from "~/api-services/EmailService";

const minimumChars = 200;
const maximumChars = 1000;

interface CarFormData extends ICarForm {
    images: File[];
}

const Page = () => {
    const [vehicle, setVehicle] = useState<IVehicle>();
    const methods = useForm<CarFormData>();
    const [intervalError, setIntervalError] = useState<boolean>(false);
    const { register, handleSubmit, errors, control } = methods;
    const [file, setFile] = useState<File | null>(null);
    const [modal, setModal] = useState(false);
    const descriptionCount = useRef<HTMLElement>(null);
    const vehicleSelect = useRef<HTMLDivElement>(null);
    const { isUserExist, getAuthorizedUser } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const history = useAppRouter();
    const [isFeatured, setIsFeatured] = useState(false);

    const NEW_BADGE = "new";
    const FEATURED = "featured";

    useEffect(() => {
        if (!isUserExist()) {
            history.push(url.signIn());
        } else setLoading(false);
    }, []);

    const imageUpload = async (file: File) => {
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

    const getImageUrls = (files: File[]) => {
        let promises: Promise<string>[] = [];
        files.forEach((file) => {
            promises.push(imageUpload(file));
        });

        return Promise.all([...promises]);
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

    const submitHandler = async (data: CarFormData) => {
        if (data.transactionType === "Leased" && (!data.interval || !data.terms)) {
            setIntervalError(true);
            return;
        }
        setLoading(true);
        const user = getAuthorizedUser();
        user &&
            vehicle &&
            getImageUrls(data.images)
                .then((urls: string[]) => {
                    let badges = [];
                    isFeatured && badges.push(FEATURED);
                    const { id, engine, ...rest } = vehicle;
                    const { images, ...customData } = data;
                    const car: ICarProduct = {
                        ...customData,
                        ...rest,
                        version: engine,
                        images: [...urls],
                        rating: 0,
                        reviews: [],
                        sellerId: user._id,
                        badges: badges,
                        isFeatured: isFeatured ? true : false,
                        isApproved: false,
                        isAutoGear: false,
                        postedDate: new Date().toLocaleDateString(),
                    };
                    UserAuthService.addPost(car)
                        .then((responseData) => {
                            console.log(responseData);
                            setLoading(false);
                            setIsFeatured(false);
                            toast.success("Post created successfully");
                            if (isFeatured) {
                                EmailService.postConfirmation(user.email, user.fullName);
                                EmailService.featuredAd(user.email);
                            } else {
                                EmailService.postConfirmation(user.email, user.fullName);
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 429) {
                                console.log(error.response);
                                if (error.response.data.data.dayPosts) toast.error("Posts limit exeeded for today");
                                if (error.response.data.data.monthPosts) toast.error("Monthly post limit exeeded");
                            } else toast.error("Server error");
                            setLoading(false);
                            setIsFeatured(false);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    toast.error("Images not uploaded successfully");
                });
    };

    return loading ? (
        <Loader />
    ) : (
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
                    <div className="form-group">
                        <input
                            style={{ width: "1rem", cursor: "pointer", backgroundColor: "green" }}
                            checked={isFeatured}
                            type="checkbox"
                            onChange={() => {
                                isFeatured ? setIsFeatured(false) : setIsFeatured(true);
                            }}
                        />
                        <label style={{ margin: "1rem", color: "green" }}>Featured</label>
                    </div>
                    <FormProvider {...methods}>
                        <form className="col-12 col-lg-12 col-xl-12" onSubmit={handleSubmit(submitHandler)}>
                            <DescriptionFormGroup disabled={vehicle === undefined} />

                            <EngineFormGroup disabled={vehicle === undefined} />

                            <SelectionsFormGroup disabled={vehicle === undefined} />

                            <TransactionFormGroup disabled={vehicle === undefined} error={intervalError} />

                            <div className="form-group">
                                <Controller
                                    render={({onChange}) => (
                                        <ImageUploader
                                            className={classNames("form-control", {
                                                "is-invalid": errors?.images,
                                            })}
                                            onChange={onChange}
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
                                        "btn-loading": loading,
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
