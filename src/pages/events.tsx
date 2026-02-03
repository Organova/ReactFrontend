// src/pages/events.tsx
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import EventCard from "@/components/EventCard.tsx";
import { eventsData } from "@/mockdata/eventsData.ts";
import {Event} from "@/types/common.ts";
import {
    Button, Form,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ScrollShadow, useDisclosure
} from "@heroui/react";
import useEventStore from "@/stores/useEventStore.ts";
import useUserStore from "@/stores/useUserStore.ts";
import {useEffect} from "react";
import {Input} from "@heroui/input";

export default function EventsPage() {
    const {events, fetchEvents, createEvent} = useEventStore()
    const {token, tenantId} = useUserStore()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleSubmit = async (e:any, startDate: any, endDate: any) => {

        const lastEvent = eventsData.pop();

        const newEvent:Event = {
            id: (lastEvent?.id ?? 0) + 1,
            name: e.name,
            description: e.description,
            startDate: startDate,
            endDate: endDate
        }

        console.log(newEvent)

        createEvent(tenantId, token, newEvent)
        fetchEvents(tenantId, token)

        eventsData.push(newEvent);
    };

    useEffect(() => {
        fetchEvents(tenantId, token)
    }, []);

    console.log(events)
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
          <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
              <ModalContent>
                  {(onClose) => (
                      <>
                          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                          <ModalBody>
                              <Form id={"eventForm"}
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        const form = e.currentTarget; // ⬅ sofort sichern
                                        const formData = new FormData(form);
                                        const data = Object.fromEntries(formData);

                                        // @ts-ignore
                                        const startDate = new Date(data.startDate);
                                        // @ts-ignore
                                        const endDate = new Date(data.endDate);

                                        handleSubmit(data, startDate, endDate);
                                    }}>
                                  <Input
                                      name={"name"}
                                      isRequired
                                      errorMessage="Please enter a valid name"
                                      label="Name"
                                      placeholder="Enter the name of the event"
                                      variant="bordered"
                                  />
                                  <Input
                                      name={"description"}
                                      isRequired
                                      errorMessage="Please enter a valid description"
                                      label="Description"
                                      placeholder="Enter the description of the event"
                                      variant="bordered"
                                  />
                                  <Input
                                      name={"startDate"}
                                      isRequired
                                      errorMessage="Please enter a valid startdate"
                                      label="Startdate"
                                      placeholder="Enter the Startdate"
                                      type={"datetime-local"}
                                      variant="bordered"
                                  />
                                  <Input
                                      name={"endDate"}
                                      isRequired
                                      errorMessage="Please enter a valid enddate"
                                      label="Enddate"
                                      placeholder="Enter the Enddate"
                                      type={"datetime-local"}
                                      variant="bordered"
                                  />
                                  <Button color="primary" type="submit">
                                      Submit
                                  </Button>
                              </Form>
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" type="submit" form={"eventForm"}>
                                  Submit
                              </Button>
                              <Button type="reset" variant="flat" form={"eventForm"}>
                                  Reset
                              </Button>
                              <Button color="danger" variant="flat" onPress={onClose}>
                                  Close
                              </Button>
                          </ModalFooter>
                      </>
                  )}
              </ModalContent>
          </Modal>
        <footer className="flex items-center justify-center">
          <Button variant={"shadow"} color="primary" onPress={onOpen}>New</Button>
        </footer>

      </section>
    </DefaultLayout>
  );
}
