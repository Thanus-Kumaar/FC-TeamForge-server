const express = require("express");
const { authController, playerController } = require("../controllers/userController");
const { tokenAuthenticator } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/players", tokenAuthenticator, playerController.addPlayerToUser);
router.get("/players", tokenAuthenticator, playerController.getPlayersForUser);

module.exports = router;
