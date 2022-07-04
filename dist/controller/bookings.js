"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBooking = exports.getBookingById = exports.getAllBookings = exports.deleteBooking = exports.createBooking = void 0;
const bookings_1 = require("../models/bookings");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookings_1.Bookings.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: "Booking created successfully", data: booking });
});
exports.createBooking = createBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const deletedBooking = yield bookings_1.Bookings.findByPk(bookingId);
    yield bookings_1.Bookings.destroy({ where: { bookingId } });
    return res
        .status(200)
        .json({ message: "Booking deleted successfully", data: deletedBooking });
});
exports.deleteBooking = deleteBooking;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBookings = yield bookings_1.Bookings.findAll();
    return res
        .status(200)
        .json({ message: "Bookings fetched successfully", data: allBookings });
});
exports.getAllBookings = getAllBookings;
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const bookings = yield bookings_1.Bookings.findByPk(bookingId);
    return res
        .status(200)
        .json({ message: "Booking fetched successfully", data: bookings });
});
exports.getBookingById = getBookingById;
const updateBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    yield bookings_1.Bookings.update(Object.assign({}, req.body), { where: { bookingId } });
    const updatedBookings = yield bookings_1.Bookings.findByPk(bookingId);
    return res
        .status(200)
        .json({ message: "Booking updated successfully", data: updatedBookings });
});
exports.updateBooking = updateBooking;
