import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "reactstrap";
import EmailVerification from "../../../custom/components/EmailVerification/EmailVerification";
import PhoneVerification from "../components/PhoneVerification";
import { useRegisterContext } from "../hooks/useRegisterContext";

type Props = {
    shouldDisplay: boolean;
    handleNext: () => void;
    handleBack: () => void;
};

const Verification = (props: Props) => {
    const { emailVerified, phoneVerified, setPhoneVerified, setEmailVerified } = useRegisterContext();
    const { shouldDisplay, handleNext, handleBack } = props;
    const { register, errors, control, trigger, getValues } = useFormContext();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (phoneVerified && emailVerified) {
            const data = getValues(["email", "phone"]);
            trigger(["email", "phone"])
                .then((isValid) => {
                    if (!isValid) {
                        console.log(errors);
                        return;
                    } else if (emailVerified && phoneVerified) {
                        handleNext();
                    } else {
                        // Show verification error
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }
    };

    useEffect(() => {}, []);

    return (
        <div className={!shouldDisplay ? "hide" : ""}>
            <EmailVerification verified={emailVerified} setVerified={setEmailVerified} />
            {/*  */}
            <PhoneVerification />
            {/*  */}
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    handleBack();
                }}
            >
                Back
            </Button>
            <Button onClick={handleSubmit}>Next</Button>
        </div>
    );
};

export default Verification;
