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

    getEventsByCancelled(cancelled: boolean, callback: (status: string, data: string) => void) {
        let values = [cancelled];
        super.query("CALL get_events_by_cancelled(?)",
            values,
            callback);
    }

    cancelEvent(event_id : number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL cancel_event_by_id(?)",
            values,
            callback);
    }

    getCancelledEventInfo(event_id: number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL get_cancelled_event_email_info(?)",
            values,
            callback);
    }

    getDocumentByEvent(event_id: number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL get_document_by_event(?)",
            values,
            callback);
    }
}