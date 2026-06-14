const bcrypt = require("bcryptjs");

const users = [
    {
        name: "Admin",
        email: "admin@ivbeautystudio.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Marija",
        email: "marija@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

module.exports = users;