import api_client from "@/services/api_client.ts";

export class EventService {
    async getAllEvents() {
        const response = await api_client.get<Event[]>("/events")
        return response.data
    }
}