const express = require("express");

const eventController = require("../controllers/event");

const router = express.Router();

router.get("/", eventController.getEvents);

module.exports = router;
