const express = require("express");

const contactController = require("../controllers/contact");
const eventController = require("../controllers/event");
const artistController = require("../controllers/artist");
const ticketController = require("../controllers/ticket");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/event", eventController.getEvents);
router.get("/event/:eventId/artist", artistController.getArtistByEvent);
router.get("/event/:eventId", eventController.getEventById);
router.get("/event/:event_id/edit", eventController.getEventByIdUpdate);
router.get("/event/search/:input", eventController.getEventByInput);
router.post("/contact", contactController.contactUs);
router.get("/categories", eventController.getCategories);
router.get("/user/:userId/event", eventController.getEventByUser);
router.get("/user/:userId/event/ended", eventController.getEndedEventsByUser);
router.get("/event/:eventId/ticket", ticketController.getAllTickets);
router.get("/event/:contactId", userController.getOrganizerUsername);

module.exports = router;
