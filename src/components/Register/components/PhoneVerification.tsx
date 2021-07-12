import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";
import Loader from "../../../custom/components/Loader";
import PhoneNumberInput from "../../../custom/components/PhoneNumberInput";
import { useRegisterContext } from "../hooks/useRegisterContext";
import usePhoneVerification from "./usePhoneVerification";

const PhoneVerification = () => {
    const { loading, validationError, codeSend, setCode, handleVerify, handleSendCode, captchaRef } =
        usePhoneVerification();
    const { errors, control } = useFormContext();
    const { phoneVerified } = useRegisterContext();
    const { invalidNumberInput, handleChange } = useInputNumberValidation({ maxLength: 7, allowLeadingZero: true });

    return (
        <>
            {/*  */}
            <div className="form-group">
                <label htmlFor="phone">Phone#</label>
                <PhoneNumberInput
                    classname={classNames("form-control", {
                        "is-invalid": errors?.phone,
                    })}
                    name="phone"
                    disabled={phoneVerified || loading}
                    control={control}
                />
                <div className="invalid-feedback">{errors?.phone?.message}</div>
            </div>
            {phoneVerified && <p style={{ color: "green" }}>Verified</p>}
            {/*  */}
            {loading ? (
                <Loader />
            ) : (
                <div className="form-group">
                    {!phoneVerified && (
                        <InputGroup
                            className={classNames("form-control", {
                                "is-invalid": validationError,
                            })}
                            style={{ height: "auto" }}
                        >
                            <Input
                                type="number"
                                placeholder={
                                    codeSend
                                        ? "Verfication code has been sent to your number."
                                        : "Get verification code and enter here"
                                }
                                disabled={phoneVerified || !codeSend}
                                onKeyPress={(e) => {
                                    invalidNumberInput(e.key) && e.preventDefault();
                                }}
                                onChange={handleChange((e) => {
                                    setCode(e.target.value);
                                })}
                                min={0}
                            />
                            <InputGroupAddon addonType="append">
                                {!phoneVerified && codeSend && (
                                    <Button color="secondary" onClick={handleVerify}>
                                        Verify
                                    </Button>
                                )}
                                {!phoneVerified && (
                                    <Button color="secondary" onClick={handleSendCode}>
                                        {codeSend ? "Resend" : "Send Code"}
                                    </Button>
                                )}
                            </InputGroupAddon>
                        </InputGroup>
                    )}
                    <div className="invalid-feedback">Valid phone number required</div>
                </div>
            )}
            {/*  */}
            <div id="recaptcha" style={{ margin: "2rem" }} ref={captchaRef}></div>
        </>
    );
};

export default PhoneVerification;
