const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/send-email", emailController.sendEmail);
router.get("/total-emails-sent", emailController.getTotalEmailsSent);

module.exports = router;
