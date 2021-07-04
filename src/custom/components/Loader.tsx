import React from "react";
import { Spinner } from "reactstrap";
type Props = {
    width?: string;
    height?: string;
};
const Loader = (props: Props) => {
    const { height, width } = props;
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: `${width}`,
                height: `${height}`,
            }}
        >
            <Spinner style={{ width: "3rem", height: "3rem" }} type="grow" />
        </div>
    );
};

export default Loader;
