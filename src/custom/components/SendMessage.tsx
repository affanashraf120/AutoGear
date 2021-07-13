import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import * as yup from "yup";
import MessageService from "~/api-services/MessageService";

type Props = {
    sellerId: string | undefined;
    productId: string | undefined;
    onClose: () => void;
};

const schema = yup.object().shape({
    name: yup.string().required("Name required"),
    email: yup.string().email().required("Email required"),
    message: yup.string().required("Message reqquired"),
});

type MessageForm = {
    name: string;
    email: string;
    message: string;
};

const SendMessage = (props: Props) => {
    const { sellerId, productId, onClose } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const { errors, handleSubmit, register } = useForm<MessageForm>({
        resolver: yupResolver(schema),
    });

    const submit = (data: MessageForm) => {
        if (sellerId && productId) {
            setLoading(true);
            MessageService.addMessage({
                ...data,
                date: new Date().toLocaleDateString(),
                sellerId: sellerId,
                productId: productId,
            })
                .then((responseData) => {
                    setLoading(false);
                    toast.success("Message sent");
                    onClose();
                })
                .catch((error) => {
                    console.log(error.response);
                    setLoading(false);
                    toast.error("Server error");
                    onClose();
                });
        } else {
            // onClose();
            console.log("UserID or ProductID not present");
        }
    };

    return (
        <div>
            <form className="reviews-view__form" onSubmit={handleSubmit(submit)}>
                <h3 className="reviews-view__header">Send your message</h3>
                <div className="row">
                    <div className="col-12 full">
                        <div className="form-group">
                            <label htmlFor="review-author">
                                <FormattedMessage id="INPUT_YOUR_NAME_LABEL" />
                            </label>
                            <input
                                type="text"
                                id="review-author"
                                name="name"
                                className={classNames("form-control", {
                                    "is-invalid": errors.name,
                                })}
                                placeholder="Name"
                                ref={register}
                            />
                            <div className="invalid-feedback">{errors.name?.message}</div>
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
                                ref={register}
                            />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        {/*  */}
                        <div className="form-group">
                            <label htmlFor="review-text">Message</label>
                            <textarea
                                id="review-text"
                                rows={6}
                                name="message"
                                className={classNames("form-control", {
                                    "is-invalid": errors.message,
                                })}
                                placeholder="Write your message here"
                                ref={register({ required: true })}
                            />
                            <div className="invalid-feedback">{errors.message?.message}</div>
                        </div>
                        {/*  */}
                        <div className="form-group mb-0 mt-4">
                            <button
                                type="submit"
                                className={classNames("btn", "btn-primary", {
                                    "btn-loading": loading,
                                })}
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
