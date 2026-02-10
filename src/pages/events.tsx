// src/pages/events.tsx
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import EventCard from "@/components/EventCard.tsx";
import { Event } from "@/types/common.ts";
import {
    Button,
    Divider,
    Form,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ScrollShadow,
    useDisclosure
} from "@heroui/react";
import useEventStore from "@/stores/useEventStore.ts";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";

export default function EventsPage() {
    const { fetchEvents, createEvent, events, updateEvent } = useEventStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditChange } = useDisclosure();
    const [editEvent, setEditEvent] = useState<Event | null>(null);

    // Create Modal state
    const [createStartDate, setCreateStartDate] = useState<string>("");
    const [createEndDate, setCreateEndDate] = useState<string>("");
    const [createErrors, setCreateErrors] = useState<{ date?: string }>({});

    // Edit Modal state
    const [editStartDate, setEditStartDate] = useState<string>("");
    const [editEndDate, setEditEndDate] = useState<string>("");
    const [editErrors, setEditErrors] = useState<{ date?: string }>({});

    useEffect(() => {
        fetchEvents();
    }, []);

    const validateDates = (start: string, end: string) => {
        if (!start || !end) return undefined;
        const startD = new Date(start);
        const endD = new Date(end);
        if (startD > endD) return "Enddate must be after Startdate!";
        return undefined;
    };

    const handleSubmit = async (data: any, start: string, end: string) => {
        const newEvent: Event = {
            eventId: "1",
            name: data.name,
            description: data.description,
            startDate: new Date(start),
            endDate: new Date(end),
            timeZone: "UTC",
        };
        try {
            await createEvent(newEvent);
            await fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateSubmit = async (data: any, start: string, end: string) => {
        if (!editEvent) return;
        const updatedEvent: Event = {
            eventId: editEvent.eventId,
            name: data.name,
            description: data.description,
            startDate: new Date(start),
            endDate: new Date(end),
            timeZone: editEvent.timeZone,
        };
        try {
            await updateEvent(updatedEvent);
            await fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <DefaultLayout>
            <section className="gap-4 py-8 md:py-10 h-full">
                <div className="flex items-center justify-between py-4">
                    <h1 className={title()}>Events</h1>
                    <Button variant="shadow" color="primary" onPress={onOpen}>New</Button>
                </div>
                <Divider />
                <ScrollShadow hideScrollBar className="grid grid-cols-3 gap-4 justify-items-center w-full overflow-y-auto p-4">
                    {events?.map((currentEvent) => (
                        <div key={currentEvent.eventId} className="w-full">
                            <EventCard
                                {...currentEvent}
                                onEdit={() => {
                                    setEditEvent(currentEvent);
                                    setEditStartDate(currentEvent.startDate.toISOString().slice(0, 16));
                                    setEditEndDate(currentEvent.endDate.toISOString().slice(0, 16));
                                    setEditErrors({});
                                    onEditOpen();
                                }}
                            />
                        </div>
                    ))}
                </ScrollShadow>

                {/* Create Event Modal */}
                <Modal isOpen={isOpen} placement="top-center" onOpenChange={(open) => {
                    onOpenChange();
                    if (!open) setCreateErrors({}); // Fehler beim Schließen zurücksetzen
                }} className="dark text-foreground">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Create new event</ModalHeader>
                                <ModalBody>
                                    <Form
                                        id="eventForm"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const form = e.currentTarget;
                                            const formData = Object.fromEntries(new FormData(form));
                                            const dateError = validateDates(createStartDate, createEndDate);
                                            if (dateError) {
                                                setCreateErrors({ date: dateError });
                                                return;
                                            }
                                            handleSubmit(formData, createStartDate, createEndDate);
                                            onClose();
                                        }}
                                    >
                                        <Input
                                            name="name"
                                            isRequired
                                            errorMessage="Please enter a valid name"
                                            label="Name"
                                            placeholder="Enter the name of the event"
                                            variant="bordered"
                                        />
                                        <Input
                                            name="description"
                                            isRequired
                                            errorMessage="Please enter a valid description"
                                            label="Description"
                                            placeholder="Enter the description"
                                            variant="bordered"
                                        />
                                        <Input
                                            name="startDate"
                                            isRequired
                                            errorMessage="Please enter a valid startdate"
                                            label="Startdate"
                                            type="datetime-local"
                                            variant="bordered"
                                            // value={createStartDate}
                                            onValueChange={(val) => {
                                                setCreateStartDate(val);
                                                setCreateErrors({ date: validateDates(val, createEndDate) });
                                            }}
                                        />
                                        <Input
                                            name="endDate"
                                            isRequired
                                            errorMessage={createErrors.date ?? "Please enter a valid enddate"}
                                            isInvalid={!!createErrors.date}
                                            label="Enddate"
                                            type="datetime-local"
                                            variant="bordered"
                                            // value={createEndDate}
                                            onValueChange={(val) => {
                                                setCreateEndDate(val);
                                                setCreateErrors({ date: validateDates(createStartDate, val) });
                                            }}
                                        />
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
                                    <Button color="primary" type="submit" form="eventForm">Submit</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                {/* Edit Event Modal */}
                <Modal isOpen={isEditOpen} placement="top-center" onOpenChange={(open) => {
                    onEditChange();
                    if (!open) setCreateErrors({}); // Fehler beim Schließen zurücksetzen
                }} className="dark text-foreground">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Update Event</ModalHeader>
                                <ModalBody>
                                    {editEvent && (
                                        <Form
                                            id="updateForm"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const form = e.currentTarget;
                                                const formData = Object.fromEntries(new FormData(form));
                                                const dateError = validateDates(editStartDate, editEndDate);
                                                if (dateError) {
                                                    setEditErrors({ date: dateError });
                                                    return;
                                                }
                                                handleUpdateSubmit(formData, editStartDate, editEndDate);
                                                onClose();
                                            }}
                                        >
                                            <Input
                                                name="name"
                                                isRequired
                                                errorMessage="Please enter a valid name"
                                                label="Name"
                                                variant="bordered"
                                                defaultValue={editEvent.name}
                                            />
                                            <Input
                                                name="description"
                                                isRequired
                                                errorMessage="Please enter a valid description"
                                                label="Description"
                                                variant="bordered"
                                                defaultValue={editEvent.description}
                                            />
                                            <Input
                                                name="startDate"
                                                isRequired
                                                errorMessage="Please enter a valid startdate"
                                                label="Startdate"
                                                type="datetime-local"
                                                variant="bordered"
                                                // value={editStartDate}
                                                onValueChange={(val) => {
                                                    setEditStartDate(val);
                                                    setEditErrors({ date: validateDates(val, editEndDate) });
                                                }}
                                            />
                                            <Input
                                                name="endDate"
                                                isRequired
                                                errorMessage={editErrors.date ?? "Please enter a valid enddate"}
                                                isInvalid={!!editErrors.date}
                                                label="Enddate"
                                                type="datetime-local"
                                                variant="bordered"
                                                // value={editEndDate}
                                                onValueChange={(val) => {
                                                    setEditEndDate(val);
                                                    setEditErrors({ date: validateDates(editStartDate, val) });
                                                }}
                                            />
                                        </Form>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>Close</Button>
                                    <Button color="primary" type="submit" form="updateForm">Submit</Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </section>
        </DefaultLayout>
    );
}
