const Dao = require('./Dao.js');

export class EventDao extends Dao {
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
}
;