type Duration = {
  startDate: Date,
  endDate: Date
}

const DateDuration: React.FC<Duration> = (props) => {
    //console.log(props.startDate)

  return (
    <div className={"flex items-center gap-3"}>
      <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden h-fit">
        <div className="text-tiny bg-default-100 py-0.5 text-default-500">
          {props.startDate.toLocaleString("en-US", { month: "short" })}
        </div>
        <div className="flex items-center justify-center font-semibold text-medium h-6 text-default-500">
          {props.startDate.toLocaleString("en-US", { day: "2-digit" })}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-medium text-foreground font-medium">
          {props.startDate.toLocaleString("en-US", {
            dateStyle: "full",
          })}
        </p>
        <p className="text-small text-default-500">
          {props.startDate.toLocaleString("en-US", {
            timeStyle: "short",
          })}{" "}
          -{" "}
          {props.endDate.toLocaleString("en-US", {
            timeStyle: "short",
          })}
        </p>
      </div>
    </div>
  );
};

export default DateDuration;
