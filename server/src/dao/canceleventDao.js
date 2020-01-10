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
}