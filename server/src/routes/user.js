const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.post("/:id/token", userController.getToken);



module.exports = router;
