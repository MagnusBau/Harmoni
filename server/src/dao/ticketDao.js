//@flow

let Dao = require("./dao.js");

export class TicketDAO extends Dao {
    constructor(pool) {
        super(pool);

    }

    createOne( json : Object,
              callback: (status: string, data: string) => void) {
        let values = [json.title, json.info, json.price, json.count];
        super.query("CALL create_one_ticket(?,?,?,?)",
            values,
            callback);
    }


    getAll(callback: (status: string, data: string) => void){
        super.query("CALL get_all_ticket()",
            [],
            callback);
    }

    getOne(ticket_id: number, callback: (status: string, data: string) => void) {
        let values = [ticket_id];
        super.query("CALL select_one_ticket_byId(?)",
            values,
            callback);
    }


        updateOneTicket(json: Object, callback : () => void){
        let val = [json.title, json.info, json.price, json.count, json.ticket_id];
        super.query("CALL update_one_ticket(?,?,?,?,?)",
        val, callback);
    }

    removeOneTicket(id: number, callback:()=> void){
        super.query(
            "CALL delete_one_ticket(?)",
            [id],
            callback
        )
    }



}


