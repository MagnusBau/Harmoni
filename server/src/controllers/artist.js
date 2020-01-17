//@flow

import {ArtistDAO} from "../dao/artistDao";
const pool = require("../server");
const artistDao = new ArtistDAO(pool);

exports.insertArtist = (req, res, next) => {
    console.log(`Got request from client: POST /api/artist`);

    artistDao.insertArtist(req.body.artistName, req.body.firstName, req.body.lastName, req.body.email, req.body.phone, (err, rows) => {
        res.send(rows);
    });
};

exports.updateArtist = (req, res, next) => {
    console.log(`Got request from client: PUT /api/artist/${req.params.artistId}`);

    artistDao.updateArtist(req.params.artistId, req.body.artistName, req.body.firstName, req.body.lastName, req.body.email, req.body.phone, (err, rows) => {
        res.send(rows);
    });
};

exports.deleteArtist = (req, res, next) => {
    console.log(`Got request from client: DELETE /api/artist/${req.params.artistId}`);

    artistDao.deleteArtist(req.params.artistId, (err, rows) => {
        res.send(rows);
    });
};

exports.getAllArtists = (req, res, next) => {
    console.log(`Got request from client: GET /api/artist`);

    if (req.query.search) {
        artistDao.getArtistBySearch(req.query.search, (err, rows) => {
            res.send(rows);
        })
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