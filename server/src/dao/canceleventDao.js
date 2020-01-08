// @flow

const Dao = require("./dao.js");

export class CancelEventDao extends Dao {
    constructor(pool) {
        super(pool);
    }

    cancelEvent(event_id: number, callback: (status: string, data: string) => void) {

        let values = [event_id];
        super.query("CALL cancel_event_by_id(?)",
            values,
            callback);

    }
}