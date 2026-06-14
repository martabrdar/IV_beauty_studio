const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: Number, required: true }, // u minutima
        category: { type: String, required: true }, // npr. "Manikir", "Pedikir", "Trepavice"
        image: { type: String },
    },
    { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;