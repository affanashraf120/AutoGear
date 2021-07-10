import classNames from "classnames";
import React from "react";
import { Control, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = {
    name: string;
    control: Control;
    classname: any;
    disabled: boolean;
};

const PhoneNumberInput = (props: Props) => {
    const { name, control, classname, disabled } = props;
    return (
        <div style={{ height: "auto" }} className={classname}>
            <Controller
                control={control}
                name={name}
                render={({ onChange, onBlur }) => (
                    <PhoneInput
                        inputStyle={{ width: "100%" }}
                        enableSearch={true}
                        country="pk"
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                    />
                )}
                rules={{ required: "Phone number is required", minLength: 12 }}
            />
        </div>
    );
};

export default PhoneNumberInput;
