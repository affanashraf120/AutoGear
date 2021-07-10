import axios from "axios";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import EmailService from "~/api-services/EmailService";
import { getHostUrl } from "~/services/utils";
var EMAIL_VERIFICATION_CODE = 0;
type Props = {
    setVerified: (value: boolean) => void;
};
const useEmailVerification = (props: Props) => {
    const { setVerified } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [codeSend, setCodeSend] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<boolean>(false);
    const [code, setCode] = useState<number>(0);
    const { trigger, getValues } = useFormContext();

    const randomFixedInteger = function (length: number) {
        return Math.floor(
            Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
        );
    };
    const handleSendCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const email = getValues("email");
        trigger("email")
            .then((valid) => {
                if (valid) {
                    setLoading(true);

                    setValidationError(false);
                    EMAIL_VERIFICATION_CODE = randomFixedInteger(6);

                    EmailService.sendVerificationCode(email, EMAIL_VERIFICATION_CODE)
                        .then((res) => {
                            setCodeSend(true);
                            toast.success("Verification code has been sent to your email");
                            setLoading(false);
                        })
                        .catch((err) => {
                            console.log(err.response), toast.error("Verification code not sent. Server error");
                            setLoading(false);
                        });
                } else {
                    setValidationError(true);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log("err", err);
                toast.error("Validation error");
            });
    };
    const handleVerification = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (code === EMAIL_VERIFICATION_CODE) {
            setVerified(true);
            toast.success("Email Verified");
        } else toast.error("Invalid verification code");
    };

    return {
        loading,
        validationError,
        codeSend,
        setCode,
        handleVerification,
        handleSendCode,
    };
};

export default useEmailVerification;
