import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Calendar, Users, BarChart3 } from "lucide-react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

import { EventProps } from "@/types/common.ts";
import { formatDate } from "@/utils/formateDate.ts";

const EventCard: React.FC<EventProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative m-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative">
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

          {/* Zusätzlicher Content in der Mitte der Card */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-default-100 rounded-lg text-center"
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-semibold">Quick Actions verfügbar</p>
                <p className="text-xs text-default-500 mt-1">
                  Verwende die Buttons um Aktionen auszuführen
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardBody>
        <CardFooter className="justify-center gap-2">
          {/* Buttons unten nebeneinander */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  color="success"
                  size="sm"
                  startContent={<Users size={16} />}
                  variant="flat"
                >
                  Add Guest
                </Button>
                <Button
                  color="secondary"
                  size="sm"
                  startContent={<BarChart3 size={16} />}
                  variant="flat"
                >
                  Stats
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
