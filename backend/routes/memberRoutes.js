const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

router.get("/", memberController.getAllMembers);
router.get("/:id/scans", memberController.getMemberScans);
router.get("/total-scans", memberController.getTotalScans); // <-- This line

module.exports = router;
