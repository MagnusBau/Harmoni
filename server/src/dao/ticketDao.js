//@flow

let Dao = require("./dao.js");

export class ticketDAO extends Dao {
    constructor(pool) {
        super(pool);

    }

    createOne(title: string, info: string, price: number, count: number,
              callback: (status: string, data: string) => void) {
        let values = [title, info, price, count];
        super.query("CALL create_one_ticket(?,?,?,?)",
            values,
            callback);
    }


    getAll(callback: (status: string, data: string) => void){
        super.query("CALL get_all_ticket()",
            [],
            callback);
    }

    updateOneTicket(json: Object, callback : () => void){
        let val = [json.title, json.info, json.price, json.count, json.ticket_id];
        super.query("CALL update_one_ticket(?,?,?,?,?)",
        val,callback);
    }

    removeOneTicket(id: number, callback:()=> void){
        super.query(
            "CALL delete_one_ticket(?)",
            [id],
            callback
        )
    }



}


