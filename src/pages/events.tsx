// src/pages/events.tsx
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import EventCard from "@/components/EventCard.tsx";
import { eventsData } from "@/mockdata/eventsData.ts";

export default function EventsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full text-center">
          <h1 className={title()}>Events</h1>

          <div className="container flex flex-wrap gap-4 justify-center w-full">
            {eventsData.map((currentEvent) => (
              <div key={currentEvent.id} className="p-2 flex justify-center">
                <div className="w-full max-w-sm">
                  <EventCard
                    description={currentEvent.description}
                    endDate={currentEvent.endDate}
                    id={currentEvent.id}
                    name={currentEvent.name}
                    startDate={currentEvent.startDate}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
