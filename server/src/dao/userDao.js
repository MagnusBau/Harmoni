// @flow

const Dao = require("./dao.js");

export class UserDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    register(data: Object, callback: (status: string, data: string) => void){
        let values = [data.username, data.password, data.email, data.first_name, data.last_name, data.phone];
        super.query("CALL register_user(?,?,?,?,?,?)",
            values,
            callback);
}

    getUsername(userId: number, callback: (status: string, data: string) => void){
        let values = [userId];
        super.query("CALL get_username(?)",
            values,
            callback);
    }

    getPassword(username: string, callback: (status: string, data: string) => void){
        let values = [username];
        super.query("CALL get_password(?)",
            values,
            callback);
    }

    getUser(username: string, callback: (status: string, data: string) => void){
        let values = [username];
        super.query("CALL get_user(?)",
            values,
            callback);
    }


}