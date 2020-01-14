// @flow

const Dao = require("./dao.js");

export class RiderDAO extends Dao{
    constructor(pool) {
        super(pool);
    }

    /**
     * Inserts a new rider
     * @param json
     * @param callback
     */
    postRider(json: Object, callback: (status: string, data: string) => void){
        let values = [json.description, json.document];
        super.query("CALL post_rider(?,?)",
            values,
            callback);
    }

    /**
     * fetch a rider by id
     * @param id
     * @param callback
     */
    getRider(id: number, callback: (status: string, data: string) => void){
        let values = [id];
        super.query("CALL get_rider(?)",
            values,
            callback);
    }

    /**
     * fetch riders by document id
     * @param document
     * @param callback
     */
    getAllRiders(document: number, callback: (status: string, data: string) => void){
        let values = [document];
        super.query("CALL get_all_riders(?)",
            values,
            callback);
    }

    /**
     * update a rider by id
     * @param json
     * @param callback
     */
    updateRider(json: Object, callback: (status: string, data: string) => void){
        let values = [json.description, json.rider_id];
        super.query("CALL update_rider(?,?)",
            values, callback);
    }

    /**
     * deletes a rider by id
     * @param id
     * @param callback
     */
    deleteRider(id: number, callback: (status: string, data: string) => void){
        let values = [id];
        super.query("CALL delete_rider(?)",
            values,
            callback);
    }

    /**
     * delete riders by document id
     * @param document
     * @param callback
     */
    deleteAllRiders(document: number, callback: (status: string, data: string) => void){
        let values = [document];
        super.query("CALL delete_all_riders(?)",
            values,
            callback);
    }
}