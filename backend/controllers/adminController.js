const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "ivbeautystudio_secret_123", { expiresIn: "30d" });
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && user.isAdmin && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Neautorizovan pristup" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: "Korisnik obrisan" });
        } else {
            res.status(404).json({ message: "Korisnik nije pronađen" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getStats = async (req, res) => {
    try {
        const totalBookings = await Appointment.countDocuments();
        const totalUsers = await User.countDocuments();
        const todayBookings = await Appointment.countDocuments({
            date: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
        });
        const completedBookings = await Appointment.find({ status: "završeno" }).populate("service", "price");
        const totalRevenue = completedBookings.reduce((acc, booking) => acc + (booking.service?.price || 0), 0);

        res.json({ totalBookings, totalUsers, totalRevenue, todayBookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { adminLogin, getAllUsers, deleteUser, getStats };