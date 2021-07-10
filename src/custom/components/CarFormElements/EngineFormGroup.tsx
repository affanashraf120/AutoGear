import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import useInputNumberValidation from "~/custom/hooks/useInputNumberValidation";

type Props = {
    disabled: boolean;
};

const EngineFormGroup = (props: Props) => {
    const { errors, register } = useFormContext();

    const mileageValidation = useInputNumberValidation({ allowLeadingZero: false, limit: 200000 });
    const displacementValidation = useInputNumberValidation({ allowLeadingZero: false, limit: 10000 });

    const { disabled } = props;

    return (
        <>
            <div className="form-group">
                <label>Mileage (KM)</label>
                <input
                    type="number"
                    id={`mileage`}
                    name={`mileage`}
                    min={1}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.mileage,
                    })}
                    placeholder={`Enter mileage`}
                    ref={register({ required: true })}
                    onKeyPress={(e) => {
                        mileageValidation.invalidNumberInput(e.key) && e.preventDefault();
                    }}
                    onChange={mileageValidation.handleChange()}
                />
                <div className="invalid-feedback">
                    {errors?.mileage?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Engine Displacement (cc)</label>
                <input
                    type="number"
                    id={`engineDisplacement`}
                    name={`engineDisplacement`}
                    min={1}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.engineDisplacement,
                    })}
                    placeholder={`Enter Engine  Displacement`}
                    ref={register({ required: true })}
                    onKeyPress={(e) => {
                        displacementValidation.invalidNumberInput(e.key) && e.preventDefault();
                    }}
                    onChange={displacementValidation.handleChange()}
                />
                <div className="invalid-feedback">
                    {errors?.engineDisplacement?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Color</label>
                <input
                    type="textarea"
                    id={`color`}
                    name={`color`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.color,
                    })}
                    placeholder={`Enter color`}
                    ref={register({ required: true })}
                />
                <div className="invalid-feedback">
                    {errors?.color?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>
        </>
    );
};

export default EngineFormGroup;
