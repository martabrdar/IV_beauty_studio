const express = require("express");
const router = express.Router();
const { getTechnicians, getTechnicianById } = require("../controllers/technicianController");

router.get("/", getTechnicians);
router.get("/:id", getTechnicianById);

module.exports = router;