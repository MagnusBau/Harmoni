//@flow

import {TicketDAO} from '../dao/ticketDao.js';
const pool = require('../server.js');

const ticketDao = new TicketDAO(pool);

exports.insertTicket = (req, res, next) => {
    console.log("Fikk POST-request fra klienten");
    ticketDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
};

exports.getAllTickets = (req, res, next) => {
    console.log(`Got request from client: /ticket`);
    ticketDao.getAll((err, rows) => {
        res.json(rows);
    })
};

exports.getTicketById = (req, res, next) => {
    console.log(`Got request from client: /ticket`);
    ticketDao.getOne(req.params.id,(err, rows) => {
        res.json(rows);
    });
};

exports.updateTicket = (req, res, next) => {
    console.log("Fikk POST-request fra /ticket/:id");
    ticketDao.updateOneTicket(req.body, (err, rows) => {
        res.json(rows);
    });
};

exports.deleteTicket = (req, res, next) => {
    console.log("/person: fikk /ticket/:id request fra klient");
    ticketDao.removeOneTicket(Number.parseInt(req.params.id),(status, data) => {
        res.status(status);
        res.json(data);
    });
};