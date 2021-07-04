import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { cities } from "~/custom-server/cities";
import { bodyTypes } from "~/custom-server/database/bodyTypes";
import { engineTypes } from "~/custom-server/database/engineTypes";
import { transmissions } from "~/custom-server/database/transmissions";
import { provinces } from "~/custom-server/provinces";

type Props = {
    disabled: boolean;
};

const SelectionsFormGroup = (props: Props) => {
    const { errors, register } = useFormContext();
    const { disabled } = props;

    return (
        <>
            <div className="form-group">
                <label>Engine Type</label>
                <select
                    id={`engineType`}
                    name={`engineType`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.engineType,
                    })}
                    placeholder={`Enter engineType`}
                    ref={register({ required: true })}
                >
                    {engineTypes.map((type, index) => (
                        <option value={type.name} key={index}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                    {errors?.engineType?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Assembly</label>
                <select
                    id={`assembly`}
                    name={`assembly`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.assembly,
                    })}
                    placeholder={`Enter assembly`}
                    ref={register({ required: true })}
                >
                    <option value="Local">Local</option>
                    <option value="Imported">Imported</option>
                </select>
                <div className="invalid-feedback">
                    {errors?.assembly?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Transmission</label>
                <select
                    id={`transmission`}
                    name={`transmission`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.transmission,
                    })}
                    placeholder={`Enter transmission`}
                    ref={register({ required: true })}
                >
                    {transmissions.map((type, index) => (
                        <option value={type.name} key={index}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                    {errors?.transmission?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Body Type</label>
                <select
                    id={`bodyType`}
                    name={`bodyType`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.transmission,
                    })}
                    placeholder={`Enter transmission`}
                    ref={register({ required: true })}
                >
                    {bodyTypes.map((type, index) => (
                        <option value={type.name} key={index}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                    {errors?.bodyType?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Registered City</label>
                <select
                    id={`registeredCity`}
                    name={`registeredCity`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.registeredCity,
                    })}
                    placeholder={`Enter registeredCity`}
                    ref={register({ required: true })}
                >
                    {cities.map((type, index) => (
                        <option value={type.name} key={index}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                    {errors?.registeredCity?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>Province</label>
                <select
                    id={`province`}
                    name={`province`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.province,
                    })}
                    placeholder={`Enter province`}
                    ref={register({ required: true })}
                >
                    {provinces.map((type, index) => (
                        <option value={type.name} key={index}>
                            {type.name}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">
                    {errors?.province?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>
        </>
    );
};

export default SelectionsFormGroup;
