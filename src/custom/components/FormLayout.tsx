import React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    children: React.ReactNode;
};

const FormLayout = (props: Props) => {
    const { children } = props;
    return (
        <div className="block">
            <div className="container container--max--lg">
                <div className="col-md-12 ">
                    <div className="card">
                        <div className="card-body card-body--padding--2">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLayout;
