import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Divider,
} from "@heroui/react";
import { Ticket, Hash, User, Briefcase } from "lucide-react";

import { EstimatedGuests } from "@/types/guest";

interface AddTicketContingentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContingent: (contingent: Omit<EstimatedGuests, "id">) => void;
}

const AddTicketContingentModal: React.FC<AddTicketContingentModalProps> = ({
  isOpen,
  onClose,
  onAddContingent,
}) => {
  const [formData, setFormData] = useState({
    anzahl: "",
    verkauftVon: "",
    rolle: "Gast" as EstimatedGuests["rolle"],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    const anzahl = parseInt(formData.anzahl);

    if (!formData.anzahl || anzahl <= 0) {
      newErrors.anzahl = "Anzahl muss größer als 0 sein";
    }

    if (!formData.verkauftVon.trim()) {
      newErrors.verkauftVon = "Verkäufer ist erforderlich";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onAddContingent({
        anzahl: parseInt(formData.anzahl),
        verkauftVon: formData.verkauftVon,
        rolle: formData.rolle,
      });
      setFormData({
        anzahl: "",
        verkauftVon: "",
        rolle: "Gast",
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      anzahl: "",
      verkauftVon: "",
      rolle: "Gast",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      isOpen={isOpen}
      placement="center"
      size="2xl"
      onClose={handleClose}
    >
      <ModalContent className="bg-background dark:bg-content1">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Ticket className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    Kartenverkauf hinzufügen
                  </h2>
                  <p className="text-sm text-default-500 font-normal">
                    Verkaufte Karten ohne Namen erfassen
                  </p>
                </div>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody className="py-6">
              <div className="flex flex-col gap-5">
                <Input
                  isRequired
                  classNames={{
                    input: "text-base",
                    inputWrapper: "h-12",
                  }}
                  errorMessage={errors.anzahl}
                  isInvalid={!!errors.anzahl}
                  label="Anzahl Karten"
                  min={1}
                  placeholder="20"
                  startContent={<Hash className="text-default-400" size={18} />}
                  type="number"
                  value={formData.anzahl}
                  variant="bordered"
                  onValueChange={(value) => {
                    setFormData({ ...formData, anzahl: value });
                    if (errors.anzahl) setErrors({ ...errors, anzahl: "" });
                  }}
                />
                <Input
                  isRequired
                  classNames={{
                    input: "text-base",
                    inputWrapper: "h-12",
                  }}
                  errorMessage={errors.verkauftVon}
                  isInvalid={!!errors.verkauftVon}
                  label="Verkauft von"
                  placeholder="Max Mustermann"
                  startContent={<User className="text-default-400" size={18} />}
                  value={formData.verkauftVon}
                  variant="bordered"
                  onValueChange={(value) => {
                    setFormData({ ...formData, verkauftVon: value });
                    if (errors.verkauftVon)
                      setErrors({ ...errors, verkauftVon: "" });
                  }}
                />

                <Select
                  classNames={{
                    trigger: "h-12",
                  }}
                  label="Rolle"
                  placeholder="Rolle auswählen"
                  selectedKeys={[formData.rolle]}
                  startContent={
                    <Briefcase className="text-default-400" size={18} />
                  }
                  variant="bordered"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rolle: e.target.value as EstimatedGuests["rolle"],
                    })
                  }
                >
                  <SelectItem key="Gast">Gast</SelectItem>
                  <SelectItem key="VIP">VIP</SelectItem>
                  <SelectItem key="Sponsor">Sponsor</SelectItem>
                  <SelectItem key="Arbeiter">Arbeiter</SelectItem>
                </Select>
              </div>
            </ModalBody>
            <Divider />
            <ModalFooter className="pt-4">
              <Button size="lg" variant="flat" onPress={handleClose}>
                Abbrechen
              </Button>
              <Button
                color="primary"
                size="lg"
                startContent={<Ticket size={18} />}
                onPress={handleSubmit}
              >
                Kartenverkauf hinzufügen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTicketContingentModal;
