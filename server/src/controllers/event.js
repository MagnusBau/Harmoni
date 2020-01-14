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
    console.log("/emailInfo/:id got GET-request from client");

    eventDao.getCancelledEventInfo(req.params.eventId, (err, rows) => {
        res.json(rows);
    });
};

exports.cancelEvent = (req, res, next) => {

    console.log(`PUT request from client: /event/${req.params.eventId}/cancel`);

    eventDao.cancelEvent(req.params.eventId, (status, data) => {

        if(status === 200) {

            console.log("Kjørte cancelEvent");

            eventDao.getCancelledEventInfo(req.params.eventId, (status, data) => {

                if(status === 200) {
                    console.log("Kjørte getCancelledEventInfo");

                    if(data[0].length > 0) {

                        let eventId = req.params.eventId;
                        let emailList = [data[0][0].email];
                        let name = data[0][0].name;
                        let eventTitle = data[0][0].title;
                        let eventLocation = data[0][0].location;
                        let eventTime = data[0][0].start_time;

                        console.log(emailList);

                        emailService.cancelledNotification(emailList, eventId, eventTitle, name, eventLocation, eventTime);

                    } else {
                        console.log("Fant ikke informasjon om avlyst arrangement");
                    }


                } else {
                    console.log("Kunne ikke sende mail");
                }

            });

        } else {
            console.log("Feil");
        }

    });

};