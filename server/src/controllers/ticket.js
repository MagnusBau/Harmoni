//@flow

import {TicketDAO} from '../dao/ticketDao.js';

/**
 * Controller for receiving HTTP requests through the ticket endpoint
 * @type {{listen?: *}}
 */

const pool = require('../server.js');

const ticketDao = new TicketDAO(pool);

const TAG = '[TicketController]';

exports.insertTicket = (req, res, next) => {
    console.log(TAG, "POST-request: /ticket");
    ticketDao.getAll(req.body.event, (status, tickets) => {
        console.log(TAG, tickets[0]);
        let unique = true;
        if(tickets[0]) {
            tickets[0].map(t => {
                console.log(TAG, req.body.title);
                if(t.title === req.body.title) {
                    unique = false;
                }
            });
            if(unique) {
                ticketDao.createOne(req.body, (status, data) => {
                    res.status(status);
                    res.json(data);
                });
            } else {
                console.log(TAG, "duplicate ticket");
                res.json({error: "Duplicate ticket"});
            }
        } else {
            res.json({error: "Server error"});
        }
    });
};

exports.getAllTickets = (req, res, next) => {
    console.log(TAG, `GET-request: /ticket`);
    ticketDao.getAll(req.params.eventId,(err, rows) => {
        res.json(rows);
    })
};

exports.getTicketById = (req, res, next) => {
    console.log(TAG, `GET-request: /ticket/${req.params.ticketId}`);
    ticketDao.getOne(req.params.ticketId,(err, rows) => {
        res.json(rows);
    });
};

exports.updateTicket = (req, res, next) => {
    console.log(TAG, "PUT-request: /ticket/:id");
    ticketDao.updateOneTicket(req.body, (err, rows) => {
        res.json(rows);
    });
};

exports.deleteTicket = (req, res, next) => {
    console.log(TAG, `DELETE-request: /ticket/${req.params.ticketId}`);
    ticketDao.removeOneTicket(Number.parseInt(req.params.ticketId),(status, data) => {
        res.status(status);
        res.json(data);
    });
};
