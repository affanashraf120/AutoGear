import React from "react";
import moment from "moment";

type Props = {
    last_date: Date;
};

const useTime = (props: Props) => {
    const date_time = new Date(2011, 0, 1, 0, 0, 0, 0);
    const { last_date } = props;

    return {};
};

export default useTime;
