type Listener = () => void;

interface GuestStore {
  guests: import("../types/guest").Guest[];
  listeners: Set<Listener>;

  getState: () => import("../types/guest").Guest[];
  setState: (guests: import("../types/guest").Guest[]) => void;
  subscribe: (listener: Listener) => () => void;
}

const createGuestStore = (): GuestStore => {
  let guests: import("../types/guest").Guest[] = [];
  const listeners = new Set<Listener>();

  return {
    guests,
    listeners,

    getState() {
      return guests;
    },

    setState(newGuests) {
      guests = newGuests;
      listeners.forEach((listener) => listener());
    },

    subscribe(listener) {
      listeners.add(listener);

      return () => listeners.delete(listener);
    },
  };
};

export const guestStore = createGuestStore();
