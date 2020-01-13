// @flow

const Dao = require('./dao.js');

export class EventDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    createEvent(json: Object, callback: (status: string, data: string) => void) {
        let newEvent = [json.title, json.description, json.location, json.start_time, json.end_time, json.category, json.capacity, json.organizer];
        console.log('event', newEvent);
        super.query("CALL create_event(?,?,?,?,?,?,?,?)", newEvent, callback)
    }

    getAllEvents(callback: (status: string, data: string) => void) {
        super.query("CALL get_all_events", [], callback);
    }

    getEventById(eventId: number, callback: (status: string, data:string) => void) {
        let values = [eventId];
        super.query("CALL get_event_by_id(?)", values, callback);
    }

    getEventByName(name: string, callback: (status: string, data: string) => void) {
        let values = [name];
        super.query("CALL get_event_by_name(?)", values, callback);
    }
}

