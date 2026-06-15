const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config({ path: "../.env" });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Backend radi!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
});