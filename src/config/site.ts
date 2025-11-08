import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Package,
  UserCircle,
} from "lucide-react";

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
      icon: LayoutDashboard,
      text: "Dashboard",
      alert: true,
      active: false,
    },
    {
      icon: BarChart3,
      text: "Statistics",
      alert: false,
      active: false,
    },
    {
      icon: UserCircle,
      text: "Users",
      alert: false,
      active: false,
    },
    {
      icon: Boxes,
      text: "Inventory",
      alert: false,
      active: false,
    },
    {
      icon: Package,
      text: "Orders",
      alert: false,
      active: false,
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
