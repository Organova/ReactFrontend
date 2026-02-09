import {create} from "zustand";
import {Event} from "@/types/common.ts";
import {EventService} from "@/services/eventService.ts";
import useUserStore from "@/stores/useUserStore.ts";

type eventStore = {
    loading: boolean
    error: string
    selectedEvent: Event | null
    events: Event[] | undefined
    setSelectedEvent: (event: Event) => void
    fetchEvents: () => void
    createEvent: (event: Event) => void
    deleteEvent: (eventId: number) => void
}

export default create<eventStore>((set) => ({
    events: [],
    selectedEvent: null,
    loading: false,
    error: "",
    setSelectedEvent: (event: Event) => {set({selectedEvent: event})},
    fetchEvents: async () => {
        const {tenantId, token} = useUserStore.getState()

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
    createEvent: async (event: Event) => {
        const {tenantId, token} = useUserStore.getState()

        try {
            EventService.createEvent(tenantId, token, event)
        } catch (e) {
            // @ts-ignore
            set({error: e.message})
        }
    },
    deleteEvent: async (eventId: number) => {
        const {tenantId, token} = useUserStore.getState()

        try {
            EventService.deleteEvent(tenantId, token, eventId)
        } catch (e) {
            // @ts-ignore
            set({error: e.message})
        }
    }
}))