import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UserService from "~/api-services/userService/UserService";
import { useAuthContext } from "~/custom/hooks/useAuthContext";
import { useAppRouter } from "~/services/router";
import url from "~/services/url";
import { useUserSignUp } from "~/store/user/userHooks";
import { setUserAuthToken } from "~/utils/auth";
import { defaultValues, RegisterData, schema } from "../types";

const useRegister = () => {
    const [serverError, setServerError] = useState<string | null>();
    const [emailVerified, setEmailVerified] = useState<boolean>(false);
    const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const userSignUp = useUserSignUp();
    const { isUserExist } = useAuthContext();
    const { setAuthorizedUser } = useAuthContext();
    const history = useAppRouter();
    const methods = useForm<RegisterData>({
        defaultValues: { ...defaultValues },
        resolver: yupResolver(schema),
    });
    const nextStep = () => {
        setStep((prev) => {
            if (prev === 4) return prev;
            return ++prev;
        });
    };
    const previousStep = () => {
        setStep((prev) => {
            if (prev === 1) return prev;
            return --prev;
        });
    };

    const setActiveStep = (value: number) => {
        setStep(value);
    };
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const submit = (data: RegisterData) => {
        const { confirmPassword, ...customData } = data;
        UserService.register({ ...customData, isPaymentMethod: false })
            .then((responseData) => {
                toast.success("User registered successfully");
                setAuthorizedUser(responseData.data.token);
                history.push(url.accountDashboard());
            })
            .catch((err) => {
                toast.error("User not registered." + err.response.data.message);
                console.log(err.response);
            });
    };
    useEffect(() => {
        isUserExist() && history.push(url.accountDashboard());
    }, []);
    return {
        step,
        setActiveStep,
        methods,
        serverError,
        nextStep,
        previousStep,
        submit: handleSubmit(submit),
        isSubmitting,
        emailVerified,
        phoneVerified,
        setEmailVerified,
        setPhoneVerified,
    };
};

export default useRegister;
