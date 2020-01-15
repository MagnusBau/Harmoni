// @flow

import {EventDAO} from "../dao/eventDao";
import {Email} from "../email";

const pool = require("../server");

const eventDao = new EventDAO(pool);
const emailService = new Email();

/**
    GET all events
 */

exports.getEvents = (req, res, next) => {
    console.log(`Got request from client: GET /event`);
    if (req.query.name) {
        eventDao.getEventByName(req.query.name, (err, rows) => {
            res.json(rows);
        })
    } else if (req.query.cancelled) {
        let cancelled = (req.query.cancelled === "true");
        eventDao.getEventsByCancelled(cancelled, (err, rows) => {
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
    console.log(`Get-request from client /event/${req.params.eventId}` );

    eventDao.getEventById(req.params.eventId, (err, [rows]) => {
        res.json(rows)
    })
};

exports.getEventEmail = (req, res, next) => {
    console.log(`GET-request from client /event/${req.params.eventId}/email` );

    eventDao.getCancelledEventInfo(req.params.eventId, (err, rows) => {
        res.json(rows);
    });
};

exports.deleteEvent = (req, res, next) => {

    console.log(`DELETE-request from client: /event/${req.params.eventId}/delete`);

    eventDao.deleteEvent(req.params.eventId, (err, rows) => {
        res.json(rows);
    });

};

exports.cancelEvent = (req, res, next) => {

    console.log(`PUT request from client: /event/${req.params.eventId}/cancel`);

    try {

        eventDao.cancelEvent(req.params.eventId, (status, data) => {

            if(status === 200) {
                console.log("cancelEvent = OK");

                eventDao.getCancelledEventInfo(req.params.eventId, (status, data) => {

                    if(status === 200 && data[0].length > 0) {
                        console.log("getCancelledEventInfo = OK");

                        let eventId = data[0][0].event_id;
                        let emailList = [data[0][0].email];
                        let name = data[0][0].name;
                        let eventTitle = data[0][0].title;
                        let eventLocation = data[0][0].location;
                        let eventTime = data[0][0].start_time;

                        //console.log(emailList);
                        emailService.cancelledNotification(emailList, eventId, eventTitle, name, eventLocation, eventTime);

                        res.status(status);

                    } else {
                        console.log("Failed to send email");
                    }

                });

            } else {
                console.log("");
            }

        });

    } catch (e) {
        console.log(e);
    }



};