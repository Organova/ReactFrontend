import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Chip,
  Button,
  Tooltip,
} from "@heroui/react";
import { Trash2, Users, Edit } from "lucide-react";

import { Guest } from "@/types/guest";

interface GuestTableProps {
  guests: Guest[];
  onRemoveGuest: (id: string) => void;
  onEditGuest: (id: string) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({
  guests,
  onRemoveGuest,
  onEditGuest,
}) => {
  const getRoleColor = (rolle: string) => {
    const colorMap: {
      [key: string]: "success" | "warning" | "secondary" | "primary" | "danger";
    } = {
      Gast: "success",
      VIP: "warning",
      Sponsor: "secondary",
      Arbeiter: "primary",
    };

    return colorMap[rolle] || "default";
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: "success" | "danger" | "warning" } = {
      Zugesagt: "success",
      Abgesagt: "danger",
      Ausstehend: "warning",
    };

    return colorMap[status] || "default";
  };

  const handleRemove = (id: string, name: string) => {
    if (window.confirm(`Möchten Sie ${name} wirklich entfernen?`)) {
      onRemoveGuest(id);
    }
  };

  if (guests.length === 0) {
    return (
      <Card>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12">
            <Users className="text-default-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-default-700 mb-2">
              Keine Gäste gefunden
            </h3>
            <p className="text-default-500 text-center">
              Fügen Sie Ihren ersten Gast hinzu oder passen Sie Ihre Filter an.
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-0">
        <Table removeWrapper aria-label="Gästeliste">
          <TableHeader>
            <TableColumn>VORNAME</TableColumn>
            <TableColumn>NACHNAME</TableColumn>
            <TableColumn>E-MAIL</TableColumn>
            <TableColumn>ROLLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn align="center">AKTIONEN</TableColumn>
          </TableHeader>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.vorname}</TableCell>
                <TableCell className="font-medium">{guest.nachname}</TableCell>
                <TableCell className="text-primary">{guest.email}</TableCell>
                <TableCell>
                  <Chip
                    color={getRoleColor(guest.rolle)}
                    size="sm"
                    variant="flat"
                  >
                    {guest.rolle}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    color={getStatusColor(guest.status)}
                    size="sm"
                    variant="flat"
                  >
                    {guest.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Tooltip color="primary" content="Gast bearbeiten">
                      <Button
                        isIconOnly
                        color="primary"
                        size="sm"
                        variant="light"
                        onPress={() => onEditGuest(guest.id)}
                      >
                        <Edit size={18} />
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Gast entfernen">
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() =>
                          handleRemove(
                            guest.id,
                            `${guest.vorname} ${guest.nachname}`,
                          )
                        }
                      >
                        <Trash2 size={18} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default GuestTable;
