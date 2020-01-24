//@flow

import {ArtistDAO} from "../dao/artistDao";
import {UserDAO} from "../dao/userDao";
const pool = require("../server");
const artistDao = new ArtistDAO(pool);
const userDao = new UserDAO(pool);

exports.insertArtist = (req, res, next) => {
    console.log(`Got request from client: POST /api/artist`);
    if (req.body.userId) {
        userDao.getContact(req.body.userId, (err, contact) => {
            artistDao.createArtistOnContact(req.body.artistName,contact[0][0].contact_id, (err, rows) => {
                res.send(rows);
            });
        });
    } else {
        artistDao.insertArtist(req.body.artistName, req.body.firstName, req.body.lastName, req.body.email, req.body.phone, (err, rows) => {
            res.send(rows);
        });
    }
};



exports.deleteArtist = (req, res, next) => {
    console.log(`Got request from client: DELETE /api/artist/${req.params.artistId}`);

    artistDao.deleteArtist(req.params.artistId, (err, rows) => {
        res.send(rows);
    });
};

exports.getAllArtists = (req, res, next) => {
    console.log(`Got request from client: GET /api/artist`);

    if (req.query.contact) {
        artistDao.getArtistByPreviousContract(req.query.contact, (err, rows) => {
            res.send(rows);
        });
    } else if (req.query.searchBar) {
        artistDao.getArtistBySearch(req.query.searchBar, (err, rows) => {
            res.send(rows);
        });
    } else {
        artistDao.getAllArtists((err, rows) => {
            res.send(rows);
        });
    }
};

exports.getArtistById = (req, res, next) => {
    console.log(`Got request from client: GET /api/artist/${req.params.artistId}`);

    artistDao.getArtistById(req.params.artistId, (err, rows) => {
        res.send(rows);
    })
};
exports.getArtistByContact = (req, res, next) => {
    console.log(`Got request from client: GET /api/artist/${req.params.contactId}`);

    artistDao.getArtistByContact(req.params.contactId, (err, rows) => {
        res.send(rows);
    })
};

exports.getArtistByUser = (req, res, next) => {
    console.log(`Got request from client: GET /api/artist/user/${req.params.userId}`);

    artistDao.getArtistByUser(req.params.userId, (err, rows) => {
        res.send(rows);
    });
};

exports.getArtistByEvent = (req, res, next) => {
    console.log(`Got request from client: GET /api/event/${req.params.eventId}/artist`);

    artistDao.getArtistByEvent(req.params.eventId, (err, rows) => {
        res.send(rows);
    })
};

exports.addArtistToEvent = (req, res, next) => {
    console.log(`Got request from client: GET /api/event/${req.params.eventId}/artist`);

    artistDao.addArtistToEvent(req.body.artist_name, req.body.first_name, req.body.last_name, req.body.email,
                                req.body.phone, req.body.document_id, (err, rows) => {
        res.send(rows);
    })
};

exports.removeArtistFromEvent = (req, res, next) => {
    console.log(`Got request from client: DELETE /api/event/${req.params.eventId}/artist/${req.params.artistId}`);

    artistDao.removeArtistFromEvent(req.params.eventId, req.params.artistId, (err, rows) => {
        res.send(rows);
    })
};

exports.addArtistWithNewContract = (req, res, next) => {
    console.log(`Got request from client: POST /api/event/${req.params.eventId}/artist/contract`);
    let data = {
        "name": req.body.name,
        "eventId": req.params.eventId,
        "path": req.body.path,
        "artist_name": req.body.artist_name,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "phone": req.body.phone
    };
    artistDao.addArtistWithNewContract(data, (err, rows) => {
        res.send(rows);
    });
};