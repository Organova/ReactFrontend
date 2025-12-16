import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Calendar } from "lucide-react";

import { EventProps } from "@/types/common.ts";
import { formatDate } from "@/utils/formateDate.ts";

const EventCard: React.FC<EventProps> = (props) => {
  return (
    <Card className={"m-2"}>
      <CardHeader>
        <div className={"min-w-12"}>
          <Calendar size={50} />
        </div>
        <div className="flex flex-col m-2 justify-center">
          <p className="text-2xl text-default-900">{props.name}</p>
          <p className={"text-default-500"}>{props.description}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          <p className={"text-xl content-center"}>Start: </p>
          <p className={"text-default-500 content-center"}>
            {formatDate(props.startDate.toString())}
          </p>
          <p className={"text-xl content-center"}>End: </p>
          <p className={"text-default-500 content-center"}>
            {formatDate(props.endDate.toString())}
          </p>
        </div>
      </CardBody>
      <CardFooter
        className={"container flex flex-wrap items-center gap-4 justify-center"}
      >
        <button className="btn-primary cursor-pointer">Edit</button>
        <button className="btn-primary cursor-pointer">Add Guest</button>
        <button className="btn-primary cursor-pointer">Stats</button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
