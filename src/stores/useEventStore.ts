import {create} from "zustand";
import {Event} from "@/types/common.ts";
import {EventService} from "@/services/eventService.ts";

type eventStore = {
    loading: boolean
    error: string
    selectedEvent: Event | null
    events: Event[] | undefined
    setSelectedEvent: (event: Event) => void
    fetchEvents: (tenantId: string, token: string) => void
    createEvent: (tenantId: string, token: string, event: Event) => void
}

export default create<eventStore>((set) => ({
    events: [],
    selectedEvent: null,
    loading: false,
    error: "",
    setSelectedEvent: (event: Event) => {set({selectedEvent: event})},
    fetchEvents: async (tenantId: string, token: string) => {
        set({loading: true})
        let events
        try {
            events = await EventService.getAllEvents(tenantId, token)
            console.log("Store " + events)
        } catch (e) {
            // @ts-ignore
            set({error: e.message})
        } finally {
            set({
                loading: false,
                events: events
            })
        }
    },
    createEvent: async (tenantId: string, token: string, event: Event) => {
        try {
            EventService.createEvent(tenantId, token, event)
        } catch (e) {
            // @ts-ignore
            set({error: e.message})
        }
    }
}))