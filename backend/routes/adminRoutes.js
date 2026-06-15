const express = require("express");
const router = express.Router();
const { adminLogin, getAllUsers, deleteUser, getStats } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/login", adminLogin);
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.get("/stats", protect, admin, getStats);

module.exports = router;