// @flow

const Dao = require("./dao.js");

export class CancelEventDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    getCancelledEvents(callback: (status: string, data: string) => void) {

        super.query("CALL get_cancelled_events()",
            [],
            callback);

    }

    cancelEvent(json : Object, callback: (status: string, data: string) => void) {

        let values = [json.event_id];
        super.query("CALL cancel_event_by_id(?)",
            values,
            callback);

    }

    getFrontpageEvents(callback: (status: string, data: string) => void) {

        super.query("CALL get_frontpage_events()",
            [],
            callback);
    }

    getCancelledEventInfo(event_id: number, callback: (status: string, data: string) => void) {

        let values = [event_id];
        super.query("CALL get_cancelled_event_email_info(?)",
            values,
            callback);

    }
}