import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Package,
  UserCircle,
} from "lucide-react";

import { SidebarItem } from "@/types/common.ts";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Organova",
  description: "Organize Events with Ease",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "Modules",
      href: "/modules",
    },
  ],
  sideBarItems: [
    {
      id: "Dashboard",
      text: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      alert: false,
      active: true,
    },
    {
      id: "Statistics",
      icon: BarChart3,
      text: "Statistics",
      alert: true,
      active: false,
      path: "/events",
    },
    {
      id: "Users",
      icon: UserCircle,
      text: "Users",
      alert: false,
      active: false,
      path: "/modules",
    },
    {
      id: "Inventory",
      icon: Boxes,
      text: "Inventory",
      alert: false,
      active: false,
      path: "/",
    },
    {
      id: "Orders",
      icon: Package,
      text: "Orders",
      alert: false,
      active: false,
      path: "/",
    },
  ] as SidebarItem[],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
