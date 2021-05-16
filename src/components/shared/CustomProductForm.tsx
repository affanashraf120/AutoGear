import React from "react";
import VehicleSelect from "./VehicleSelect";

type Props = {
    name: string;
};

interface ICarForm {
    make: string;
    model: string;
}

const CustomForm = () => {
    return (
        <React.Fragment>
            <div className="form-row"></div>
            <div className="form-group col-md-6"></div>
            <div className="form-group"></div>
            <div className="form-row">
                <VehicleSelect
                    onVehicleChange={(v) => {
                        console.log(v);
                    }}
                />
            </div>
            <div className="form-row">
                <label htmlFor="">Excerpt</label>
                <input type="text" />
            </div>
            <div className="form-row">
                <label htmlFor="">Description</label>
                <input type="text" />
            </div>
        </React.Fragment>
    );
};

export default CustomForm;
