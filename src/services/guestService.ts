import { Guest } from "@/types/guest";

export class GuestService {
  private static STORAGE_KEY = "organova_guests";

  static getAllGuests(): Guest[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    return stored ? JSON.parse(stored) : [];
  }

  static addGuest(guest: Guest): Guest {
    const guests = this.getAllGuests();

    guests.push(guest);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(guests));

    return guest;
  }

  static updateGuest(id: string, updates: Partial<Guest>): Guest | null {
    const guests = this.getAllGuests();
    const index = guests.findIndex((g) => g.id === id);

    if (index === -1) return null;

    guests[index] = { ...guests[index], ...updates };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(guests));

    return guests[index];
  }

  static deleteGuest(id: string): boolean {
    const guests = this.getAllGuests();
    const filtered = guests.filter((g) => g.id !== id);

    if (filtered.length === guests.length) return false;

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));

    return true;
  }

  static getStatistics() {
    const guests = this.getAllGuests();
    const total = guests.length;
    const confirmed = guests.filter((g) => g.status === "Zugesagt").length;
    const declined = guests.filter((g) => g.status === "Abgesagt").length;
    const pending = guests.filter((g) => g.status === "Ausstehend").length;

    return {
      total,
      confirmed,
      declined,
      pending,
      confirmationRate: total > 0 ? Math.round((confirmed / total) * 100) : 0,
    };
  }
}
