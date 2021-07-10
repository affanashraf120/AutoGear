import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Button } from "reactstrap";
import { useRegisterContext } from "../hooks/useRegisterContext";

type Props = {
    shouldDisplay: boolean;
    handleNext: () => void;
};

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
};

const UserDetails = (props: Props) => {
    const { shouldDisplay, handleNext } = props;
    const { register, errors, trigger, getValues } = useFormContext();
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        trigger(["fullName"])
            .then((isValid) => {
                if (!isValid) {
                    console.log(errors);
                    return;
                } else {
                    handleNext();
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    return (
        <div className={!shouldDisplay ? "hide" : ""}>
            {/*  */}
            <div className="form-group">
                <label htmlFor="full-name">Full Name (Firstname & Lastname)</label>
                <input
                    id="full-name"
                    type="text"
                    className={classNames("form-control", {
                        "is-invalid": errors?.fullName,
                    })}
                    name="fullName"
                    placeholder="Full username"
                    ref={register}
                />
                <div className="invalid-feedback">{errors?.fullName?.message}</div>
            </div>
            {/*  */}
            <Button onClick={handleSubmit}>Next</Button>
        </div>
    );
};

export default UserDetails;
