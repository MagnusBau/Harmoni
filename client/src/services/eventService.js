// @flow

import axios from 'axios';
import {TEvent} from "../Types/TEvent";

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
}

class EventService {
    getAllEvents() {
        return axios
            .get("http://localhost:4000/api/event")
            .then(response => response.data)
            .catch(error => console.log("error" + error));
    }

    getEventID(eventID: number): Event[] {
        return axios.get<Event[]>("http://localhost:4000/api/event/?event_id=${eventID}").then(response => response.data);
    }

    getEventByName(name: string): Promise<Event[]> {
        return axios.get('/' + name).then(response => response.data);
    }

    createEvent(createEvent: Event): Promise<void> {
        return axios.post("http://localhost:4000/api/event", createEvent).then(response => response.data);
    }
}

export let eventService = new EventService();