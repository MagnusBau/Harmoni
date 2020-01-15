//@flow

const express = require('express');

const ticketController = require('../controllers/ticket');

const router = express.Router();

router.get("/all/:event", ticketController.getAllTickets);
router.get("/", ticketController.getAllTickets);
router.get("/:ticketId", ticketController.getTicketById);
router.post("/", ticketController.insertTicket);
router.put("/:ticketId", ticketController.updateTicket);
router.delete("/:ticketId", ticketController.deleteTicket);

module.exports = router;
