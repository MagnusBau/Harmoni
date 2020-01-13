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

    getEventById(event_id: number, callback: (status: string, data:string) => void) {
        let values = [event_id];
        super.query("CALL get_event_by_id(?)", values, callback);
    }

    getEventByName(name: string, callback: (status: string, data: string) => void) {
        let values = [name];
        super.query("CALL get_event_by_name(?)", values, callback);
    }

    updateEvent(json: Object, event_id: number, callback: (status: string, data: string) => void) {
        let eventUpdate = [json.title, json.description, json.location, json.start_time, json.end_time, json.category, json.capacity, json.organizer, event_id];
        console.log("Updated entire event: ", eventUpdate);
        super.query("CALL update_event(?,?,?,?,?,?,?,?,?)")

    }

    updateEventTitle(json: Object, callback: (status: string, data: string) => void ) {
        let newTitle = [json.title];
        console.log("new title: ", newTitle);
        super.query("CALL update_event_title(?)", newTitle, callback);
    }

    updateEventDescription(json: Object, callback: (status: string, data: string) => void) {
        let newDescription = [json.description];
        console.log("New description: ", newDescription);
        super.query("CALL update_event_description(?)", newDescription, callback);
    }

    updateEventLocation(json: Object, callback: (status: string, data: string) => void) {
        let newLocation = [json.location];
        console.log("New location: ", newLocation);
        super.query("CALL update_event_location(?)", newLocation, callback);
    }

    updateEventStartTime(json: Object, callback: (status: string, data:string) => void) {
        let newStartTime = [json.start_time];
        console.log("New Start time: ", newStartTime);
        super.query("CALL update_event_start_time(?)", newStartTime, callback);
    }

    updateEventEndTime(json: Object, callback: (status: string, data: string) => void) {
        let newEndTime = [json.end_time];
        console.log("New end time: ", newEndTime);
        super.query("CALL update_event_end_time(?)", newEndTime, callback);
    }

    updateEventCategory(json: Object, callback: (status: string, data: string) => void) {
        let newCategory = [json.category];
        console.log("New Category: ", newCategory);
        super.query("CALL update_event_category(?)", newCategory, callback);
    }

    updateEventCapacity(json: Object, callback: (status: string, data: string) => void) {
        let newCapacity = [json.capacity];
        console.log("New capacity: ", newCapacity);
        super.query("CALL update_event_capacity(?)", newCapacity, callback);
    }
}