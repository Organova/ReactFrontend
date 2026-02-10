import React from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Download, Users, UserCheck, Ticket, TrendingUp } from "lucide-react";

interface GuestListHeaderProps {
  totalGuests: number;
  knownGuests: number;
  checkedInGuests: number;
  ticketContingents: number;
  roleStats: { [key: string]: number };
  onExport: () => void;
}

const GuestListHeader: React.FC<GuestListHeaderProps> = ({
  totalGuests,
  knownGuests,
  checkedInGuests,
  ticketContingents,
  roleStats,
  onExport,
}) => {
  const getRoleColor = (
    rolle: string,
  ): "success" | "warning" | "secondary" | "primary" => {
    const colorMap: {
      [key: string]: "success" | "warning" | "secondary" | "primary";
    } = {
      Gast: "success",
      VIP: "warning",
      Sponsor: "secondary",
      Arbeiter: "primary",
    };

    return colorMap[rolle] || "success";
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Hauptstatistiken */}
      <Card>
        <CardBody>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-default-900">
                    {totalGuests}
                  </p>
                  <p className="text-sm text-default-500">Gesamt</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-success-100 rounded-lg">
                  <UserCheck className="text-success" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-success">
                    {checkedInGuests}
                  </p>
                  <p className="text-sm text-default-500">Zugesagt</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Users className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">
                    {knownGuests}
                  </p>
                  <p className="text-sm text-default-500">Bekannte Gäste</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-warning-100 rounded-lg">
                  <Ticket className="text-warning" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-warning">
                    {ticketContingents}
                  </p>
                  <p className="text-sm text-default-500">Kartenverkauf</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              startContent={<Download size={18} />}
              variant="bordered"
              onPress={onExport}
            >
              Exportieren
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Rollenverteilung */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm font-semibold text-default-700">
              Rollenverteilung:
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(roleStats).map(([rolle, count]) => (
                <Chip
                  key={rolle}
                  color={getRoleColor(rolle)}
                  size="md"
                  variant="flat"
                >
                  {rolle}: {count}
                </Chip>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuestListHeader;
