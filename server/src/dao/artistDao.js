// @flow

const Dao = require("./dao.js");

export class ArtistDAO extends Dao {
    constructor(pool) {
        super(pool);
    }

    /**
     * Inserts a new artist
     * @param artistName
     * @param firstName
     * @param lastName
     * @param email
     * @param phone
     * @param callback
     */
    insertArtist(artistName: string, firstName: string, lastName: string, email: string, phone: string, callback: (status: string, data: string) => void) {
        let values = [artistName, firstName, lastName, email, phone];
        super.query("CALL insert_artist(?, ?, ?, ?, ?, @a)",
            values,
            callback);
    }

    /**
     * Creates and binds a new artist on an existing contact
     * @param artistName
     * @param contactId
     * @param callback
     */
    createArtistOnContact(artistName: string, contactId: number, callback: (status: string, data: string) => void) {
        let values = [artistName, contactId];
        super.query("CALL create_artist_on_contact(?, ?)",
            values,
            callback);
    }

    /**
     * Get all artists that have previously had a contract with the specified contact id
     * @param contactId
     * @param callback
     */
    getArtistByPreviousContract(contactId: number, callback: (status: string, data: string) => void) {
        let values = [contactId];
        super.query("CALL get_artist_by_previous_contract(?)",
            values,
            callback);
    }


    /**
     * Deletes an existing artist on artist Id
     * @param artistId
     * @param result
     * @param callback
     */
    deleteArtist(artistId: string, result: number, callback: (status: string, data: string) => void) {
        let values= [artistId, result];
        super.query("CALL delete_artist(?, ?)",
            values,
            callback);
    }

    /**
     * Gets all artists in the database
     * @param callback
     */
    getAllArtists(callback: (status: string, data: string) => void) {
        super.query("CALL get_all_artists()",
            [],
            callback);
    }

    /**
     * Gets one artist by id
     * @param artistId
     * @param callback
     */
    getArtistById(artistId: string, callback: (status: string, data: string) => void) {
        let values= [artistId];
        super.query("CALL get_artist_by_id(?)",
            values,
            callback);
    }

    /**
     * Gets artist bound to contact
     * @param contactId
     * @param callback
     */
    getArtistByContact(contactId: string, callback: (status: string, data: string) => void) {
        let values= [contactId];
        super.query("CALL get_artist_by_contact(?)",
            values,
            callback);
    }

    /**
     * Gets artists by a search string
     * @param searchString
     * @param callback
     */
    getArtistBySearch(searchString: string, callback: (status: string, data: string) => void) {
        let values = [searchString];
        super.query("CALL get_artist_by_search(?)",
            values,
            callback);
    }

    /**
     * Get artist by a user Id
     * @param userId
     * @param callback
     */
    getArtistByUser(userId: number, callback: (status: string, data: string) => void) {
        let values = [userId];
        super.query("CALL get_artist_by_user(?)",
            values,
            callback);
    }

    /**
     * Get all artists attached to an event
     * @param eventId
     * @param callback
     */
    getArtistByEvent(eventId: number, callback: (status: string, data: string) => void) {
        let values = [eventId];
        super.query("CALL get_artist_by_event(?)",
            values,
            callback);
    }

    /**
     * Adds an artist to an event with an existing contract
     * @param artistName
     * @param firstName
     * @param lastName
     * @param email
     * @param phone
     * @param documentId
     * @param callback
     */
    addArtistToEvent(artistName: string, firstName: string, lastName: string, email: string, phone: string,
                     documentId: number, callback: (status: string, data: string) => void) {
        let values= [artistName, firstName, lastName, email, phone, documentId];
        super.query("CALL add_artist_to_event(?,?,?,?,?,?)",
            values,
            callback);
    }

    /**
     * Adds an artist to an event with a new contract
     * @param data
     * @param callback
     */
    addArtistWithNewContract(data, callback: (status: string, data: string) => void) {
        let values = [data.artist_name, data.first_name, data.last_name, data.email, data.phone, data.name, data.eventId, data.path];
        super.query("CALL add_artist_with_new_contract(?,?,?,?,?,?,?,?)",
            values,
            callback);
    }

    /**
     * Removes the contract an artist has with an event
     * @param eventId
     * @param artistId
     * @param callback
     */
    removeArtistFromEvent(eventId: number, artistId: number, callback: (status: string, data: string) => void) {
        let values = [eventId, artistId];
        super.query("CALL remove_artist_from_event(?,?)",
            values,
            callback);
    }
}
