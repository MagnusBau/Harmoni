const express = require("express");

const userController = require("../controllers/user");
const ticketController = require('../controllers/ticket');

const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.use("/:id", userController.tokenCheck);
router.post("/:id/token", userController.getToken);

router.get("/:id/all/:event", ticketController.getAllTickets);


module.exports = router;
