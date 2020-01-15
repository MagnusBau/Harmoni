// @flow

import axios from 'axios';
import {TEvent} from "../Types/TEvent";
import {Contact} from "./TempCancelEventService";

//axios.interceptors.response.use(response => response.data);

type EventContainer = TEvent;

export class Event {
    event_id: number;
    title: string;
    location: string;
    description: string;
    start_time: string;
    end_time: string;
    category: string;
    capacity: number;
    organizer: number;
    organizer_name: string;
    cancelled: number;

}

class EventService {
    getAllEvents() {
        return axios
            .get("http://localhost:4000/api/event")
            .then(response => response.data)
            .catch(error => console.log("error" + error));
    }

    getEventById(eventId: number): Event[] {
        return axios.get<Event[]>(`http://localhost:4000/api/event/` + eventId).then(response => response.data);
    }

    getEventByName(name: string): Promise<Event[]> {
        return axios.get('/' + name).then(response => response.data);
    }

    getEventByUser(userId: number): Event[] {
        return axios.get<Event[]>('http://localhost:4000/api/event/user/' + userId).then(response => response.data);
    }

    createEvent(createEvent: Event): Promise<void> {
        return axios.post("http://localhost:4000/api/event", createEvent).then(response => response.data);
    }

    getCancelledEvents() {
        return axios.get<Event[]>('http://localhost:4000/api/event?cancelled=true').then(response => response.data);
    }

    deleteEvent(eventId: number) {
        return axios.delete<Event>('http://localhost:4000/api/event/' + eventId).then(response => response.data);
    }

    cancelEvent(eventId: number) {
        return axios.put(`http://localhost:4000/api/event/${eventId}/cancel`).then(response => response.data);
    }

    //Temp add
    getFrontpageEvents() {
        return axios.get<Event[]>('http://localhost:4000/api/event').then(response => response.data);
    }

    /*
    getCancelledEventInfo(eventId: number) {
        return axios.get<Contact>(`http://localhost:4000/api/event/${eventId}/email`).then(response => response.data);
    }
     */
}

export let eventService = new EventService();