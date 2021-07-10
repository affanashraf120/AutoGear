import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Button } from "reactstrap";

type Props = {
    shouldDisplay: boolean;
    handleBack: () => void;
};

const Security = (props: Props) => {
    const { shouldDisplay, handleBack } = props;
    const { errors, register } = useFormContext();
    return (
        <div className={!shouldDisplay ? "hide" : ""}>
            <div className="form-group">
                <label htmlFor="signup-password">
                    <FormattedMessage id="INPUT_PASSWORD_LABEL" />
                </label>
                <input
                    id="signup-password"
                    type="password"
                    className={classNames("form-control", {
                        "is-invalid": errors?.password,
                    })}
                    placeholder="Password"
                    name="password"
                    ref={register}
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="form-group">
                <label htmlFor="signup-confirm">
                    <FormattedMessage id="INPUT_PASSWORD_REPEAT_LABEL" />
                </label>
                <input
                    id="signup-confirm"
                    type="password"
                    className={classNames("form-control", {
                        "is-invalid": errors.confirmPassword,
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    ref={register}
                />
                <div className="invalid-feedback">{errors?.confirmPassword?.message}</div>
            </div>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    handleBack();
                }}
            >
                Back
            </Button>
        </div>
    );
};

export default Security;
