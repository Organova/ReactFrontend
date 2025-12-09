import React, { useState } from "react";

import GuestTableRow from "./GuestTableRow";

import { Guest } from "@/types/guest";

interface GuestTableProps {
  guests: Guest[];
  onRemoveGuest: (id: string) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({ guests, onRemoveGuest }) => {
  const [sortField, setSortField] = useState<keyof Guest | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Guest) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedGuests = [...guests].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

    return 0;
  });

  if (guests.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">👥</span>
        <h3>Keine Gäste gefunden</h3>
        <p>Fügen Sie Ihren ersten Gast hinzu oder passen Sie Ihre Filter an.</p>
      </div>
    );
  }

  return (
    <div className="guest-table-container">
      <table className="guest-table">
        <thead>
          <tr>
            <th className="sortable" onClick={() => handleSort("vorname")}>
              Vorname{" "}
              {sortField === "vorname" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className="sortable" onClick={() => handleSort("nachname")}>
              Nachname{" "}
              {sortField === "nachname" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className="sortable" onClick={() => handleSort("email")}>
              E-Mail{" "}
              {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className="sortable" onClick={() => handleSort("rolle")}>
              Rolle{" "}
              {sortField === "rolle" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th className="sortable" onClick={() => handleSort("status")}>
              Status{" "}
              {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
            </th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {sortedGuests.map((guest) => (
            <GuestTableRow
              key={guest.id}
              guest={guest}
              onRemove={() => onRemoveGuest(guest.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;
