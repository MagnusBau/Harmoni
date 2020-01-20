const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/user", userController.registerUser);



module.exports = router;
