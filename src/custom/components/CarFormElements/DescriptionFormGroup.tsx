import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Input } from "reactstrap";

type Props = {
    disabled: boolean;
};

const minimumChars = 200;
const maximumChars = 1000;

const DescriptionFormGroup = (props: Props) => {
    const { errors, register, control } = useFormContext();
    const descriptionCount = useRef<HTMLElement>(null);
    const setCharactersCount = (count: number) => {
        if (descriptionCount.current) descriptionCount.current.innerText = `${count}`;
    };

    useEffect(() => {
        setCharactersCount(0);
    }, []);
    const { disabled } = props;
    return (
        <>
            <div className="form-group">
                <label>Intoduction</label>
                <input
                    type="text"
                    id={`excerpt`}
                    name={`excerpt`}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.excerpt,
                    })}
                    placeholder={`Add short introdcution`}
                    ref={register({ required: true })}
                />
                <div className="invalid-feedback">
                    {errors?.excerpt?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>

            <div className="form-group">
                <label>
                    Description {`\n`} <strong ref={descriptionCount}>0</strong>/({`${minimumChars}`} -{" "}
                    {`${maximumChars}`}) letters
                </label>
                <textarea
                    ref={register({ required: true })}
                    name="description"
                    id="description"
                    maxLength={maximumChars}
                    minLength={minimumChars}
                    disabled={disabled}
                    className={classNames("form-control", {
                        "is-invalid": errors?.description,
                    })}
                    style={{ height: "200px" }}
                    onChange={(e) => {
                        setCharactersCount(e.target.value.length);
                    }}
                ></textarea>
                <div className="invalid-feedback">
                    {errors?.description?.type === "required" && <FormattedMessage id="ERROR_FORM_REQUIRED" />}
                </div>
            </div>
        </>
    );
};

export default DescriptionFormGroup;
