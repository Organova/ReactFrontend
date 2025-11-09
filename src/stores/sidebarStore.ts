import { create } from "zustand";
import { SidebarItem } from "@/types/common.ts";
import { siteConfig } from "@/config/site.ts";

type SidebarStore = {
  isOpen: boolean;
  items: SidebarItem[];
  addItem: (item: SidebarItem) => void;
  setItems: (items: SidebarItem[]) => void;
  toggleActive: (id: string) => void;
  toggleAlert: (id: string) => void;
  toggleOpen: () => void;
  open: () => void;
  close: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  items: siteConfig.sideBarItems,
  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  toggleActive: (id) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id
        ? { ...item, active: true }
        : { ...item, active: false }
    ),
  })),
  toggleAlert: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, alert: !item.alert }
          : item
      ),
    })),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
