//@flow

import { riderDAO } from "../dao/riderDao.js";
const pool = require("../server.js");

const riderDao = new riderDAO(pool);

// post rider
exports.postRider = (req, res, next) => {
    console.log(`Got request from client: POST /api/rider`);

    let data = {
        "description": req.body.description,
        "document": req.params.document
    };

    riderDao.postRider(data,(err, rows) => {
        res.send(rows);
    });
};

exports.getRider = (req, res, next) => {
    console.log(`Got request from client: /rider/one/${req.params.rider_id}`);
    riderDao.getRider(req.params.rider_id, (err, rows) => {
        res.json(rows);
    })
};

exports.getAllRiders = (req, res, next) => {
    console.log(`Got request from client: /rider/all/${req.params.document}`);
    riderDao.getAllRiders(req.params.document, (err, rows) => {
        res.json(rows);
    })
};

exports.updateRider = (req, res, next) => {
    console.log(`Got request from client: PUT /api/rider/${req.params.rider_id}`);

    riderDao.updateRider(req.params.rider_id, req.body.description,(err, rows) => {
        res.send(rows);
    });
};

exports.deleteRider = (req, res, next) => {
    console.log(`Got request from client: DELETE /api/rider/one/${req.params.rider_id}`);

    riderDao.deleteRider(req.params.rider_id,(err, rows) => {
        res.send(rows);
    });
};

exports.deleteAllRiders = (req, res, next) => {
    console.log(`Got request from client: DELETE /api/rider/all/${req.params.document}`);

    riderDao.deleteAllRiders(req.params.document,(err, rows) => {
        res.send(rows);
    });
};