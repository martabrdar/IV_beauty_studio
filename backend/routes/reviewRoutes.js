const express = require("express");
const router = express.Router();
const { getReviewsByService, createReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:id", getReviewsByService);
router.post("/:id", protect, createReview);

module.exports = router;