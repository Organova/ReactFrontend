import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { UserPlus, Download } from "lucide-react";

interface GuestListHeaderProps {
  totalGuests: number;
  confirmedGuests: number;
  confirmationRate: number;
  onAddGuest: () => void;
  onExport: () => void;
}

const GuestListHeader: React.FC<GuestListHeaderProps> = ({
  totalGuests,
  confirmedGuests,
  confirmationRate,
  onAddGuest,
  onExport,
}) => {
  return (
    <Card className="mb-6">
      <CardBody>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold text-default-900">
                {totalGuests}
              </p>
              <p className="text-sm text-default-500">Gäste insgesamt</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success">
                {confirmationRate}%
              </p>
              <p className="text-sm text-default-500">Zusagequote</p>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              className="flex-1 md:flex-none"
              startContent={<Download size={18} />}
              variant="bordered"
              onPress={onExport}
            >
              Exportieren
            </Button>
            <Button
              className="flex-1 md:flex-none"
              color="primary"
              startContent={<UserPlus size={18} />}
              onPress={onAddGuest}
            >
              Gast hinzufügen
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default GuestListHeader;
