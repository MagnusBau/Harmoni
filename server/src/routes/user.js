const express = require("express");

const userController = require("../controllers/user");
const artistController = require("../controllers/artist");

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/user", userController.registerUser);
router.post("/user/artist", userController.registerArtistUser);
router.get("/user/:userId", userController.getUser);
router.put("/user/:userId", userController.updateUser);
router.put("/user/:userId/password", userController.updateUserPassword);
router.post("/:id/token", userController.getToken);
router.put("/contact/:contactId/artist", artistController.getArtistByContact);



module.exports = router;
