const express = require("express");
const router = express.Router();
const { createAppointment, getMyAppointments, cancelAppointment } = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createAppointment).get(protect, getMyAppointments);
router.put("/:id/cancel", protect, cancelAppointment);

module.exports = router;