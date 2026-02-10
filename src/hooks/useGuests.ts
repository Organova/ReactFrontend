import { useState, useEffect } from "react";

import { Guest } from "@/types/guest";
import { apiService } from "@/services/guestApi-service.ts";

export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    setLoading(true);
    setError(null);

    try {
      // Backend API aufrufen
      const loadedGuests = await apiService.getAllGuests();

      // Backend-Daten in dein Guest-Format umwandeln
      const formattedGuests: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
      }[] = loadedGuests.map((guest) => ({
        id: guest.guestId,
        firstName: guest.firstName,
        lastName: guest.lastName,
        email: guest.mail,
        // Füge hier weitere Felder hinzu, die dein Guest-Type hat
      }));

      setGuests(formattedGuests);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Fehler beim Laden der Gäste",
      );
      console.error("Fehler beim Laden der Gäste:", err);
    } finally {
      setLoading(false);
    }
  };

  const addGuest = async (guestData: Omit<Guest, "id">) => {
    try {
      // Backend API aufrufen
      const response = await apiService.createGuest({
        firstName: guestData.firstName,
        lastName: guestData.lastName,
        mail: guestData.email,
      });

      // Neuen Gast in dein Format umwandeln
      const newGuest: Guest = {
        id: response.guestId,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.mail,
      };

      // Lokale Liste aktualisieren
      setGuests((prev) => [...prev, newGuest]);

      return newGuest;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Fehler beim Erstellen des Gastes";

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateGuest = async (id: string, updates: Partial<Guest>) => {
    try {
      // Aktuellen Gast finden
      const currentGuest = guests.find((g) => g.id === id);

      if (!currentGuest) {
        throw new Error("Gast nicht gefunden");
      }

      // Backend API aufrufen
      const response = await apiService.updateGuest(id, {
        firstName: updates.firstName ?? currentGuest.firstName,
        lastName: updates.lastName ?? currentGuest.lastName,
        mail: updates.email ?? currentGuest.email,
      });

      // Lokale Liste aktualisieren
      setGuests((prev) =>
        prev.map((guest) =>
          guest.id === id
            ? {
                id: response.guestId,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.mail,
              }
            : guest,
        ),
      );
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Fehler beim Aktualisieren des Gastes";

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const removeGuest = async (id: string) => {
    try {
      // Backend API aufrufen
      await apiService.deleteGuest(id);

      // Lokale Liste aktualisieren
      setGuests((prev) => prev.filter((guest) => guest.id !== id));
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Fehler beim Löschen des Gastes";

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Statistiken berechnen (lokal, basierend auf geladenen Daten)
  const statistics = {
    total: guests.length,
    // Füge hier weitere Statistiken hinzu, die du brauchst
  };

  return {
    guests,
    loading,
    error,
    addGuest,
    updateGuest,
    removeGuest,
    statistics,
    refreshGuests: loadGuests,
  };
};
