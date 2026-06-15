const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking, getAllBookings, updateBookingStatus } = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, createBooking).get(protect, admin, getAllBookings);
router.get("/my", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.put("/:id/status", protect, admin, updateBookingStatus);

module.exports = router;