import { EventProps } from "@/types/common.ts";

export const eventsData: EventProps[] = [
  {
    id: 1,
    name: "Team Meeting",
    description: "Wöchentliches Sync-Meeting des Entwicklungsteams.",
    startDate: new Date("2025-01-14T09:00:00"),
    endDate: new Date("2025-01-14T10:00:00"),
  },
  {
    id: 2,
    name: "Produkt-Launch",
    description: "Launch-Event für Version 2.0 mit Stakeholder-Präsentation.",
    startDate: new Date("2025-03-21T14:00:00"),
    endDate: new Date("2025-03-21T16:30:00"),
  },
  {
    id: 3,
    name: "Sprint Review",
    description: "Review des aktuellen Sprints mit Demo.",
    startDate: new Date("2025-04-02T11:00:00"),
    endDate: new Date("2025-04-02T12:00:00"),
  },
  {
    id: 4,
    name: "Konferenz: Web Tech",
    description: "Ganztägige Entwicklerkonferenz zu Web-Technologien.",
    startDate: new Date("2025-05-15T09:00:00"),
    endDate: new Date("2025-05-15T18:00:00"),
  },
  {
    id: 5,
    name: "Design Workshop",
    description: "Interaktiver Workshop zur Produktgestaltung.",
    startDate: new Date("2025-06-10T13:00:00"),
    endDate: new Date("2025-06-10T16:00:00"),
  },
  {
    id: 6,
    name: "Kollegen Geburtstag",
    description: "Kleines Zusammensein zum Geburtstag eines Kollegen.",
    startDate: new Date("2025-07-28T17:30:00"),
    endDate: new Date("2025-07-28T19:00:00"),
  },
  {
    id: 7,
    name: "Netzwerkabend",
    description: "After-Work Networking mit externen Gästen.",
    startDate: new Date("2025-08-05T18:00:00"),
    endDate: new Date("2025-08-05T21:00:00"),
  },
  {
    id: 8,
    name: "Kundenpräsentation",
    description: "Präsentation neuer Features für einen Großkunden.",
    startDate: new Date("2025-09-12T10:00:00"),
    endDate: new Date("2025-09-12T11:30:00"),
  },
  {
    id: 9,
    name: "Hackathon",
    description: "48‑stündiger interner Hackathon zur Ideenentwicklung.",
    startDate: new Date("2025-10-18T09:00:00"),
    endDate: new Date("2025-10-20T09:00:00"),
  },
  {
    id: 10,
    name: "Jahresabschluss",
    description: "Jahresabschlussfeier und Rückblick auf das Jahr.",
    startDate: new Date("2025-12-19T17:00:00"),
    endDate: new Date("2025-12-19T21:00:00"),
  },
];
