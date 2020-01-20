// @flow

const Dao = require("./dao.js");

export class FileInfoDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    /**
     * Get one fileInfo
     * @param document_id
     * @param callback
     */
    getFileInfoById(document_id: number, callback: (status: string, data: string) => void) {
        let values = [document_id];
        super.query("CALL get_document_by_id(?)",
            values,
            callback);
    }

    /**
     * Get all fileInfo by event
     * @param event
     * @param callback
     */
    getFileInfoByEvent(event: number, callback: (status: string, data: string) => void) {
        let values = [event];
        super.query("CALL get_document_by_event(?)",
            values,
            callback);
    }

    //<DO NOT TOUCH>
    postFileInfo(data, callback: ()=>void) {
        console.log("data.name: " + data.name);
        console.log("data.eventId: " + data.eventId);
        let name = JSON.stringify(data.name);
        let eventId = number.parseInt(data.eventId);
        super.query(
            "INSERT INTO document(document_id, name, path, event) VALUES(default,?,default,?)",
            [name, eventId],
            callback
        );
    }
    //</DO NOT TOUCH>

}