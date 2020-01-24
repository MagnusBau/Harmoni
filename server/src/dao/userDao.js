// @flow

const Dao = require("./dao.js");

export class UserDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    /**
     * Gets username by id
     * @param userId
     * @param callback
     */
    getUsername(userId: number, callback: (status: string, data: string) => void){
        let values = [userId];
        super.query("CALL get_username(?)",
            values,
            callback);
    }

    /**
     * Check if username is already registered
     * @param username
     * @param callback
     */
    checkUsername(username: string, callback: (status: string, data: string) => void){
        let values = [username];
        super.query("CALL check_username(?)",
            values,
            callback);
    }

    /**
     * Gets password by username
     * @param username
     * @param callback
     */
    getPassword(username: string, callback: (status: string, data: string) => void){
        let values = [username];
        super.query("CALL get_password(?)",
            values,
            callback);
    }

    /**
     * Gets user by username
     * @param username
     * @param callback
     */
    getUser(username: string, callback: (status: string, data: string) => void){
        let values = [username];
        super.query("CALL get_user(?)",
            values,
            callback);
    }

    /**
     * Check and verify username
     * @param username
     * @param callback
     */
    checkAndVerifyArtistUsername(username: string, callback: (status: string, data: string) => void) {
        let values = [username];
        super.query("CALL check_and_verify_artist_username(?)",
            values,
            callback);
    }

    /**
     * Get a user by id
     * @param userId
     * @param callback
     */
    getUserById(userId: number, callback: (status: string, data: string) => void){
        let values = [userId];
        super.query("CALL get_user_by_id(?)",
            values,
            callback);
    }

    /**
     * Get contact by id
     * @param user_id
     * @param callback
     */
    getContact(user_id: number, callback: (status: string, data: string) => void){
        let values = [user_id];
        super.query("CALL get_contact(?)",
            values,
            callback);
    }

    /**
     * Get user by artist Id
     * @param artistId
     * @param callback
     */
    getUserByArtist(artistId: number, callback: (status: string, data: string) => void) {
        let values = [artistId];
        super.query("CALL get_user_by_artist(?)",
            values,
            callback);
    }

    /**
     * Inserts a new user
     * @param data
     * @param contactId
     * @param callback
     */
    postUser(data: Object, contactId: number, callback: (status: string, data: string) => void){
        let values = [data.username, data.password, contactId];
        super.query("CALL post_user(?,?,?)",
            values,
            callback);
    }

    //<DO NOT TOUCH>
    postContact(data, callback: ()=>void) {
        let first_name = data.first_name;
        let last_name = data.last_name;
        let email = data.email;
        let phone = data.phone;
        super.query(
            "INSERT INTO contact(contact_id, first_name, last_name, email, phone) VALUES(default,?,?,?,?)",
            [first_name, last_name, email, phone],
            callback
        );
    }
    //</DO NOT TOUCH>

    /**
     * Update contact on id
     * @param contactId
     * @param data
     * @param callback
     */
    updateContact(contactId: number, data: Object, callback: (status: string, data: string) => void){
        let values = [contactId, data.first_name, data.last_name, data.email, data.phone];
        super.query("CALL put_contact(?,?,?,?,?)",
            values,
            callback);
    }

    /**
     * Update password on id
     * @param userId
     * @param hash
     * @param callback
     */
    updatePassword(userId: number, hash: string, callback: (status: string, data: string) => void){
        let values = [userId, hash];
        super.query("CALL put_password(?,?)",
            values,
            callback);
    }

    /**
     * Get username by contact id
     * @param contactId
     * @param callback
     */
    getOrganizerUsername(contactId: number, callback: (status: string, data: string) => void){
        let value = [contactId];
        super.query("CALL get_organizer_username(?)", value, callback);
    }
}
