import api_client from "@/services/api_client.ts";
import {CreateEventDto, Event, PaginatedEventsResponse} from "@/types/common.ts";

export class EventService {
    static async getAllEvents(tenantId:string, token:string) {
        const authToken = "Bearer " + token

        const response = await api_client.get<PaginatedEventsResponse>("/events", {
            headers: {
                "X-Tenant-Id": tenantId,
                Authorization: authToken
            } })
        console.log(response)
        return response.data
    }

    static async createEvent(tenantId:string, token:string, event: Event) {
        const authToken = "Bearer " + token

        const payload: CreateEventDto = {
            name: event.name,
            type: "no",
            description: event.description,
            estimatedGuests: 0,
            startDate: event.startDate.toISOString(),
            endDate: event.endDate.toISOString(),
            timeZone: "UTC"
        }

        console.log(payload)

        const response = await api_client.post<Event[]>("/events",payload, {
            headers: {
                "X-Tenant-Id": tenantId,
                Authorization: authToken
            }})
        console.log(response)
        return response.data
    }

    static async deleteEvent(tenantId: string, token: string, eventId: string) {
        const authToken = "Bearer " + token

        const response = await api_client.delete<Event[]>("/events/" + eventId, {
            headers: {
                "X-Tenant-Id": tenantId,
                Authorization: authToken
            }})
        console.log(response)
        return response.data
    }

    static async updateEvent(tenantId:string, token:string, event: Event) {
        const authToken = "Bearer " + token

        const payload: CreateEventDto = {
            name: event.name,
            type: "no",
            description: event.description,
            estimatedGuests: 0,
            startDate: event.startDate.toISOString(),
            endDate: event.endDate.toISOString(),
            timeZone: "UTC"
        }

        console.log(payload)

        const response = await api_client.patch<Event[]>("/events/" + event.eventId,payload, {
            headers: {
                "X-Tenant-Id": tenantId,
                Authorization: authToken
            }})
        console.log(response)
        return response.data
    }
}

export default new EventService()