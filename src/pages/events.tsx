// src/pages/events.tsx
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import EventCard from "@/components/EventCard.tsx";
import { eventsData } from "@/mockdata/eventsData.ts";
import {Event} from "@/types/common.ts";
import {
    Button, Divider, Form,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ScrollShadow, useDisclosure
} from "@heroui/react";
import useEventStore from "@/stores/useEventStore.ts";
import {useEffect} from "react";
import {Input} from "@heroui/input";

export default function EventsPage() {
    const {fetchEvents, createEvent} = useEventStore()
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

        createEvent(newEvent)
        fetchEvents()

        eventsData.push(newEvent);
    };

    useEffect(() => {
        fetchEvents()
    }, []);

    return (
    <DefaultLayout>
      <section className="gap-4 py-8 md:py-10 h-full">

        <div className={"flex items-center justify-between py-4"}>
          <h1 className={title()}>Events</h1>
            <Button variant={"shadow"} color="primary" onPress={onOpen}>New</Button>
        </div>

          <Divider></Divider>

        <ScrollShadow hideScrollBar className="grid grid-cols-3 gap-4 justify-items-center w-full overflow-y-auto p-4">
          {eventsData.map((currentEvent) => (
            <div key={currentEvent.id} className="w-full">
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
          <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} className={"dark text-foreground"}>
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
                                        onClose();
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
                              </Form>
                          </ModalBody>
                          <ModalFooter>
                              <Button color="danger" variant="flat" onPress={onClose}>
                                  Close
                              </Button>
                              <Button color="primary" type="submit" form={"eventForm"}>
                                  Submit
                              </Button>
                          </ModalFooter>
                      </>
                  )}
              </ModalContent>
          </Modal>
        <footer className="flex items-center justify-center">

        </footer>

      </section>
    </DefaultLayout>
  );
}
