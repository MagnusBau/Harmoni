// @flow

const Dao = require('./dao.js');

export class EventDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    /**
     * Inserts a new event into the database
     * @param json
     * @param callback
     */
    createEvent(json: Object, callback: (status: string, data: string) => void) {
        let newEvent = [json.title, json.description, json.location, json.start_time, json.end_time, json.category, json.capacity, json.organizer, json.image];
        console.log('event', newEvent);
        super.query("CALL create_event(?,?,?,?,?,?,?,?,?)", newEvent, callback)
    }

    /**
     * Retrieves all events from the database
     * @param callback
     */
    getAllEvents(callback: (status: string, data: string) => void) {
        super.query("CALL get_all_events", [], callback);
    }

    /**
     * Gets all events meant to be displayed on the front page
     * @param callback
     */
    getFrontpageEvents(callback: (status: string, data: string) => void) {
        super.query("CALL get_frontpage_events", [], callback);
    }

    //TODO lage query i db
    //TODO lage test
    /**
     * Get events by a search
     * @param input
     * @param callback
     */
    getEventByInput(input: string, callback: (status: string, data: string) => void) {
        let values = [input];
        super.query("CALL get_all_events_by_input(?)", values, callback);
    }

    /**
     * Gets one event by id
     * @param eventId
     * @param callback
     */
    getEventById(eventId: number, callback: (status: string, data:string) => void) {
        let values = [eventId];
        super.query("CALL get_event_by_id(?)", values, callback);
    }

    /**
     * Gets one event by id UPDATE
     * @param event_id
     * @param callback
     */
    getEventByIdUpdate(event_id: number, callback: (status: string, data:string) => void) {
        let values = [event_id];
        super.query("CALL get_event_by_id_update(?)", values, callback);
    }

    getEventByName(name: string, callback: (status: string, data: string) => void) {
        let values = [name];
        super.query("CALL get_event_by_name(?)", values, callback);
    }

    getEventByUser(organizer: number, callback: (status: string, data: string) => void) {
        let values = [organizer];
        super.query("CALL get_events_by_user(?)",
            values,
            callback);
    }

    getLastEventByUser(organizer: number, callback: (status: string, data: string) => void) {
        let values = [organizer];
        super.query("CALL get_last_events_by_user(?)",
            values,
            callback);
    }

    getEndedEventsByUser(organizer: number, callback: (status: string, data: string) => void) {
        let values = [organizer];
        super.query("CALL get_events_by_end_time_user(?)",
            values,
            callback);
    }

    getEventsByCancelled(cancelled: boolean, callback: (status: string, data: string) => void) {
        let values = [cancelled];
        super.query("CALL get_events_by_cancelled(?)",
            values,
            callback);
    }

    deleteEvent(event_id: number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL delete_event(?)",
            values,
            callback);
    }

    deleteEventsByEndTime(organizer: number, callback: (status: string, data: string) => void) {
        let values = [organizer];
        super.query("CALL delete_events_by_end_time(?)",
            values,
            callback);
    }

    cancelEvent(event_id : number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL cancel_event_by_id(?)",
            values,
            callback);
    }

    getDocumentByEvent(event_id: number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL get_document_by_event(?)",
            values,
            callback);
    }

    getCancelledEventInfo(event_id: number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL get_cancelled_event_email_info(?)",
            values,
            callback);
    }

    updateEvent(event_id: number, json: Object, callback: (status: string, data: string) => void) {
        let eventUpdate = [json.title, json.description, json.location, json.start_time, json.end_time, json.category, json.capacity, json.organizer, json.event_id];
        console.log("Updated entire event: ", eventUpdate);
        super.query("CALL update_event(?,?,?,?,?,?,?,?,?)", eventUpdate, callback);

    }

    getDocumentByEvent(event_id: number, callback: (status: string, data: string) => void) {
        let values = [event_id];
        super.query("CALL get_document_by_event(?)",
            values,
            callback);
    }


    updateEventTitle(json: Object, event_id: number, callback: (status: string, data: string) => void ) {
        let newTitle = [json.title, event_id];
        console.log("new title: ", newTitle);
        super.query("CALL update_event_title(?, ?)", newTitle, callback);
    }

    updateEventDescription(json: Object, event_id: number, callback: (status: string, data: string) => void) {
        let newDescription = [json.description, event_id];
        console.log("New description: ", newDescription);
        super.query("CALL update_event_description(?, ?)", newDescription, callback);
    }

    updateEventLocation(json: Object, event_id: number, callback: (status: string, data: string) => void) {
        let newLocation = [json.location, event_id];
        console.log("New location: ", newLocation);
        super.query("CALL update_event_location(?, ?)", newLocation, callback);
    }

    updateEventStartTime(json: Object, event_id: number, callback: (status: string, data:string) => void) {
        let newStartTime = [json.start_time, event_id];
        console.log("New Start time: ", newStartTime);
        super.query("CALL update_event_start_time(?, ?)", newStartTime, callback);
    }

    updateEventEndTime(json: Object, event_id: number, callback: (status: string, data: string) => void) {
        let newEndTime = [json.end_time, event_id];
        console.log("New end time: ", newEndTime);
        super.query("CALL update_event_end_time(?, ?)", newEndTime, callback);
    }

    updateEventCategory(json: Object, event_id: number, callback: (status: string, data: string) => void) {
        let newCategory = [json.category, event_id];
        console.log("New Category: ", newCategory);
        super.query("CALL update_event_category(?, ?)", newCategory, callback);
    }

    updateEventCapacity(json: Object, event_id: number, callback: (status: string, data: string) => void) {
        let newCapacity = [json.capacity, event_id];
        console.log("New capacity: ", newCapacity);
        super.query("CALL update_event_capacity(?, ?)", newCapacity, callback);
    }

    getCategories(callback: (status: string, data: string) => void) {
        super.query("CALL get_categories()", [], callback);
    }

    getEventsByUsername(username: string, callback: (status: string, data:string) => void) {
        let user = [username];
        super.query("CALL get_events_by_username(?)", user, callback);
    }

    postImageToEvent(data, callback: (status: string, data: string) => void) {
        let values = [data.image, data.eventId];
        super.query("CALL post_image_to_event(?,?)",
            values,
            callback);
    }
}