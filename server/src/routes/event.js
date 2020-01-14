//@flow

const express = require("express");

const eventController = require("../controllers/event");
const equipmentController = require("../controllers/equipment");

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/:eventId", eventController.getEventById);
router.get("/:eventId/email", eventController.getEventEmail);
router.post("/", eventController.insertEvent);
router.post("/:eventId/equipment", equipmentController.addEquipmentToEvent);
router.delete("/:eventId/equipment/:equipmentId", equipmentController.removeEquipmentFromEvent);
router.put("/:eventId/equipment/:equipmentId", equipmentController.updateEquipmentOnEvent);
router.put("/:eventId/cancel", eventController.cancelEvent);
router.put("/edit/:event_id", eventController.updateEvent);
router.get("/edit/:event_id", eventController.getEventByIdUpdate);
router.post("/new", eventController.createEvent);

module.exports = router;
