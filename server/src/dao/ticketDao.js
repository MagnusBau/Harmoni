//@flow

let Dao = require("./dao.js");

export class ticketDAO extends Dao {
    constructor(pool) {
        super(pool);

    }

    createOne(title: string, info: string, price: number, count: number,
              callback: (status: string, data: string) => void) {
        let values = [title, info, price, count];
        super.query("CALL create_one_ticket(?)",
            values,
            callback);
    }

}


