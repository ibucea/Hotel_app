"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const bookings_1 = require("../models/bookings");
const rooms_1 = require("../models/rooms");
const users_1 = require("../models/users");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "Miss&U&Forever91",
    database: "hotelBD",
    logging: false,
    models: [users_1.Users, rooms_1.Rooms, bookings_1.Bookings]
});
exports.default = connection;
