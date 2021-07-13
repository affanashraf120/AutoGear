import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";

type Props = {
    userId: string | undefined;
};

const SendMessage = (props: Props) => {
    const { userId } = props;
    const { errors, handleSubmit, register } = useForm();

    return (
        <div>
            <form className="reviews-view__form" onSubmit={handleSubmit((data) => {})}>
                <h3 className="reviews-view__header">
                    Send your message
                </h3>
                <div className="row">
                    <div className="col-12 full">
                            <div className="form-group">
                                <label htmlFor="review-author">
                                    <FormattedMessage id="INPUT_YOUR_NAME_LABEL" />
                                </label>
                                <input
                                    type="text"
                                    id="review-author"
                                    name="author"
                                    className={classNames("form-control", {
                                        "is-invalid": errors.author,
                                    })}
                                    placeholder="Name"
                                    ref={register({ required: true })}
                                />
                                <div className="invalid-feedback">
                                    {errors.author?.type === "required" && (
                                        <FormattedMessage id="ERROR_FORM_REQUIRED" />
                                    )}
                                </div>
                            </div>
                            {/*  */}
                            <div className="form-group">
                                <label htmlFor="review-email">
                                    <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                                </label>
                                <input
                                    type="text"
                                    id="review-email"
                                    name="email"
                                    className={classNames("form-control", {
                                        "is-invalid": errors.email,
                                    })}
                                    placeholder="Email"
                                    ref={register({
                                        required: true,
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors.email?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                                    {errors.email?.type === "email" && (
                                        <FormattedMessage id="ERROR_FORM_INCORRECT_EMAIL" />
                                    )}
                                </div>
                            </div>
                            {/*  */}
                        <div className="form-group">
                            <label htmlFor="review-text">
                                <FormattedMessage id="INPUT_YOUR_REVIEW_LABEL" />
                            </label>
                            <textarea
                                id="review-text"
                                rows={6}
                                name="content"
                                className={classNames("form-control", {
                                    "is-invalid": errors.content,
                                })}
                                placeholder="Write your message here"
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">
                                {errors.content?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                            </div>
                        </div>
                        {/*  */}
                        <div className="form-group mb-0 mt-4">
                            <button
                                type="submit"
                                className={classNames(
                                    "btn",
                                    "btn-primary"
                                    // {
                                    //     "btn-loading": submitInProgress,
                                    // }
                                )}
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SendMessage;
