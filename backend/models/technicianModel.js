const mongoose = require("mongoose");

const technicianSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        categories: [{ type: String }],
        services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    },
    { timestamps: true }
);

const Technician = mongoose.model("Technician", technicianSchema);

module.exports = Technician;