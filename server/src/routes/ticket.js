//@flow
const express = require('express');
const ticketController = require('../controllers/ticket');
const router = express.Router();
router.get("/event/:event", ticketController.getAllTickets);
router.get("/ticket/:ticketId", ticketController.getTicketById);
router.post("/ticket", ticketController.insertTicket);
router.put("/ticket/:ticketId", ticketController.updateTicket);
router.delete("/ticket/:ticketId", ticketController.deleteTicket);
module.exports = router;
