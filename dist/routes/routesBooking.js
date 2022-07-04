"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookings_1 = require("../controller/bookings");
const routerRoom = (0, express_1.Router)();
routerRoom.post('/', bookings_1.createBooking);
routerRoom.get("/", bookings_1.getAllBookings);
exports.default = routerRoom;
