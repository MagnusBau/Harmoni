// @flow

import axios from 'axios';
import {TEvent} from "../Types/TEvent";

axios.interceptors.response.use(response => response.data);

type EventContainer = TEvent;

class EventService {
    getEventID(eventID: number): Event[] {
        return axios.get<Event[]>("http://localhost:4000/event/?event_id=${eventID}");
    }
}