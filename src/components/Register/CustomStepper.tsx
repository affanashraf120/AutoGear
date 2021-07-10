import React from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Col, Container, Row } from "reactstrap";
type Props = {
    activeStep: number;
    handleStepChange: (value: number) => void;
};
const CustomStepper = (props: Props) => {
    const matches = useMediaQuery("(min-width:600px)");
    const { activeStep } = props;
    return (
        <Stepper
            activeStep={activeStep}
            style={{ backgroundColor: "rgb(250,250,250)" }}
            orientation={matches ? "horizontal" : "vertical"}
        >
            <Step>
                <StepLabel>{"Details"}</StepLabel>
            </Step>
            <Step>
                <StepLabel>{"Verification"}</StepLabel>
            </Step>
            <Step>
                <StepLabel>{"Address"}</StepLabel>
            </Step>
            <Step>
                <StepLabel>{"Security"}</StepLabel>
            </Step>
        </Stepper>
    );
};

export default CustomStepper;
