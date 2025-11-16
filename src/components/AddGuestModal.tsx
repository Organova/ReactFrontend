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
} from "@heroui/react";

import { Guest } from "@/types/guest";

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGuest: (guest: Omit<Guest, "id">) => void;
}

const AddGuestModal: React.FC<AddGuestModalProps> = ({
  isOpen,
  onClose,
  onAddGuest,
}) => {
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    rolle: "Gast" as Guest["rolle"],
    status: "Ausstehend" as Guest["status"],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.vorname.trim()) {
      newErrors.vorname = "Vorname ist erforderlich";
    }

    if (!formData.nachname.trim()) {
      newErrors.nachname = "Nachname ist erforderlich";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onAddGuest(formData);
      setFormData({
        vorname: "",
        nachname: "",
        email: "",
        rolle: "Gast",
        status: "Ausstehend",
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      vorname: "",
      nachname: "",
      email: "",
      rolle: "Gast",
      status: "Ausstehend",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} placement="center" size="2xl" onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Neuen Gast hinzufügen
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  isRequired
                  errorMessage={errors.vorname}
                  isInvalid={!!errors.vorname}
                  label="Vorname"
                  placeholder="Vorname eingeben"
                  value={formData.vorname}
                  onValueChange={(value) => {
                    setFormData({ ...formData, vorname: value });
                    if (errors.vorname) setErrors({ ...errors, vorname: "" });
                  }}
                />

                <Input
                  isRequired
                  errorMessage={errors.nachname}
                  isInvalid={!!errors.nachname}
                  label="Nachname"
                  placeholder="Nachname eingeben"
                  value={formData.nachname}
                  onValueChange={(value) => {
                    setFormData({ ...formData, nachname: value });
                    if (errors.nachname) setErrors({ ...errors, nachname: "" });
                  }}
                />

                <Input
                  isRequired
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                  label="E-Mail"
                  placeholder="email@beispiel.com"
                  type="email"
                  value={formData.email}
                  onValueChange={(value) => {
                    setFormData({ ...formData, email: value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                />

                <Select
                  label="Rolle"
                  placeholder="Rolle wählen"
                  selectedKeys={[formData.rolle]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rolle: e.target.value as Guest["rolle"],
                    })
                  }
                >
                  <SelectItem key="Gast" value="Gast">
                    Gast
                  </SelectItem>
                  <SelectItem key="VIP" value="VIP">
                    VIP
                  </SelectItem>
                  <SelectItem key="Sponsor" value="Sponsor">
                    Sponsor
                  </SelectItem>
                  <SelectItem key="Arbeiter" value="Arbeiter">
                    Arbeiter
                  </SelectItem>
                </Select>

                <Select
                  label="Status"
                  placeholder="Status wählen"
                  selectedKeys={[formData.status]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Guest["status"],
                    })
                  }
                >
                  <SelectItem key="Ausstehend" value="Ausstehend">
                    Ausstehend
                  </SelectItem>
                  <SelectItem key="Zugesagt" value="Zugesagt">
                    Zugesagt
                  </SelectItem>
                  <SelectItem key="Abgesagt" value="Abgesagt">
                    Abgesagt
                  </SelectItem>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={handleClose}>
                Abbrechen
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Gast hinzufügen
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddGuestModal;
