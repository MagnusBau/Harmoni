// @flow

import axios from 'axios';
import {TEvent} from "../Types/TEvent";

axios.interceptors.response.use(response => response.data);

type EventContainer = TEvent;

export class CreateEvent {
    title: string;
    location: string;
    description: string;
    start_time: string;
    end_time: string;
    category: string;
    capacity: number;
    organizer: number;
}

export class EventService {
    getEventID(eventID: number): Event[] {
        return axios.get<Event[]>("http://localhost:4000/event/?event_id=${eventID}").then(response => response.data);
    }

    getEventByName(name: string): Promise<Event[]> {
        return axios.get('/' + name).then(response => response.data);
    }

    createEvent(createEvent: CreateEvent): Promise<void> {
        return axios.post('/', createEvent).then(response => response.data);
    }
}

export let eventService = new EventService();