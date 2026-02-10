import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { UserPlus } from "lucide-react";

import GuestListFilters from "@/components/GuestListFilters";
import GuestTable from "@/components/GuestTable";
import AddGuestModal from "@/components/AddGuestModal";
import EditGuestModal from "@/components/EditGuestModal";
import { Guest } from "@/types/guest";

interface KnownGuestsTabProps {
  guests: Guest[];
  onGuestsChange: (guests: Guest[]) => void;
}

const KnownGuestsTab: React.FC<KnownGuestsTabProps> = ({
  guests,
  onGuestsChange,
}) => {
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>(guests);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Alle Rollen");
  const [statusFilter, setStatusFilter] = useState("Alle Status");

  const applyFilters = (
    search: string,
    role: string,
    status: string,
    guestList: Guest[],
  ) => {
    let filtered = [...guestList];

    if (search) {
      filtered = filtered.filter(
        (guest) =>
          guest.vorname.toLowerCase().includes(search.toLowerCase()) ||
          guest.nachname.toLowerCase().includes(search.toLowerCase()) ||
          guest.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (role !== "Alle Rollen") {
      filtered = filtered.filter((guest) => guest.rolle === role);
    }

    if (status !== "Alle Status") {
      filtered = filtered.filter((guest) => guest.status === status);
    }

    setFilteredGuests(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, roleFilter, statusFilter, guests);
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    applyFilters(searchTerm, role, statusFilter, guests);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, roleFilter, status, guests);
  };

  const handleAddGuest = (newGuest: Omit<Guest, "id">) => {
    const guestWithId = {
      ...newGuest,
      id: Date.now().toString(),
    };
    const updatedGuests = [...guests, guestWithId];

    onGuestsChange(updatedGuests);
    applyFilters(searchTerm, roleFilter, statusFilter, updatedGuests);
    setIsAddModalOpen(false);
  };

  const handleEditGuest = (id: string) => {
    const guest = guests.find((g) => g.id === id);

    if (guest) {
      setSelectedGuest(guest);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateGuest = (updatedGuest: Guest) => {
    const updatedGuests = guests.map((guest) =>
      guest.id === updatedGuest.id ? updatedGuest : guest,
    );

    onGuestsChange(updatedGuests);
    applyFilters(searchTerm, roleFilter, statusFilter, updatedGuests);
    setIsEditModalOpen(false);
    setSelectedGuest(null);
  };

  const handleRemoveGuest = (id: string) => {
    const updatedGuests = guests.filter((guest) => guest.id !== id);

    onGuestsChange(updatedGuests);
    applyFilters(searchTerm, roleFilter, statusFilter, updatedGuests);
  };

  useEffect(() => {
    applyFilters(searchTerm, roleFilter, statusFilter, guests);
  }, [guests]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Gäste mit vollständigen Details
        </h2>
        <Button
          color="primary"
          startContent={<UserPlus size={18} />}
          onPress={() => setIsAddModalOpen(true)}
        >
          Gast hinzufügen
        </Button>
      </div>

      <GuestListFilters
        roleFilter={roleFilter}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onRoleFilter={handleRoleFilter}
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
      />

      <GuestTable
        guests={filteredGuests}
        onEditGuest={handleEditGuest}
        onRemoveGuest={handleRemoveGuest}
      />

      <AddGuestModal
        isOpen={isAddModalOpen}
        onAddGuest={handleAddGuest}
        onClose={() => setIsAddModalOpen(false)}
      />

      {selectedGuest && (
        <EditGuestModal
          guest={selectedGuest}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedGuest(null);
          }}
          onUpdateGuest={handleUpdateGuest}
        />
      )}
    </div>
  );
};

export default KnownGuestsTab;
