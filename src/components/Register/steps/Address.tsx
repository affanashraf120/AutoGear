import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "reactstrap";
import { cities } from "~/custom-server/cities";
import { provinces } from "~/custom-server/provinces";

type Props = {
    shouldDisplay: boolean;
    handleNext: () => void;
    handleBack: () => void;
};

const Address = (props: Props) => {
    const { shouldDisplay, handleNext, handleBack } = props;
    const intl = useIntl();
    const { register, errors, trigger } = useFormContext();
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        trigger(["address", "city", "state", "postCode"])
            .then((isValid) => {
                if (!isValid) {
                    console.log(errors);
                    return;
                } else {
                    handleNext();
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    return (
        <div className={!shouldDisplay ? "hide" : ""}>
            <div className="form-group">
                <label htmlFor={`address`}>
                    <FormattedMessage id="INPUT_STREET_ADDRESS_LABEL" />
                </label>
                <input
                    type="text"
                    id={`address`}
                    name={`address`}
                    className={classNames("form-control", {
                        "is-invalid": errors?.address,
                    })}
                    placeholder={intl.formatMessage({ id: "INPUT_STREET_ADDRESS_PLACEHOLDER_1" })}
                    ref={register({ required: true })}
                />
                <div className="invalid-feedback">{errors?.address?.message}</div>
            </div>
            <div className="form-group">
                <label htmlFor={`city`}>
                    <FormattedMessage id="INPUT_CITY_LABEL" />
                </label>
                <select
                    name="city"
                    id="city"
                    className={classNames("form-control", {
                        "is-invalid": errors?.city,
                    })}
                    ref={register}
                    placeholder={intl.formatMessage({ id: "INPUT_CITY_PLACEHOLDER" })}
                >
                    {cities.map((city) => (
                        <option key={city.slug} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">{errors?.city?.message}</div>
            </div>
            <div className="form-group">
                <label htmlFor={`state`}>
                    <FormattedMessage id="INPUT_STATE_LABEL" />
                </label>
                <select
                    name="state"
                    id="state"
                    className={classNames("form-control", {
                        "is-invalid": errors?.state,
                    })}
                    ref={register}
                    placeholder={intl.formatMessage({ id: "INPUT_STATE_PLACEHOLDER" })}
                >
                    {provinces.map((province) => (
                        <option key={province.slug} value={province.name}>
                            {province.name}
                        </option>
                    ))}
                </select>
                <div className="invalid-feedback">{errors?.state?.message}</div>
            </div>
            <div className="form-group">
                <label htmlFor={`post-code`}>
                    <FormattedMessage id="INPUT_POSTCODE_LABEL" />
                </label>
                <input
                    type="text"
                    min={0}
                    maxLength={5}
                    id={`post-code`}
                    name={`postCode`}
                    className={classNames("form-control", {
                        "is-invalid": errors?.postCode,
                    })}
                    placeholder={intl.formatMessage({ id: "INPUT_POSTCODE_PLACEHOLDER" })}
                    ref={register}
                />
                <div className="invalid-feedback">{errors?.postCode?.message}</div>
            </div>
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

export default Address;
