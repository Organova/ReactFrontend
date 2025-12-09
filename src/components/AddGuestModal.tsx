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
import { UserPlus, Mail, User, Briefcase, CheckCircle } from "lucide-react";

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
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <UserPlus className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Neuen Gast hinzufügen</h2>
                  <p className="text-sm text-default-500 font-normal">
                    Füllen Sie die Informationen des neuen Gastes aus
                  </p>
                </div>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody className="py-6">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    isRequired
                    classNames={{
                      input: "text-base",
                      inputWrapper: "h-12",
                    }}
                    errorMessage={errors.vorname}
                    isInvalid={!!errors.vorname}
                    label="Vorname"
                    placeholder="Max"
                    startContent={
                      <User className="text-default-400" size={18} />
                    }
                    value={formData.vorname}
                    variant="bordered"
                    onValueChange={(value) => {
                      setFormData({ ...formData, vorname: value });
                      if (errors.vorname) setErrors({ ...errors, vorname: "" });
                    }}
                  />

                  <Input
                    isRequired
                    classNames={{
                      input: "text-base",
                      inputWrapper: "h-12",
                    }}
                    errorMessage={errors.nachname}
                    isInvalid={!!errors.nachname}
                    label="Nachname"
                    placeholder="Mustermann"
                    startContent={
                      <User className="text-default-400" size={18} />
                    }
                    value={formData.nachname}
                    variant="bordered"
                    onValueChange={(value) => {
                      setFormData({ ...formData, nachname: value });
                      if (errors.nachname)
                        setErrors({ ...errors, nachname: "" });
                    }}
                  />
                </div>

                <Input
                  isRequired
                  classNames={{
                    input: "text-base",
                    inputWrapper: "h-12",
                  }}
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                  label="E-Mail-Adresse"
                  placeholder="max.mustermann@beispiel.com"
                  startContent={<Mail className="text-default-400" size={18} />}
                  type="email"
                  value={formData.email}
                  variant="bordered"
                  onValueChange={(value) => {
                    setFormData({ ...formData, email: value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    classNames={{
                      trigger: "h-12",
                    }}
                    label="Status"
                    placeholder="Status auswählen"
                    selectedKeys={[formData.status]}
                    startContent={
                      <CheckCircle className="text-default-400" size={18} />
                    }
                    variant="bordered"
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
                startContent={<UserPlus size={18} />}
                onPress={handleSubmit}
              >
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
