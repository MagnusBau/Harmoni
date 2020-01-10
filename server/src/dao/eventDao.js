// @flow

const Dao = require("./dao.js");

export class EventDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    /**
     * Fetches all events in the database
     * @param callback
     */

    getAllEvent(callback: (status: string, data: string) => void) {
        super.query("CALL get_all_event()", [], callback);
    }
}

