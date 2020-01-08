// @flow

import { EventDAO } from "../dao/eventDao";
const pool = require("../server");

const eventDao = new EventDAO(pool);

/**
    GET all events
 */

exports.getEvents = (req, res, next) => {
    console.log('Got request from client: /event');
    eventDao.getAllEvent((err, rows) => {
        res.json(rows);
    })
};