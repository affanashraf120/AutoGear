import classNames from "classnames";
import React from "react";
import { FormProvider } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import BlockSpace from "~/components/blocks/BlockSpace";
import PageTitle from "~/components/shared/PageTitle";
import { RegisterContext } from "~/components/Register/context/RegisterContext";
import CustomStepper from "~/components/Register/CustomStepper";
import useRegister from "~/components/Register/hooks/useRegister";
import RegisterLayout from "~/custom/components/FormLayout";
import Address from "~/components/Register/steps/Address";
import Security from "~/components/Register/steps/Security";
import UserDetails from "~/components/Register/steps/UserDetails";
import Verification from "~/components/Register/steps/Verification";

const Page = () => {
    const intl = useIntl();

    const {
        step,
        setActiveStep,
        methods,
        serverError,
        nextStep,
        previousStep,
        submit,
        isSubmitting,
        emailVerified,
        phoneVerified,
        setEmailVerified,
        setPhoneVerified,
    } = useRegister();

    

    const Submit = (props: { isSubmitting: boolean; shouldDisplay: boolean }) => {
        const { isSubmitting, shouldDisplay } = props;
        return (
            <div className={`form-group ${!shouldDisplay ? `hide` : ``}`}>
                <button
                    type="submit"
                    className={classNames("btn", "btn-primary", "mt-3", {
                        "btn-loading": isSubmitting,
                    })}
                >
                    <FormattedMessage id="BUTTON_REGISTER" />
                </button>
            </div>
        );
    };

    return (
        <React.Fragment>
            <PageTitle>{intl.formatMessage({ id: "HEADER_REGISTER" })}</PageTitle>

            <BlockSpace layout="after-header" />

            <CustomStepper activeStep={step} handleStepChange={setActiveStep} />

            <RegisterContext.Provider
                value={{
                    emailVerified: emailVerified,
                    phoneVerified: phoneVerified,
                    setEmailVerified: setEmailVerified,
                    setPhoneVerified: setPhoneVerified,
                }}
            >
                <FormProvider {...methods}>
                    <RegisterLayout>
                        <h3 className="card-title">
                            <FormattedMessage id="HEADER_REGISTER" />
                        </h3>
                        <form onSubmit={submit}>
                            {serverError && <div className="alert alert-sm alert-danger">{serverError}</div>}
                            {/*  */}
                            <UserDetails handleNext={nextStep} shouldDisplay={step === 1} />
                            <Verification handleNext={nextStep} handleBack={previousStep} shouldDisplay={step === 2} />
                            <Address handleNext={nextStep} handleBack={previousStep} shouldDisplay={step === 3} />
                            <Security handleBack={previousStep} shouldDisplay={step === 4} />
                            {/*  */}
                            <Submit isSubmitting={isSubmitting} shouldDisplay={step === 4} />
                        </form>
                    </RegisterLayout>
                </FormProvider>
            </RegisterContext.Provider>

            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
};

export default Page;
