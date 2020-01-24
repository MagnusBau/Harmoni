// @flow

import {EventDAO} from "../dao/eventDao";
import {UserDAO} from "../dao/userDao";
import {Email} from "../email";

const pool = require("../server");

const eventDao = new EventDAO(pool);
const userDao = new UserDAO(pool);
const emailService = new Email();

/**
 GET all events
 */

exports.getEvents = (req, res, next) => {
    console.log(`Got request from client: GET /event`);
    if (req.query.name) {
        console.log("this");
        eventDao.getEventByName(req.query.name, (err, rows) => {
            res.json(rows);
        })
        /*} else if (req.query.eventId){
            eventDao.getEventById(req.query.name, (err, rows) => {
                res.json(rows);
            })*/
    } else if (req.query.cancelled) {
        let cancelled = (req.query.cancelled === "true");
        eventDao.getEventsByCancelled(cancelled, (err, rows) => {
            res.json(rows);
        })
    } else if (req.query.artistId) {
        eventDao.getEventsByArtist(req.query.artistId, (err, rows) => {
            res.json(rows);
        })
    } else {
        console.log("eventDao.getFrontpageEvents");
        eventDao.getFrontpageEvents((err, [rows]) => {
            res.json(rows);
        })
    }
};

exports.getDocumentByEvent = (req, res, next) => {
    console.log(`GET request from client: /event/${req.param.s.eventId}/document`);
    eventDao.getDocumentByEvent(req.params.eventId, (err, rows) => {
       res.json(rows);
    });
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

exports.getEventByUser = (req, res, next) => {
    console.log('GET-request from client (getEventByUser');
    userDao.getContact(req.params.userId, (err, [rows]) => {
        console.log(rows);
        if(rows[0]) {
            if(rows[0].contact_id) {
                console.log("tralala:" + rows[0].contact_id);
                eventDao.getEventByUser(rows[0].contact_id, (err, [rows2]) => {
                    res.json(rows2)
                })
            }
        }
    })
};

exports.getEndedEventsByUser = (req, res, next) => {
    console.log('GET-request from client');
    userDao.getContact(req.params.userId, (err, [rows]) => {
        console.log(rows);
        if(rows[0]) {
            if(rows[0].contact_id) {
                eventDao.getEndedEventsByUser(rows[0].contact_id, (err, [rows]) => {
                    res.json(rows)
                })
            }
        }
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

    eventDao.deleteEvent(req.params.event, (err, rows) => {
        res.json(rows);
    });

};

exports.deleteEventByEndTime = (req, res, next) => {

    console.log(`DELETE-request from client: /event/user/${req.params.contact_id}/ended`);

    userDao.getContact(req.params.userId, (err, [rows]) => {
        console.log(rows);
        if(rows[0]) {
            if(rows[0].contact_id) {
                eventDao.deleteEventsByEndTime(rows[0].contact_id, (err, rows) => {
                    res.send(rows);
                });
            }
        }
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

//Get events by input
exports.getEventByInput = (req, res, next) => {
    console.log("getEventByInput");
    console.log(`Get-request from client: event/search/${req.params.input}`);
    console.log("input controller " + req.params.input);

    eventDao.getEventByInput(req.params.input, (err, rows) => {
        res.json(rows);
    })
};

//Get event by id for update
exports.getEventByIdUpdate = (req, res, next) => {
    console.log(`Get-request from client /event/edit/${req.params.event_id}` );

    eventDao.getEventByIdUpdate(req.params.event_id, (err, rows) => {
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
    eventDao.updateEvent(req.params.event_id, req.body, (status, data) => {
        res.status(status);
        res.json(data);
    })
};
//Insert new event
exports.createEvent = (req, res, next) => {
    console.log("Post request from client");
    eventDao.createEvent(req.body,(status, data) => {
        res.status(status);
        res.json(data);
    })
};

exports.getDocumentByEvent = (req, res, next) => {
    console.log(`GET request from client: /event/${req.params.eventId}/document`);

    eventDao.getDocumentByEvent(req.params.eventId, (err, rows) => {
        res.json(rows);
    });
};

exports.getCategories = (req, res, next) => {
    console.log('GET request from client: /categories');
    eventDao.getCategories((err, rows) => {
        res.json(rows);
    })
};

exports.getEventsByUsername = (req, res, next) => {
    console.log('GET request from client: event/search/username')
    eventDao.getEventsByUsername(req.params.username, (err, rows) => {
        res.json(rows);
    })
};