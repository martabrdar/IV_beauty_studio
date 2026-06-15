const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/userModel");
const Service = require("./models/serviceModel");
const Appointment = require("./models/appointmentModel");
const Technician = require("./models/technicianModel");
const users = require("./data/users");
const services = require("./data/services");
const technicians = require("./data/technicians");

dotenv.config({ path: "../.env" });

connectDB();

const importData = async () => {
    try {
        await Appointment.deleteMany();
        await Service.deleteMany();
        await User.deleteMany();
        await Technician.deleteMany();

        await User.insertMany(users);
        await Service.insertMany(services);
        await Technician.insertMany(technicians);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Appointment.deleteMany();
        await Service.deleteMany();
        await User.deleteMany();
        await Technician.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}