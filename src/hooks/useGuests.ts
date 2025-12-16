import { useState, useEffect } from "react";

import { Guest } from "@/types/guest";
import { GuestService } from "@/services/guestService";

export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = () => {
    setLoading(true);
    const loadedGuests = GuestService.getAllGuests();

    setGuests(loadedGuests);
    setLoading(false);
  };

  const addGuest = (guestData: Omit<Guest, "id">) => {
    const newGuest: Guest = {
      ...guestData,
      id: Date.now().toString(),
    };

    GuestService.addGuest(newGuest);
    loadGuests();

    return newGuest;
  };

  const updateGuest = (id: string, updates: Partial<Guest>) => {
    GuestService.updateGuest(id, updates);
    loadGuests();
  };

  const removeGuest = (id: string) => {
    GuestService.deleteGuest(id);
    loadGuests();
  };

  const statistics = GuestService.getStatistics();

  return {
    guests,
    loading,
    addGuest,
    updateGuest,
    removeGuest,
    statistics,
    refreshGuests: loadGuests,
  };
};
