// @flow

import { EventDAO } from "../dao/eventDao";
const pool = require("../server");

const eventDao = new EventDAO(pool);

/**
 GET all events
 */

exports.getEvents = (req, res, next) => {
    console.log(`Got request from client: GET /event`);
    if (req.query.name) {
        eventDao.getEventByName(req.query.name, (err, rows) => {
            res.json(rows);
        })
    } else if (req.query.eventId){
        eventDao.getEventById(req.query.name, (err, rows) => {
            res.json(rows);
        })
    }

    else {
        eventDao.getAllEvents((err, [rows]) => {
            res.json(rows);
        })
    }
};

//Insert new event
exports.insertEvent = (req, res, next) => {
    console.log("Post request from client");
    eventDao.createEvent(req.body,(status, data) => {
        res.status(status);
        res.json(data);
    });
};

//Get event by id
exports.getEventById = (req, res, next) => {
    console.log(`Get-request from client /event/` + req.params.eventId );

    eventDao.getEventById(req.params.eventId, (err, [rows]) => {
        res.json(rows)
    })
};
