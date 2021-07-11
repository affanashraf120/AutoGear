import firebase from "firebase";
import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";
import { useRegisterContext } from "../hooks/useRegisterContext";

declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

const usePhoneVerification = () => {
    const [codeSend, setCodeSend] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<boolean>(false);
    const { setPhoneVerified } = useRegisterContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [code, setCode] = useState("");
    const { getValues, trigger } = useFormContext();
    const captchaRef = useRef<HTMLDivElement>(null);

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
            size: "normal",
            callback: (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                toast.success("Recaptcha Resolved");
            },
        });
    };
    const sendVerificationCodeToUser = (phone: string) => {
        const phoneNumber = `+${phone}`;
        const appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
                setCodeSend(true);
                setLoading(false);
            })
            .catch((error) => {
                // Error; SMS not sent
                console.log(error.response);
                toast.error("Recaptcha not resolved");
                setLoading(false);
            });
    };
    const signInUserWithVerificationCode = (code: string) => {
        setLoading(true);
        window.confirmationResult
            .confirm(code)
            .then((result: any) => {
                // User signed in successfully.
                setPhoneVerified(true);
                toast.success("Phone number has been verified");
                setLoading(false);
                // ...
            })
            .catch((error: any) => {
                // User couldn't sign in (bad verification code?)
                toast.error("Invalid code provided");
                setLoading(false);
            });
    };
    const sendVerificationCode = () => {
        const value = getValues("phone");
        if (captchaRef.current?.innerHTML) {
            sendVerificationCodeToUser(value);
        } else {
            setUpRecaptcha();
            sendVerificationCodeToUser(value);
        }
    };
    const handleSendCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        trigger("phone").then((valid) => {
            if (valid) {
                setLoading(true);
                setValidationError(false);
                setCodeSend(false);
                sendVerificationCode();
            } else {
                setValidationError(true);
            }
        });
    };
    const handleVerify = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        signInUserWithVerificationCode(code);
    };

    return {
        loading,
        validationError,
        codeSend,
        setCode,
        handleVerify,
        handleSendCode,
        captchaRef,
    };
};

export default usePhoneVerification;
