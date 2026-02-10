import React, { useState } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { Plus, Ticket } from "lucide-react";

import TicketContingentTable from "@/components/TicketContingentTable";
import AddTicketContingentModal from "@/components/AddTicketContingentModal";
import { EstimatedGuests } from "@/types/guest";

interface TicketContingentTabProps {
  estimatedGuests: EstimatedGuests[];
  onEstimatedGuestsChange: (estimatedGuests: EstimatedGuests[]) => void;
}

const TicketContingentTab: React.FC<TicketContingentTabProps> = ({
  estimatedGuests,
  onEstimatedGuestsChange,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddContingent = (newContingent: Omit<EstimatedGuests, "id">) => {
    const contingentWithId = {
      ...newContingent,
      id: Date.now().toString(),
    };

    onEstimatedGuestsChange([...estimatedGuests, contingentWithId]);
    setIsAddModalOpen(false);
  };

  const handleUpdateContingent = (id: string, newAnzahl: number) => {
    const updated = estimatedGuests.map((eg) =>
      eg.id === id ? { ...eg, anzahl: newAnzahl } : eg,
    );

    onEstimatedGuestsChange(updated);
  };

  const handleRemoveContingent = (id: string) => {
    onEstimatedGuestsChange(estimatedGuests.filter((eg) => eg.id !== id));
  };

  if (estimatedGuests.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Verkaufte Karten ohne Namen</h2>
          <Button
            color="primary"
            startContent={<Plus size={18} />}
            onPress={() => setIsAddModalOpen(true)}
          >
            Kartenverkauf hinzufügen
          </Button>
        </div>

        <Card>
          <CardBody>
            <div className="flex flex-col items-center justify-center py-12">
              <Ticket className="text-default-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-default-700 mb-2">
                Keine Kartenverkäufe vorhanden
              </h3>
              <p className="text-default-500 text-center mb-4">
                Fügen Sie verkaufte Karten hinzu, deren Gäste noch nicht bekannt
                sind.
              </p>
              <Button
                color="primary"
                startContent={<Plus size={18} />}
                onPress={() => setIsAddModalOpen(true)}
              >
                Ersten Kartenverkauf hinzufügen
              </Button>
            </div>
          </CardBody>
        </Card>

        <AddTicketContingentModal
          isOpen={isAddModalOpen}
          onAddContingent={handleAddContingent}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Verkaufte Karten ohne Namen</h2>
        <Button
          color="primary"
          startContent={<Plus size={18} />}
          onPress={() => setIsAddModalOpen(true)}
        >
          Kartenverkauf hinzufügen
        </Button>
      </div>

      <TicketContingentTable
        contingents={estimatedGuests}
        onRemove={handleRemoveContingent}
        onUpdateAnzahl={handleUpdateContingent}
      />

      <AddTicketContingentModal
        isOpen={isAddModalOpen}
        onAddContingent={handleAddContingent}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default TicketContingentTab;
