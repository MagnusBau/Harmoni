
// @flow

import axios from 'axios';

export class Event {
    event_id: number;
    title: string;
    location: string;
    start_time: string;
    end_time: string;
    category: string;
    capacity: number;
    organizer: number;
    cancelled: boolean;

    constructor(
        eventId: number,
        title: string,
        location: string,
        startTime: string,
        endTime: string,
        category: string,
        capacity: number,
        organizer: number,
        canceled: true)
    {

        this.event_id = eventId;
        this.title = title;
        this.location = location;
        this.start_time = startTime;
        this.end_time = endTime;
        this.category = category;
        this.capacity = capacity;
        this.organizer = organizer;
        this.canceled = canceled;
    }

}

class CancelEventService {

    cancelEvent(event: Event, eventId: number) {
        return axios.put('http://localhost:4000/api/cancelevent/' + eventId, event).then(response => response.data);
    }

}

export let cancelEventService = new CancelEventService();