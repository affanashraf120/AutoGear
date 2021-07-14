type Props = {
    endDate: string; // YEAR-MONTH-DAY, MONTH/DAY/YEAR
};

const useTime = (props: Props) => {
    const { endDate } = props;
    const lastDate = new Date(endDate);
    const startDate = new Date();

    return {
        seconds: parseInt(`${(lastDate.getTime() - startDate.getTime()) / 1000}`),
    };
};

export default useTime;
