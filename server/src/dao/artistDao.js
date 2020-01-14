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
        super.query("CALL insert_artist(?, ?, ?, ?, ?)",
            values,
            callback);
    }

    updateArtist(artistId: string, artistName: string, firstName: string, lastName: string, email: string, phone: string,
                 callback: (status: string, data: string) => void) {
        let values = [artistId, artistName, firstName, lastName, email, phone];
        super.query("CALL update_artist(?, ?, ?, ?, ?, ?, ?)",
            values,
            callback);
    }

    deleteArtist(artistId: string, result: number, callback: (status: string, data: string) => void) {
        let values= [artistId, result];
        super.query("CALL delete_artist(?, ?)",
            values,
            callback);
    }

    getAllArtists(callback: (status: string, data: string) => void) {
        super.query("CALL get_all_artists()",
            [],
            callback);
    }

    getArtistById(artistId: string, callback: (status: string, data: string) => void) {
        let values= [artistId];
        super.query("CALL get_artist_by_id(?)",
            values,
            callback);
    }

    getArtistBySearch(searchString: string, callback: (status: string, data: string) => void) {
        let values = [searchString];
        super.query("CALL get_artist_by_search(?)",
            values,
            callback);
    }
}
