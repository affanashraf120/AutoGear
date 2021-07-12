type Props = {
    day: number;
    month: number;
    year: number;
};

const useTime = (props: Props) => {
    const { day, month, year } = props;
    const lastDate = new Date(`${month}/${day}/${year}`);
    const startDate = new Date();

    return {
        seconds: parseInt(`${(lastDate.getTime() - startDate.getTime()) / 1000}`),
    };
};

export default useTime;
