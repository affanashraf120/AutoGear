import classNames from "classnames";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import AdminAccountLayout from "~/components/account/AdminAccountLayout";
import AppImage from "~/components/shared/AppImage";
import AppLink from "~/components/shared/AppLink";
import CurrencyFormat from "~/components/shared/CurrencyFormat";
import PageTitle from "~/components/shared/PageTitle";
import Rating from "~/components/shared/Rating";
import url from "~/services/url";
import { Cross12Svg } from "~/svg";
import AsyncAction from "~/components/shared/AsyncAction";
import BlockHeader from "~/components/blocks/BlockHeader";
import BlockSpace from "~/components/blocks/BlockSpace";
import StockStatusBadge from "~/components/shared/StockStatusBadge";
import { useCartAddItem } from "~/store/cart/cartHooks";
import { useWishlist, useWishlistRemoveItem } from "~/store/wishlist/wishlistHooks";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import Loader from "~/custom/components/Loader";
import { Button } from "@material-ui/core";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import EmailService from "~/api-services/EmailService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Page = () => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const toggle = () => setModal(!modal);
    const { errors, handleSubmit, register } = useForm<{ email: string; message: string }>();

    const submit = (data: { email: string; message: string }) => {
        EmailService.sendMessage(data.email, data.message)
            .then((res) => {
                toast.success("Message sent");
                toggle();
            })
            .catch((err) => {
                toast.error("Server error");
                toggle();
            });
    };

    return (
        <React.Fragment>
            <PageTitle>Manage Auctions</PageTitle>

            <div className="block">
                <div className="container container--max--xl">
                    <div className="wishlist">
                        <table className="wishlist__table">
                            <thead className="wishlist__head">
                                <tr className="wishlist__row wishlist__row--head">
                                    <th className="wishlist__column wishlist__column--head wishlist__column--product">
                                        <FormattedMessage id="TABLE_PRODUCT" />
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--product">
                                        Bid Amount
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--product">
                                        Leading Bidder
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--stock">
                                        Status
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--price">
                                        Reserved Amount
                                    </th>
                                    <th className="wishlist__column wishlist__column--head wishlist__column--remove">
                                        <span className="sr-only">
                                            <FormattedMessage id="TABLE_REMOVE" />
                                        </span>
                                    </th>
                                </tr>
                            </thead>

                            <FirebaseDatabaseNode path="/" limitToFirst={12}>
                                {(element) => {
                                    return element.isLoading ? (
                                            <Loader width="100%" />
                                    ) : (
                                        <>
                                            {element.value &&
                                                Object.entries(element.value).map(([key, value], index) => {
                                                    const { bids, bid_amount, price, make, model, endDate } =
                                                        element.value[key];
                                                    let leadingUser: any = undefined;
                                                    const lastDate = new Date(endDate);
                                                    const startDate = new Date();
                                                    const seconds = parseInt(
                                                        `${(lastDate.getTime() - startDate.getTime()) / 1000}`
                                                    );
                                                    bids &&
                                                        Object.entries(bids).map(([key, users], index) => {
                                                            const user = bids[key];
                                                            if (!leadingUser) {
                                                                leadingUser = user;
                                                            } else if (leadingUser.bid_amount < user.bid_amount) {
                                                                leadingUser = user;
                                                            }
                                                        });

                                                    return (
                                                        <>
                                                            <tbody className="wishlist__body">
                                                                <tr
                                                                    key={index}
                                                                    className="wishlist__row wishlist__row--body"
                                                                >
                                                                    <td
                                                                        className={classNames(
                                                                            "wishlist__column",
                                                                            "wishlist__column--body",
                                                                            "wishlist__column--product"
                                                                        )}
                                                                    >
                                                                        {make} {model}
                                                                    </td>
                                                                    <td
                                                                        className={classNames(
                                                                            "wishlist__column",
                                                                            "wishlist__column--body",
                                                                            "wishlist__column--product"
                                                                        )}
                                                                    >
                                                                        {bid_amount}
                                                                    </td>
                                                                    <td
                                                                        className={classNames(
                                                                            "wishlist__column",
                                                                            "wishlist__column--body",
                                                                            "wishlist__column--product"
                                                                        )}
                                                                    >
                                                                        {leadingUser ? leadingUser.fullName : "-"}
                                                                    </td>
                                                                    <td
                                                                        className={classNames(
                                                                            "wishlist__column",
                                                                            "wishlist__column--body",
                                                                            "wishlist__column--product"
                                                                        )}
                                                                    >
                                                                        {seconds > 0 ? "Running" : "Closed"}
                                                                    </td>
                                                                    <td
                                                                        className={classNames(
                                                                            "wishlist__column",
                                                                            "wishlist__column--body",
                                                                            "wishlist__column--product"
                                                                        )}
                                                                    >
                                                                        {price}
                                                                    </td>
                                                                    <td
                                                                        className={classNames(
                                                                            "wishlist__column",
                                                                            "wishlist__column--body",
                                                                            "wishlist__column--remove"
                                                                        )}
                                                                    >
                                                                        <Button
                                                                            disabled={seconds > 0 ? true : false}
                                                                            onClick={() => {
                                                                                console.log(leadingUser?.email);
                                                                                setEmail(leadingUser.email);
                                                                                toggle();
                                                                            }}
                                                                        >
                                                                            Send Email
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </>
                                                    );
                                                })}
                                        </>
                                    );
                                }}
                            </FirebaseDatabaseNode>
                        </table>
                    </div>
                </div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Message</ModalHeader>
                    <ModalBody>
                        <form className="reviews-view__form" onSubmit={handleSubmit(submit)}>
                            <h3 className="reviews-view__header">Send your message</h3>
                            <div className="row">
                                <div className="col-12 full">
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label htmlFor="review-email">
                                                <FormattedMessage id="INPUT_EMAIL_ADDRESS_LABEL" />
                                            </label>
                                            <input
                                                type="text"
                                                id="review-email"
                                                name="email"
                                                value={email}
                                                className={classNames("form-control", {
                                                    "is-invalid": errors.email,
                                                })}
                                                placeholder="Email"
                                                ref={register}
                                            />
                                            <div className="invalid-feedback">{errors.email?.message}</div>
                                        </div>
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
                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    );
};
Page.Layout = AdminAccountLayout;

export default Page;
