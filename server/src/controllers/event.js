// @flow

import { EventDAO } from "../dao/eventDao";
const pool = require("../server");

const eventDao = new EventDAO(pool);

/**
    GET all events or event by name if param given.
 */

exports.getEvents = (req, res, next) => {
    console.log(`Got request from client: GET /event`);
    if (req.query.name) {
        eventDao.getEventByName(req.query.name, (err, rows) => {
            res.json(rows);
        })
    } else {
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
    console.log(`Get-request from client /event/${req.params.event_id}` );

    eventDao.getEventById(req.params.event_id, (err, rows) => {
        res.json(rows)
    })
};

//Update event Title
exports.updateTitle = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEventTitle(req.params.title, (status, data) => {
        res.status(status);
        res.json(data);
    })
};

//Update event description
exports.updateDescription = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEventDescription(req.params.description, (status, data) => {
        res.status(status);
        res.json(data);
    })
};

//Update event location
exports.updateLocation = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEventLocation(req.params.location, (status, data) => {
        res.status(status);
        res.json(data);
    })
};

//Update event start time
exports.updateStartTime = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEventStartTime(req.params.start_time, (status, data) => {
        res.status(status);
        res.json(data);
    })
};

//Update event end time
exports.updateEndTime = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEventEndTime(req.params.end_time, (status, data) => {
        res.status(status);
        res.json(data);
    })
};

//Update event category
exports.updateCategory = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEventCategory(req.params.category, (status, data) => {
        res.status(status);
        res.json(data);
    })
};

//Update event capacity
exports.updateCapacity = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEventCapacity(req.params.capacity, (status, data) => {
        res.status(status);
        res.json(data);
    })
};

//Update entire event
exports.updateEvent = (req, res, next) => {
    console.log("PUT request from client");
    eventDao.updateEvent(req.params.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
};