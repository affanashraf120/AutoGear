import axios from "axios";
import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import AdminService from "~/api-services/AdminService";
import EmailService from "~/api-services/EmailService";
import AdminAccountLayout from "~/components/account/AdminAccountLayout";
import { getHostUrl } from "~/services/utils";

const Page = () => {
    const { errors, handleSubmit, register } = useForm<{ message: string }>();

    const submit = (data: { message: string }) => {
        axios
            .get(`${getHostUrl()}/api/subscription/getSubscriptions`)
            .then((response) => response.data.data)
            .then((emails) => {
                const arr = emails.map((email: any) => {
                    EmailService.sendMessage(email, data.message);
                });
                Promise.all([...arr]).then((res) => {
                    toast.success("Messages sent");
                });
            });
        toast.success("Messages sent");
    };
    return (
        <form className="reviews-view__form" onSubmit={handleSubmit(submit)}>
            <h3 className="reviews-view__header">Send your message</h3>
            <div className="row">
                <div className="col-12 full">
                    <div className="form-group">
                        <label htmlFor="review-author">Message</label>
                        <input
                            type="text"
                            id="review-author"
                            name="message"
                            className={classNames("form-control", {
                                "is-invalid": errors.message,
                            })}
                            placeholder="Message"
                            ref={register({
                                required: true,
                            })}
                        />
                        <div className="invalid-feedback">{errors.message?.message}</div>
                        {/*  */}
                        <div className="form-group mb-0 mt-4">
                            <button type="submit" className={classNames("btn", "btn-primary")}>
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

Page.Layout = AdminAccountLayout;

export default Page;
