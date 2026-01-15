import {create} from "zustand";
import {Event} from "@/types/common.ts";

type eventStore = {
    loading: boolean
    error: string
    selectedEvent: Event | null
    events: Event[]
    setSelectedEvent: (event: Event) => void
    fetchEvents: () => void
}

export default create<eventStore>((set) => ({
    events: [],
    selectedEvent: null,
    loading: false,
    error: "",
    setSelectedEvent: (event: Event) => {set({selectedEvent: event})},
    fetchEvents: () => {
        set({loading: true})
    }
}))