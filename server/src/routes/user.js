const express = require("express");

const userController = require("../controllers/user");
const artistController = require("../controllers/artist");

const router = express.Router();

router.get("/user/:userId", userController.getUser);
router.put("/user/:userId", userController.updateUser);
router.put("/user/:userId/password", userController.updateUserPassword);
router.post("/token", userController.getToken);
router.get("/user/artist/:artistId", userController.getUserByArtist);
router.put("/contact/:contactId/artist", artistController.getArtistByContact);



module.exports = router;
