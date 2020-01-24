//@flow

import { RiderDAO } from "../dao/riderDao.js";
const pool = require("../server.js");

const riderDao = new RiderDAO(pool);

const TAG = '[RiderController]';

// post rider
exports.postRider = (req, res, next) => {
    console.log(TAG, `POST-request: /api/rider`);
    riderDao.postRider(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
};

exports.getRider = (req, res, next) => {
    console.log(TAG, `GET-request: /rider/one/${req.params.rider_id}`);
    riderDao.getRider(req.params.rider_id, (err, rows) => {
        res.json(rows);
    })
};

exports.getAllRiders = (req, res, next) => {
    console.log(TAG, `GET-request: /rider/all/${req.params.document}`);
    console.log(TAG, "DETTE ER DOCUMENT ID!!!!!!!: " + req.params.document);
    riderDao.getAllRiders(Number.parseInt(req.params.document), (err, rows) => {
        res.json(rows);
    })
};

exports.updateRider = (req, res, next) => {
    console.log(TAG, `PUT-request: /api/rider/${req.params.rider_id}`);
    riderDao.updateRider(req.body,(err, rows) => {
        res.json(rows);
    });
};

exports.deleteRider = (req, res, next) => {
    console.log(TAG, `DELETE-request: /api/rider/one/${req.params.rider_id}`);

    riderDao.deleteRider(req.params.rider_id,(err, rows) => {
        res.send(rows);
    });
};

exports.deleteAllRiders = (req, res, next) => {
    console.log(TAG, `DELETE-request: /api/rider/all/${req.params.document}`);

    riderDao.deleteAllRiders(req.params.document,(err, rows) => {
        res.send(rows);
    });
};