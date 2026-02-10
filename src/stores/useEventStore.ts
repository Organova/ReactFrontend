import {create} from "zustand";
import {Event, PaginatedEventsResponse} from "@/types/common.ts";
import {EventService} from "@/services/eventService.ts";
import useUserStore from "@/stores/useUserStore.ts";

type eventStore = {
    loading: boolean
    error: string
    selectedEvent: Event | null
    events: Event[]
    paginatedEvent: PaginatedEventsResponse | null
    setSelectedEvent: (event: Event) => void
    fetchEvents: () => Promise<boolean>
    createEvent: (event: Event) => Promise<boolean>
    deleteEvent: (eventId: string) => Promise<boolean>
    updateEvent: (event: Event) => Promise<boolean>
}

export default create<eventStore>()((set) => ({
    events: [],
    paginatedEvent: null,
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
            events?.data.map(event => {
               event.endDate = new Date(event.endDate)
               event.startDate = new Date(event.startDate)
            })

            set({
                loading: false,
                events: events?.data,
                paginatedEvent: events
            })

            return true
        }
    },
    createEvent: async (event: Event) => {
        const {tenantId, token} = useUserStore.getState()

        try {
            await EventService.createEvent(tenantId, token, event)
            return true
        } catch (e) {
            // @ts-ignore
            set({error: e.message})
            return false
        }
    },
    deleteEvent: async (eventId: string) => {
        const {tenantId, token} = useUserStore.getState()

        try {
            await EventService.deleteEvent(tenantId, token, eventId)
            return true
        } catch (e) {
            // @ts-ignore
            set({error: e.message})
            return false
        }
    },
    updateEvent: async (event: Event) => {
        const {tenantId, token} = useUserStore.getState()

        try {
            await EventService.updateEvent(tenantId, token, event)
            return true
        } catch (e) {
            // @ts-ignore
            set({error: e.message})
            return false
        }
    }
}))