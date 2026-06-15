const Technician = require("../models/technicianModel");

// @desc    Dohvati sve tehničare
// @route   GET /api/technicians
// @access  Public
const getTechnicians = async (req, res) => {
    try {
        const technicians = await Technician.find({}).populate("services", "name price");
        res.json(technicians);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Dohvati tehničara po ID
// @route   GET /api/technicians/:id
// @access  Public
const getTechnicianById = async (req, res) => {
    try {
        const technician = await Technician.findById(req.params.id).populate("services", "name price duration");
        if (technician) {
            res.json(technician);
        } else {
            res.status(404).json({ message: "Tehničar nije pronađen" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTechnicians, getTechnicianById };