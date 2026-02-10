import React, { useState } from "react";
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
  Input,
} from "@heroui/react";
import { Trash2, Edit, Check, X } from "lucide-react";

import { EstimatedGuests } from "@/types/guest";

interface TicketContingentTableProps {
  contingents: EstimatedGuests[];
  onUpdateAnzahl: (id: string, newAnzahl: number) => void;
  onRemove: (id: string) => void;
}

const TicketContingentTable: React.FC<TicketContingentTableProps> = ({
  contingents,
  onUpdateAnzahl,
  onRemove,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const getRoleColor = (rolle: string) => {
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

  const handleStartEdit = (id: string, currentAnzahl: number) => {
    setEditingId(id);
    setEditValue(currentAnzahl);
  };

  const handleSaveEdit = (id: string) => {
    if (editValue > 0) {
      onUpdateAnzahl(id, editValue);
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue(0);
  };

  const handleRemove = (id: string, verkauftVon: string) => {
    if (
      window.confirm(
        `Möchten Sie den Kartenverkauf von ${verkauftVon} wirklich entfernen?`,
      )
    ) {
      onRemove(id);
    }
  };

  return (
    <Card>
      <CardBody className="p-0">
        <Table removeWrapper aria-label="Kartenkontingente">
          <TableHeader>
            <TableColumn>ANZAHL</TableColumn>
            <TableColumn>VERKAUFT VON</TableColumn>
            <TableColumn>ROLLE</TableColumn>
            <TableColumn align="center">AKTIONEN</TableColumn>
          </TableHeader>
          <TableBody>
            {contingents.map((contingent) => (
              <TableRow key={contingent.id}>
                <TableCell>
                  {editingId === contingent.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        className="w-24"
                        min={1}
                        size="sm"
                        type="number"
                        value={editValue.toString()}
                        onValueChange={(value) =>
                          setEditValue(parseInt(value) || 0)
                        }
                      />
                      <Button
                        isIconOnly
                        color="success"
                        size="sm"
                        variant="flat"
                        onPress={() => handleSaveEdit(contingent.id)}
                      >
                        <Check size={16} />
                      </Button>
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={handleCancelEdit}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {contingent.anzahl}
                      </span>
                      <span className="text-sm text-default-500">Karten</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {contingent.verkauftVon}
                </TableCell>
                <TableCell>
                  <Chip
                    color={getRoleColor(contingent.rolle)}
                    size="sm"
                    variant="flat"
                  >
                    {contingent.rolle}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    {editingId !== contingent.id && (
                      <Tooltip color="primary" content="Anzahl bearbeiten">
                        <Button
                          isIconOnly
                          color="primary"
                          size="sm"
                          variant="light"
                          onPress={() =>
                            handleStartEdit(contingent.id, contingent.anzahl)
                          }
                        >
                          <Edit size={18} />
                        </Button>
                      </Tooltip>
                    )}
                    <Tooltip color="danger" content="Kartenverkauf entfernen">
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        variant="light"
                        onPress={() =>
                          handleRemove(contingent.id, contingent.verkauftVon)
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

export default TicketContingentTable;
