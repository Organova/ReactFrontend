import { useState, useMemo } from "react";

import { Guest } from "../types/guest";

export const useGuestFilters = (guests: Guest[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Alle Rollen");
  const [statusFilter, setStatusFilter] = useState("Alle Status");
  const [sortField, setSortField] = useState<keyof Guest | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredAndSortedGuests = useMemo(() => {
    let result = [...guests];

    // Suche anwenden
    if (searchTerm) {
      const term = searchTerm.toLowerCase();

      result = result.filter(
        (guest) =>
          guest.vorname.toLowerCase().includes(term) ||
          guest.nachname.toLowerCase().includes(term) ||
          guest.email.toLowerCase().includes(term),
      );
    }

    if (roleFilter !== "Alle Rollen") {
      result = result.filter((guest) => guest.rolle === roleFilter);
    }

    if (statusFilter !== "Alle Status") {
      result = result.filter((guest) => guest.status === statusFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

        return 0;
      });
    }

    return result;
  }, [guests, searchTerm, roleFilter, statusFilter, sortField, sortDirection]);

  const handleSort = (field: keyof Guest) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    sortField,
    sortDirection,
    handleSort,
    filteredGuests: filteredAndSortedGuests,
  };
};
