// @flow

import axios from 'axios';
import {TEvent} from "../Types/TEvent";

axios.interceptors.response.use(response => response.data);

type EventContainer = TEvent;

class EventService {
    getEvent
}