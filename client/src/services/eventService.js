// @flow

import axios from "axios";

export class Event {
    event_id: number;
    title: string;
    location: string;
    start_time: string;
    end_time: string;
    category: string;
    capacity: number;
    organizer: string;
}

class EventService {
    getEvents() {
        return axios
            .get("http://localhost:4000/api/event/")
            .then(response => response.data)
            .catch(error => console.log("error" + error));
    }
}

export let eventService = new EventService();