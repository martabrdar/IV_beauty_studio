const Service = require("../models/serviceModel");

const getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

const createService = async (req, res) => {
    try {
        const { name, description, price, category, duration, image } = req.body;
        const service = await Service.create({ name, description, price, category, duration, image });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            service.name = req.body.name || service.name;
            service.description = req.body.description || service.description;
            service.price = req.body.price || service.price;
            service.category = req.body.category || service.category;
            service.duration = req.body.duration || service.duration;
            service.image = req.body.image !== undefined ? req.body.image : service.image;
            const updated = await service.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: "Usluga nije pronađena" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            await service.deleteOne();
            res.json({ message: "Usluga obrisana" });
        } else {
            res.status(404).json({ message: "Usluga nije pronađena" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getServices, getServiceById, createService, updateService, deleteService };