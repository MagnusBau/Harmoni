// @flow

const Dao = require("./dao.js");

export class riderDAO extends Dao{

    postRider(data: Object, callback: (status: string, data: string) => void){
        let values = [data.description, data.document];
        super.query("CALL post_rider",
            values,
            callback);
    }

    getRider(id: number, callback: (status: string, data: string) => void){
        let values = [id];
        super.query("CALL get_rider",
            values,
            callback);
    }

    getAllRiders(document: number, callback: (status: string, data: string) => void){
        let values = [document];
        super.query("CALL get_all_riders",
            values,
            callback);
    }

    updateRider(description: string, id: number, callback: (status: string, data: string) => void){
        let values = [description, id];
        super.query("CALL update_rider",
            values,
            callback);
    }

    deleteRider(id: number, callback: (status: string, data: string) => void){
        let values = [id];
        super.query("CALL delete_rider",
            values,
            callback);
    }

    deleteAllRiders(document: number, callback: (status: string, data: string) => void){
        let values = [document];
        super.query("CALL delete_all_riders",
            values,
            callback);
    }
}