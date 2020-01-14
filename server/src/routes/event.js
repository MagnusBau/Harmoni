//@flow

const express = require("express");

const eventController = require("../controllers/event");
const equipmentController = require("../controllers/equipment");
const artistController = require("../controllers/artist");

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/:eventId/email", eventController.getEventEmail);
router.get("/:eventId", eventController.getEventById);
router.get("/:eventId/artist", artistController.getArtistByEvent);
router.get("/:eventId/document", eventController.getDocumentByEvent);
router.post("/", eventController.insertEvent);
router.post("/:eventId/equipment", equipmentController.addEquipmentToEvent);
router.post("/:eventId/artist", artistController.addArtistToEvent);
router.delete("/:eventId/equipment/:equipmentId", equipmentController.removeEquipmentFromEvent);
router.delete("/:eventId/artist/:artistId", artistController.removeArtistFromEvent);
router.put("/:eventId/equipment/:equipmentId", equipmentController.updateEquipmentOnEvent);
router.put("/:eventId/cancel", eventController.cancelEvent);
router.get("/:eventId/artist", artistController.getArtistByEvent);

module.exports = router;
