const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        technician: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Technician" },
        service: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Service" },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        status: { type: String, default: "zakazano", enum: ["zakazano", "otkazano", "završeno"] },
    },
    { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;