//@flow

const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artist');

router.post("/", artistController.insertArtist);
router.put("/:artistId", artistController.updateArtist);
router.delete("/:artistId", artistController.deleteArtist);
router.get("/", artistController.getAllArtists);
router.get("/:artistId", artistController.getArtistById);

module.exports = router;