import { RunMutation } from "@react-firebase/database/dist/components/FirebaseDatabaseMutation";
import classNames from "classnames";
import { values } from "lodash";
import React, { useState } from "react";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import VehicleSelect from "~/components/shared/VehicleSelect";
import DescriptionFormGroup from "~/custom/components/CarFormElements/DescriptionFormGroup";
import EngineFormGroup from "~/custom/components/CarFormElements/EngineFormGroup";
import SelectionsFormGroup from "~/custom/components/CarFormElements/SelectionsFormGroup";
import ImageUploader from "~/custom/components/ImageUploader/ImageUploader";
import { ICarForm } from "~/interfaces/product";
import { IVehicle } from "~/interfaces/vehicle";
import Loader from "~/custom/components/Loader";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";
import DateTimePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

type Props = {
    runMutation: RunMutation;
};
interface AuctionFormData extends ICarForm {
    images: File[];
    endDate: string;
}

const Page = (props: Props) => {
    const [vehicle, setVehicle] = useState<IVehicle>();
    const methods = useForm<AuctionFormData>();
    const { register, handleSubmit, errors, control } = methods;
    const { runMutation } = props;
    const [loading, setLoading] = useState(false);
    const { invalidNumberInput, handleChange } = useInputNumberValidation({
        allowLeadingZero: false,
        limit: 100000000,
    });

    const uploadImage = (file: File): Promise<string> => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "auction_products");
        data.append("cloud_name", "autogear");
        return fetch("https://api.cloudinary.com/v1_1/autogear/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((res) => res.url);
    };

    const startLoading = () => {
        setLoading(true);
    };

    const stopLoading = () => {
        setLoading(false);
    };

    const handleVehicleChange = (vehicle: IVehicle | null) => {
        if (vehicle !== null) setVehicle(vehicle);
    };

    const submitHandler = (data: AuctionFormData) => {
        startLoading();
        let promises: Promise<string>[] = [];
        data.images.forEach((image) => promises.push(uploadImage(image)));
        Promise.all([...promises])
            .then((values) => {
                console.log("Images", values);
                runMutation({ ...data, bid_amount: 0, images: [...values], ...vehicle })
                    .then((res) => {
                        stopLoading();
                        toast.success("Car added to auction successfully");
                    })
                    .catch((err) => {
                        console.log(err);
                        stopLoading();
                        toast.error("Car not  added!\nServer error");
                    });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Images not uploaded successfully");
                stopLoading();
            });
    };

    return (
        <>
            {!loading && (
                <VehicleSelect
                    style={{ height: "auto" }}
                    className={classNames("form-control", {
                        "is-invalid": !vehicle,
                    })}
                    onVehicleChange={handleVehicleChange}
                />
            )}
            <div className="invalid-feedback">Select vehicle</div>
            <FormProvider {...methods}>
                <form className="col-12 col-lg-12 col-xl-12" onSubmit={handleSubmit(submitHandler)}>
                    {loading ? (
                        <Loader height="500px" />
                    ) : (
                        <>
                            <DescriptionFormGroup disabled={vehicle === undefined} />

                            <EngineFormGroup disabled={vehicle === undefined} />

                            <SelectionsFormGroup disabled={vehicle === undefined} />

                            <div className="form-group">
                                <label>Reserved Price</label>
                                <input
                                    type="number"
                                    id={`price`}
                                    name={`price`}
                                    disabled={vehicle === undefined}
                                    className={classNames("form-control", {
                                        "is-invalid": errors?.price,
                                    })}
                                    placeholder={`Enter Price`}
                                    ref={register({ required: true })}
                                    onKeyPress={(e) => {
                                        invalidNumberInput(e.key) && e.preventDefault();
                                    }}
                                    onChange={handleChange()}
                                />
                                <div className="invalid-feedback">
                                    {errors?.price?.type === "required" && (
                                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Auction End Date</label>
                                <Controller
                                    render={({ onChange }) => (
                                        <DateTimePicker
                                            className={classNames({
                                                "is-invalid": errors?.endDate,
                                            })}
                                            onChange={(value) => {
                                                const date = moment(value.toLocaleString());
                                                console.log(date.toISOString());
                                                onChange(date.toISOString());
                                            }}
                                        />
                                    )}
                                    name="endDate"
                                    rules={{ required: true }}
                                />
                                <div className="invalid-feedback">{errors?.endDate && "Date and time required"}</div>
                            </div>

                            <div className="form-group">
                                <Controller
                                    render={({ onChange }) => (
                                        <ImageUploader
                                            className={classNames("form-control", {
                                                "is-invalid": errors?.images,
                                            })}
                                            onChange={onChange}
                                        />
                                    )}
                                    name="images"
                                    // control={control}
                                    rules={{ required: "Images is required" }}
                                />
                                <div className="invalid-feedback">{errors?.images && "Add images of your car"}</div>
                            </div>
                        </>
                    )}

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
        </>
    );
};

export default Page;
