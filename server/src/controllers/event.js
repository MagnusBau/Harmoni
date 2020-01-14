// @flow

import {EventDAO} from "../dao/eventDao";
import {EmailService} from "../emailService";

const pool = require("../server");

const eventDao = new EventDAO(pool);
const emailService = new EmailService();

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

                    if(data[0][0].length > 0) {
                        let emailList = [data[0][0].email];
                        console.log(emailList);
                        emailService.cancelledNotification(emailList);
                    } else {
                        console.log("Fant ikke informasjon om avlyst arrangement");
                    }


                } else {

                }

            });

        } else {
            console.log("Feil");
        }

    });

};