// react
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import ProductService from "~/api-services/ProductService";
import UserAuthService from "~/api-services/userService/UserAuthService";
// application
import AccountLayout from "~/components/account/AccountLayout";
import PageTitle from "~/components/shared/PageTitle";
import Redirect from "~/components/shared/Redirect";
import DescriptionFormGroup from "~/custom/components/CarFormElements/DescriptionFormGroup";
import TransactionFormGroup from "~/custom/components/CarFormElements/TransactionFormGroup";
import Loader from "~/custom/components/Loader";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";

type EditFormData = {
    excerpt: string;
    description: string;
    price: number;
    transactionType: string;
    terms?: number;
    interval?: string;
    mileage: number;
};

const Page = () => {
    const router = useAppRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState<any>();
    const methods = useForm<EditFormData>();
    const [intervalError, setIntervalError] = useState<boolean>(false);
    const { handleSubmit, errors, control, register } = methods;
    const { isUserExist, getAuthorizedUser } = useAuthContext();
    const mileageValidation = useInputNumberValidation({ allowLeadingZero: false, limit: 200000 });
    const [loading, setLoading] = useState(true);
    const history = useAppRouter();

    useEffect(() => {
        //Authorization
        if (!isUserExist()) {
            history.push(url.signIn());
        }
        //Product
        if (productId) {
            ProductService.getProductById(`${productId}`)
                .then((responseData) => {
                    console.log(responseData.data);
                    setProduct(responseData.data);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("Product Not Found");
                    console.log(error.response);
                    history.push(url.accountDashboard());
                });
        } else {
            history.push(url.accountDashboard());
        }
    }, []);

    const submitHandler = async (data: EditFormData) => {
        if (data.transactionType === "Leased" && (!data.interval || !data.terms)) {
            setIntervalError(true);
            return;
        }
        setLoading(true);
        //API CALL WITH PRODUCTID IN REQUEST BODY
        UserAuthService.editPost({ productId, ...data })
            .then((responseData) => {
                console.log(responseData);
                setProduct(responseData.data);
                toast.success("Product Updated");
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.success("Server Error");
                console.log(error.response);
            });
    };

    if (!productId) {
        return <Redirect href={url.accountDashboard()} />;
    }

    return loading ? (
        <Loader />
    ) : (
        <div className="card">
            <PageTitle>Edit Post</PageTitle>

            <div className="card-header">
                <h5>
                    Edit Post ({product.make}{" "}
                    {product.model}{" "}
                    {product.version})
                </h5>
            </div>
            <div className="card-divider" />

            <div className="card-body card-body--padding--2">
                <div className="row no-gutters">
                    <FormProvider {...methods}>
                        <form className="col-12 col-lg-12 col-xl-12" onSubmit={handleSubmit(submitHandler)}>
                            <div className="form-group">
                                <label>Mileage (KM)</label>
                                <input
                                    type="number"
                                    id={`mileage`}
                                    name={`mileage`}
                                    defaultValue={product?.mileage}
                                    min={1}
                                    className={classNames("form-control", {
                                        "is-invalid": errors?.mileage,
                                    })}
                                    placeholder={`Enter mileage`}
                                    ref={register({ required: true })}
                                    onKeyPress={(e) => {
                                        mileageValidation.invalidNumberInput(e.key) && e.preventDefault();
                                    }}
                                    onChange={mileageValidation.handleChange()}
                                />
                                <div className="invalid-feedback">
                                    {errors?.mileage?.type === "required" && (
                                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                    )}
                                </div>
                            </div>

                            <DescriptionFormGroup disabled={false} product={product} />

                            <TransactionFormGroup disabled={false} error={intervalError} product={product} />

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
