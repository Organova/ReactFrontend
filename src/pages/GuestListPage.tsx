import React, { useState } from "react";

import GuestListHeader from "@/components/GuestListHeader";
import GuestListFilters from "@/components/GuestListFilters";
import GuestTable from "@/components/GuestTable";
import AddGuestModal from "@/components/AddGuestModal";
import EditGuestModal from "@/components/EditGuestModal";
import { Guest } from "@/types/guest";
import DefaultLayout from "@/layouts/default.tsx";

const GuestListPage: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: "1",
      vorname: "Marcus",
      nachname: "Samson",
      email: "marcus.samson@example.com",
      rolle: "VIP",
      status: "Zugesagt",
    },
    {
      id: "2",
      vorname: "Akram",
      nachname: "Culhane",
      email: "akram.culhane@example.com",
      rolle: "Sponsor",
      status: "Zugesagt",
    },
    {
      id: "3",
      vorname: "Diana",
      nachname: "Culhane",
      email: "diana.culhane@example.com",
      rolle: "Sponsor",
      status: "Zugesagt",
    },
    {
      id: "4",
      vorname: "Lena",
      nachname: "Meyer",
      email: "lena.meyer@example.com",
      rolle: "Gast",
      status: "Ausstehend",
    },
    {
      id: "5",
      vorname: "Tom",
      nachname: "Schneider",
      email: "tom.schneider@example.com",
      rolle: "Arbeiter",
      status: "Zugesagt",
    },
    {
      id: "6",
      vorname: "Sophie",
      nachname: "Lang",
      email: "sophie.lang@example.com",
      rolle: "VIP",
      status: "Abgesagt",
    },
    {
      id: "7",
      vorname: "Jonas",
      nachname: "Reiter",
      email: "jonas.reiter@example.com",
      rolle: "Gast",
      status: "Zugesagt",
    },
    {
      id: "8",
      vorname: "Ella",
      nachname: "Graf",
      email: "ella.graf@example.com",
      rolle: "Sponsor",
      status: "Ausstehend",
    },
    {
      id: "9",
      vorname: "David",
      nachname: "Keller",
      email: "david.keller@example.com",
      rolle: "Arbeiter",
      status: "Abgesagt",
    },
    {
      id: "10",
      vorname: "Mila",
      nachname: "Huber",
      email: "mila.huber@example.com",
      rolle: "VIP",
      status: "Zugesagt",
    },
    {
      id: "11",
      vorname: "Paul",
      nachname: "Roth",
      email: "paul.roth@example.com",
      rolle: "Gast",
      status: "Zugesagt",
    },
    {
      id: "12",
      vorname: "Clara",
      nachname: "Beck",
      email: "clara.beck@example.com",
      rolle: "Arbeiter",
      status: "Ausstehend",
    },
    {
      id: "13",
      vorname: "Leon",
      nachname: "Kunz",
      email: "leon.kunz@example.com",
      rolle: "Sponsor",
      status: "Zugesagt",
    },
    {
      id: "14",
      vorname: "Sarah",
      nachname: "Bauer",
      email: "sarah.bauer@example.com",
      rolle: "VIP",
      status: "Abgesagt",
    },
    {
      id: "15",
      vorname: "Felix",
      nachname: "Brandt",
      email: "felix.brandt@example.com",
      rolle: "Arbeiter",
      status: "Zugesagt",
    },
    {
      id: "16",
      vorname: "Laura",
      nachname: "Schmidt",
      email: "laura.schmidt@example.com",
      rolle: "Gast",
      status: "Ausstehend",
    },
    {
      id: "17",
      vorname: "Nico",
      nachname: "Wagner",
      email: "nico.wagner@example.com",
      rolle: "Sponsor",
      status: "Abgesagt",
    },
    {
      id: "18",
      vorname: "Hannah",
      nachname: "Lehner",
      email: "hannah.lehner@example.com",
      rolle: "VIP",
      status: "Zugesagt",
    },
    {
      id: "19",
      vorname: "Tobias",
      nachname: "Reichl",
      email: "tobias.reichl@example.com",
      rolle: "Arbeiter",
      status: "Ausstehend",
    },
    {
      id: "20",
      vorname: "Mara",
      nachname: "Seidel",
      email: "mara.seidel@example.com",
      rolle: "Gast",
      status: "Zugesagt",
    },
  ]);
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

    setGuests(updatedGuests);
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

    setGuests(updatedGuests);
    applyFilters(searchTerm, roleFilter, statusFilter, updatedGuests);
    setIsEditModalOpen(false);
    setSelectedGuest(null);
  };

  const handleRemoveGuest = (id: string) => {
    const updatedGuests = guests.filter((guest) => guest.id !== id);

    setGuests(updatedGuests);
    applyFilters(searchTerm, roleFilter, statusFilter, updatedGuests);
  };

  const handleExport = () => {
    const headers = ["Vorname", "Nachname", "E-Mail", "Rolle", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredGuests.map((guest) =>
        [
          guest.vorname,
          guest.nachname,
          guest.email,
          guest.rolle,
          guest.status,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "gaesteliste.csv";
    a.click();
  };

  const zugesagtCount = guests.filter((g) => g.status === "Zugesagt").length;
  const zugesagtPercentage =
    guests.length > 0 ? Math.round((zugesagtCount / guests.length) * 100) : 0;

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <GuestListHeader
          confirmationRate={zugesagtPercentage}
          confirmedGuests={zugesagtCount}
          totalGuests={guests.length}
          onAddGuest={() => setIsAddModalOpen(true)}
          onExport={handleExport}
        />

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
    </DefaultLayout>
  );
};

export default GuestListPage;
