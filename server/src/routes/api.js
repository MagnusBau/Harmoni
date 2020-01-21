const express = require("express");

const eventController = require("../controllers/event");

const router = express.Router();

router.get("/event", eventController.getEvents);
router.get("/event/search/:input", eventController.getEventByInput);
router.get("/categories", eventController.getCategories);



module.exports = router;
