type Duration = {
    startDate: Date,
    endDate: Date
}

const DateDurationShort: React.FC<Duration> = (props) => {
    //console.log(props.startDate)

    return (
        <div className={"bg-blue-300 w-fit p-5 items-center rounded-2xl flex-row justify-center"}>
            <h1>{props.startDate.toLocaleString("en-US", { month: "short" })}</h1>
            <p>{props.startDate.toLocaleString("en-US", {
                timeStyle: "short",
            })}{" "}</p>
        </div>
    );
};

export default DateDurationShort;
