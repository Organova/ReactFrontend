// src/pages/events.tsx
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import EventCard from "@/components/EventCard.tsx";
import { eventsData } from "@/mockdata/eventsData.ts";
import { Button, ScrollShadow } from "@heroui/react";

export default function EventsPage() {
  return (
    <DefaultLayout>
      <section className="grid grid-rows-[auto_1fr_auto] grid-cols-[200px_1fr_200px] gap-4 py-8 md:py-10 h-full">

        <div className="row-span-3"></div>

        <div className={"flex items-center justify-center"}>
          <h1 className={title()}>Events</h1>
        </div>

        <div className="row-span-3"></div>

        <ScrollShadow hideScrollBar className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 justify-items-center w-full overflow-y-auto p-4">
          {eventsData.map((currentEvent) => (
            <div key={currentEvent.id} className="w-full max-w-sm">
              <EventCard
                description={currentEvent.description}
                endDate={currentEvent.endDate}
                id={currentEvent.id}
                name={currentEvent.name}
                startDate={currentEvent.startDate}
              />
            </div>
          ))}
        </ScrollShadow>

        <footer className="flex items-center justify-center">
          <Button variant={"shadow"} color="primary">New</Button>
        </footer>

      </section>
    </DefaultLayout>
  );
}
