import { useState, useRef, useEffect } from "react";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { SearchIcon, Logo } from "@/components/icons";

const tenants = [
  { id: 1, name: "Sebis Feier", initials: "sf", members: 24, events: 4 },
  { id: 2, name: "Maturaball", initials: "TS", members: 11, events: 3 },
  { id: 3, name: "Fortnite Liveevent", initials: "OH", members: 47, events: 15 },
];

export const Navbar = () => {
  const [activeTenant, setActiveTenant] = useState(tenants[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchInput = (
      <Input
          aria-label="Search"
          classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
          endContent={<Kbd className="hidden lg:inline-block" keys={["command"]}>K</Kbd>}
          labelPlacement="outside"
          placeholder="Search..."
          startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
          type="search"
      />
  );

  return (
      <HeroUINavbar className="shouldHideOnScroll isBordered" maxWidth="full" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="gap-3 max-w-fit">
            <Link className="flex justify-start items-center gap-1" color="foreground" href="/">
              <Logo />
              <p className="font-bold text-inherit">Organova</p>
            </Link>
          </NavbarBrand>
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <Link
                      className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:text-primary data-[active=true]:font-medium")}
                      color="foreground"
                      href={item.href}
                  >
                    {item.label}
                  </Link>
                </NavbarItem>
            ))}
          </div>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

          {/* Tenant Dropdown */}
          <NavbarItem>
            <div className="relative" ref={dropdownRef}>
              <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 bg-default-100 hover:bg-default-200 border border-default-200 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors min-w-[160px]"
              >
              <span className="bg-primary-100 text-primary-700 rounded-md w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {activeTenant.initials}
              </span>
                <span className="flex-1 text-left">{activeTenant.name}</span>
                <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {open && (
                  <div className="absolute right-0 top-full mt-1.5 w-64 bg-background border border-default-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <p className="px-3 py-2 text-xs font-medium text-default-400 uppercase tracking-wide">Your Tenants</p>
                    {tenants.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => { setActiveTenant(t); setOpen(false); }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-default-100 transition-colors ${t.id === activeTenant.id ? "bg-primary-50" : ""}`}
                        >
                    <span className="bg-default-200 rounded-md w-8 h-8 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {t.initials}
                    </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{t.name}</p>
                            <p className="text-xs text-default-400">{t.members} members · {t.events} events</p>
                          </div>
                          {t.id === activeTenant.id && (
                              <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                          )}
                        </button>
                    ))}
                  </div>
              )}
            </div>
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>
  );
};