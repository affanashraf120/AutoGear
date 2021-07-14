// react
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SubscriptionService from "~/api-services/SubscriptionService";

function WidgetNewsletter() {
    const { register, handleSubmit } = useForm<{ email: string }>();

    const submit = (data: { email: string }) => {
        console.log(data.email);
        SubscriptionService.addSubscription(data.email)
            .then((responseData) => {
                toast.success("Successfully subscribed to newsletter");
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.data.data.name === "MongoError") {
                    toast.success("You are already subscribed");
                } else toast.error("Server Error");
            });
    };
    return (
        <div className="widget widget-newsletter">
            <div className="widget-newsletter__title">
                <h4>Newsletter</h4>
            </div>
            <div className="widget-newsletter__form">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="widget-newsletter__text">
                        Enter your email address below to subscribe to our newsletter and keep up to date with the
                        latest news.
                    </div>
                    <input
                        type="email"
                        name="email"
                        className="widget-newsletter__email"
                        ref={register({
                            required: true,
                        })}
                        placeholder="Email Address..."
                    />
                    <button type="submit" className="widget-newsletter__button">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WidgetNewsletter;
