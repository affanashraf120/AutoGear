import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import Loader from "../Loader";
import useInputNumberValidation from "../../hooks/useInputNumberValidation";
import { useRegisterContext } from "../../../components/Register/hooks/useRegisterContext";
import useEmailVerification from "./useEmailVerification";

type Props = {
    verified: boolean;
    setVerified: (value: boolean) => void;
};

const EmailVerification = (props: Props) => {
    const { setVerified, verified } = props;
    const { loading, validationError, codeSend, setCode, handleVerification, handleSendCode } = useEmailVerification({
        setVerified,
    });
    const { errors, register } = useFormContext();
    const { handleChange, invalidNumberInput } = useInputNumberValidation({ maxLength: 6, allowLeadingZero: true });

    return (
        <>
            <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                    id="signup-email"
                    type="email"
                    // disabled={verified || loading}
                    className={classNames("form-control", {
                        "is-invalid": errors?.email,
                    })}
                    onKeyDown={(e) => {
                        (verified || loading) && e.preventDefault();
                    }}
                    placeholder="user123@domain.com"
                    name="email"
                    ref={register}
                />
                <div className="invalid-feedback">{errors?.email?.message}</div>
            </div>
            {/*  */}
            {verified && <p style={{ color: "green" }}>Verified</p>}
            {/*  */}
            {loading ? (
                <Loader />
            ) : (
                <div className="form-group">
                    {!verified && (
                        <InputGroup
                            className={classNames("form-control", {
                                "is-invalid": validationError,
                            })}
                            style={{ height: "auto" }}
                        >
                            <Input
                                type="number"
                                min={0}
                                placeholder={
                                    codeSend
                                        ? "Verfication code has been sent to your email."
                                        : "Get verification code and enter here"
                                }
                                disabled={verified || !codeSend}
                                onKeyPress={(e) => {
                                    invalidNumberInput(e.key) && e.preventDefault();
                                }}
                                onChange={handleChange((e) => {
                                    setCode(parseInt(e.target.value));
                                })}
                            />
                            <InputGroupAddon addonType="append">
                                {!verified && codeSend && (
                                    <Button color="secondary" onClick={handleVerification}>
                                        Verify
                                    </Button>
                                )}
                                {!verified && (
                                    <Button color="secondary" onClick={handleSendCode}>
                                        {codeSend ? "Resend" : "Send Code"}
                                    </Button>
                                )}
                            </InputGroupAddon>
                        </InputGroup>
                    )}
                    <div className="invalid-feedback">Valid email required</div>
                </div>
            )}
            {/*  */}
        </>
    );
};

export default EmailVerification;
