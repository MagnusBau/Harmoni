const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/user", userController.registerUser);
router.put("/user/:userId", userController.updateUser);
router.put("/user/:userId/password", userController.updateUserPassword);
router.post("/:id/token", userController.getToken);
router.get("/user/artist/:artistId", userController.getUserByArtist);



module.exports = router;
