const Appointment = require("../models/appointmentModel");

// @desc    Zakaži termin
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    try {
        const { technician, service, date, time } = req.body;
        const appointment = await Appointment.create({
            user: req.user._id,
            technician,
            service,
            date,
            time,
        });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Dohvati termine korisnika
// @route   GET /api/appointments
// @access  Private
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user._id })
            .populate("service", "name price duration")
            .populate("technician", "name image");
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Otkaži termin
// @route   PUT /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (appointment) {
            appointment.status = "otkazano";
            await appointment.save();
            res.json(appointment);
        } else {
            res.status(404).json({ message: "Termin nije pronađen" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createAppointment, getMyAppointments, cancelAppointment };