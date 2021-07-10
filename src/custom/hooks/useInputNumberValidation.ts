import React, { LegacyRef, useRef, useState } from "react";
import { Input } from "reactstrap";

type Props = {
    limit?: number;
    maxLength?: number;
    allowLeadingZero?: boolean;
};

const useInputNumberValidation = (props: Props) => {
    const { limit, maxLength, allowLeadingZero } = props;
    const [value, setValue] = useState<string>("");

    const invalidNumberKey = (key: string): boolean => {
        if (key === "-" || key === "e" || key === "E") {
            return true;
        }
        return false;
    };

    const handleChange =
        (callback?: (event: React.ChangeEvent<HTMLInputElement>) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            callback && callback(e);
        };

    const invalidNumberInput = (key: string): boolean => {
        //Avoid -,e,E
        if (invalidNumberKey(key)) {
            return true;
        }

        //Avoid leading zero
        if (!allowLeadingZero && key === "0" && value === "") {
            return true;
        }

        //Limit number
        if (limit) {
            const number = parseInt(value.concat(key));
            return number > limit;
        }

        //Max length
        if (maxLength) {
            const str = value.concat(key);
            return str.length > maxLength;
        }

        return false;
    };

    return {
        invalidNumberInput,
        handleChange,
    };
};

export default useInputNumberValidation;
