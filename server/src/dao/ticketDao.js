//@flow

let Dao = require("./dao.js");

export class TicketDAO extends Dao {
    constructor(pool) {
        super(pool);

    }

    /**
     * Inserts one ticket
     * @param json
     * @param callback
     */
    createOne( json : Object,
               callback: (status: string, data: string) => void) {
        let values = [json.title, json.info, json.price, json.count, json.event];
        super.query("CALL create_one_ticket(?,?,?,?,?)",
            values,
            callback);
    }

    /**
     * Fetches all tickets
     * @param event
     * @param callback
     */
    getAll(event : number, callback: (status: string, data: string) => void){
        let values = [event];
        super.query("CALL get_all_ticket(?)",
            values,
            callback);
    }

    /**
     * Gets one ticket by Id
     * @param ticket_id
     * @param callback
     */
    getOne(ticket_id: number, callback: (status: string, data: string) => void) {
        let values = [ticket_id];
        super.query("CALL select_one_ticket_byId(?)",
            values,
            callback);
    }

    /**
     * Update one ticket on id
     * @param json
     * @param callback
     */
    updateOneTicket(json: Object, callback : () => void){
        let val = [json.title, json.info, json.price, json.count, json.ticket_id];
        super.query("CALL update_one_ticket(?,?,?,?,?)",
            val, callback);
    }

    /**
     * Removes one ticket
     * @param id
     * @param callback
     */
    removeOneTicket(id: number, callback:()=> void){
        super.query(
            "CALL delete_one_ticket(?)",
            [id],
            callback
        )
    }
}


