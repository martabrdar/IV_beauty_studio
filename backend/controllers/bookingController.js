const Appointment = require("../models/appointmentModel");

const createBooking = async (req, res) => {
    try {
        const { serviceId, serviceName, servicePrice, technicianId, technicianName, date, timeSlot, paymentMethod, note } = req.body;

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const existingBooking = await Appointment.findOne({
            technician: technicianId,
            date: { $gte: startOfDay, $lte: endOfDay },
            time: timeSlot,
            status: { $in: ["zakazano", "završeno"] },
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Tehničar već ima zakazan termin u to vreme. Izaberite drugo vreme." });
        }

        const booking = await Appointment.create({
            user: req.user._id,
            technician: technicianId,
            service: serviceId,
            date,
            time: timeSlot,
            status: "zakazano",
            isPaid: paymentMethod === 'paypal',
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await Appointment.find({ user: req.user._id })
            .populate("service", "name price duration")
            .populate("technician", "name image");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const booking = await Appointment.findById(req.params.id);
        if (booking) {
            booking.status = "otkazano";
            await booking.save();
            res.json(booking);
        } else {
            res.status(404).json({ message: "Termin nije pronađen" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Appointment.find({})
            .populate("user", "name email")
            .populate("service", "name price")
            .populate("technician", "name");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Appointment.findById(req.params.id);
        if (booking) {
            booking.status = req.body.status;
            await booking.save();
            res.json(booking);
        } else {
            res.status(404).json({ message: "Termin nije pronađen" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getMyBookings, cancelBooking, getAllBookings, updateBookingStatus };