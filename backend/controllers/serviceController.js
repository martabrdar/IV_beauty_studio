const Service = require("../models/serviceModel");

// @desc    Dohvati sve usluge
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Dohvati uslugu po ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: "Usluga nije pronađena" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getServices, getServiceById };