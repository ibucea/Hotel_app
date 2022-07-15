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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBooking = exports.getBookingById = exports.getAllBookings = exports.deleteBooking = exports.getBookedDates = exports.checkRoomIsAvailble = exports.myBookings = exports.createBooking = void 0;
const bookings_1 = require("../models/bookings");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moment_range_1 = require("moment-range");
// import moment from "moment";
const Moment = require('moment');
// @Desc new booking
// @Route /api/bookings
// @Method POST
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookings_1.Bookings.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json(booking);
});
exports.createBooking = createBooking;
// @Desc Get all bookings current user
// @Route /api/bookings/me
// @Method GET
exports.myBookings = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield bookings_1.Bookings.findAll({
        where: {
            userId: req.userId
        }
    });
    if (!bookings) {
        res.status(401);
        throw new Error("Bookings not found");
    }
    res.status(201).json(bookings);
}));
// @Desc Check room is available for booking
// @Route /api/bookings/check
// @Method POST
const checkRoomIsAvailble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { roomId, checkInDate, checkOutDate } = req.body;
    const checkInDateR = new Date(checkInDate).toISOString().split('T')[0];
    const checkOutDateR = new Date(checkOutDate).toISOString().split('T')[0];
    checkInDate = checkInDateR;
    checkOutDate = checkOutDateR;
    const booking = yield bookings_1.Bookings.findAll({
        where: {
            roomId: roomId,
            checkInDate,
            checkOutDate
        }
    });
    let roomAvailable;
    if (booking) {
        roomAvailable = true;
    }
    else {
        roomAvailable = false;
        res.status(500).json(roomAvailable);
        return;
    }
    res.status(201).json(roomAvailable);
});
exports.checkRoomIsAvailble = checkRoomIsAvailble;
// @Desc Get booked dates
// Route /api/bookings/dates/:roomId
// @Route GET
const getBookedDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const bookings = yield bookings_1.Bookings.findAll({ where: { roomId } });
    let bookedDates = [];
    const moment = (0, moment_range_1.extendMoment)(Moment);
    const timeDiffernece = moment().utcOffset() / 60;
    if (!bookings) {
        res.status(401);
        throw new Error("Bookings not found");
    }
    else {
        bookings.forEach((booking) => {
            const checkInDate = moment(booking.checkInDate).add(timeDiffernece, 'hours');
            const checkOutDate = moment(booking.checkOutDate).add(timeDiffernece, 'hours');
            const range = moment.range(moment(checkInDate), moment(checkOutDate));
            const dates = Array.from(range.by('day'));
            bookedDates = bookedDates.concat(dates);
        });
        res.status(200).json(bookedDates);
    }
});
exports.getBookedDates = getBookedDates;
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
