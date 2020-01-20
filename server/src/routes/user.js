const express = require("express");

const userController = require("../controllers/user");
const artistController = require("../controllers/artist");

const router = express.Router();

router.get("/user/:id", userController.getUser);
router.post("/", userController.loginUser);
router.put("/user/:id", userController.updateUser);
router.post("/register", userController.registerUser);
router.post("/user/artist", userController.registerArtistUser);
router.put("/user/:id/password", userController.updateUserPassword);
router.post("/:id/token", userController.getToken);
router.get("/user/artist/:artistId", userController.getUserByArtist);
router.put("/contact/:contactId/artist", artistController.getArtistByContact);



module.exports = router;
