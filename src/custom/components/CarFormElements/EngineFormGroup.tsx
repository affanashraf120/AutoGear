import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";

type Props = {
    disabled: boolean;
};

var mileage = "";
var displacement = "";

const EngineFormGroup = (props: Props) => {
    const { errors, register } = useFormContext();
    const { disabled } = props;

    const invalidKey = (key: string): boolean => {
        if (key === "-" || key === "e" || key === "E") {
            return true;
        }
        return false;
    };

    const handleNumberKeyValidation = (e: React.KeyboardEvent<HTMLInputElement>, num: string, limit: number) => {
        if (invalidKey(e.key)) {
            e.preventDefault();
            return;
        }
        if (e.key === "0" && num === "") {
            e.preventDefault();
            return;
        }
        num = num.concat(e.key);
        if (parseInt(num) > limit) {
            e.preventDefault();
            return;
        }
    };

    return (
        <>
            <div className="form-group">
                <label>Mileage (KM)</label>
                <input
                    type="number"
                    id={`mileage`}
                    name={`mileage`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.mileage,
                    })}
                    placeholder={`Enter mileage`}
                    ref={register({ required: true })}
                    onKeyPress={(e) => {
                        handleNumberKeyValidation(e, mileage, 200000);
                    }}
                    onChange={(e) => {
                        mileage = e.target.value;
                    }}
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
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.engineDisplacement,
                    })}
                    placeholder={`Enter Engine  Displacement`}
                    ref={register({ required: true })}
                    onKeyPress={(e) => {
                        handleNumberKeyValidation(e, displacement, 10000);
                    }}
                    onChange={(e) => {
                        displacement = e.target.value;
                    }}
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
