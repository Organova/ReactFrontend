import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { Users, Ticket } from "lucide-react";

import GuestListHeader from "@/components/GuestListHeader";
import KnownGuestsTab from "@/components/KnownGuestsTab";
import TicketContingentTab from "@/components/TicketContingentTab";
import { Guest, EstimatedGuests } from "@/types/guest";
import DefaultLayout from "@/layouts/default";

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

  const [estimatedGuests, setEstimatedGuests] = useState<EstimatedGuests[]>([
    {
      id: "1",
      anzahl: 20,
      verkauftVon: "Max Mustermann",
      rolle: "Gast",
    },
  ]);

  const [activeTab, setActiveTab] = useState("known");

  // Statistiken berechnen
  const totalEstimatedCount = estimatedGuests.reduce(
    (sum, eg) => sum + eg.anzahl,
    0,
  );
  const totalGuests = guests.length + totalEstimatedCount;
  const knownGuests = guests.length;
  const checkedInGuests = guests.filter((g) => g.status === "Zugesagt").length;

  // Rollenverteilung
  const getRoleStats = () => {
    const stats: { [key: string]: number } = {
      Gast: 0,
      VIP: 0,
      Sponsor: 0,
      Arbeiter: 0,
    };

    // Bekannte Gäste zählen
    guests.forEach((guest) => {
      stats[guest.rolle]++;
    });

    // Geschätzte Gäste zählen
    estimatedGuests.forEach((eg) => {
      stats[eg.rolle] += eg.anzahl;
    });

    return stats;
  };

  const handleExport = () => {
    // Export für bekannte Gäste
    const guestHeaders = ["Vorname", "Nachname", "E-Mail", "Rolle", "Status"];
    const guestRows = guests.map((guest) =>
      [
        guest.vorname,
        guest.nachname,
        guest.email,
        guest.rolle,
        guest.status,
      ].join(","),
    );

    // Export für Kartenverkauf
    const contingentHeaders = ["Anzahl", "Verkauft von", "Rolle"];
    const contingentRows = estimatedGuests.map((eg) =>
      [eg.anzahl, eg.verkauftVon, eg.rolle].join(","),
    );

    const csvContent = [
      "=== BEKANNTE GÄSTE ===",
      guestHeaders.join(","),
      ...guestRows,
      "",
      "=== KARTENVERKAUF ===",
      contingentHeaders.join(","),
      ...contingentRows,
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "gaesteliste_komplett.csv";
    a.click();
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <GuestListHeader
          checkedInGuests={checkedInGuests}
          knownGuests={knownGuests}
          roleStats={getRoleStats()}
          ticketContingents={totalEstimatedCount}
          totalGuests={totalGuests}
          onExport={handleExport}
        />

        <Tabs
          aria-label="Gästeverwaltung"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-4 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
          selectedKey={activeTab}
          size="lg"
          variant="underlined"
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab
            key="known"
            title={
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Bekannte Gäste</span>
                <span className="text-xs bg-default-100 px-2 py-0.5 rounded-full">
                  {guests.length}
                </span>
              </div>
            }
          >
            <div className="py-6">
              <KnownGuestsTab guests={guests} onGuestsChange={setGuests} />
            </div>
          </Tab>

          <Tab
            key="contingent"
            title={
              <div className="flex items-center gap-2">
                <Ticket size={18} />
                <span>Kartenverkauf</span>
                <span className="text-xs bg-default-100 px-2 py-0.5 rounded-full">
                  {totalEstimatedCount}
                </span>
              </div>
            }
          >
            <div className="py-6">
              <TicketContingentTab
                estimatedGuests={estimatedGuests}
                onEstimatedGuestsChange={setEstimatedGuests}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default GuestListPage;
