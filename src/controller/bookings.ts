import { RequestHandler } from "express";
import { Bookings } from "../models/bookings";
import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { extendMoment } from 'moment-range';
import { IUserRequest, Users } from "../models/users";
// import moment from "moment";
const Moment = require('moment');


// @Desc new booking
// @Route /api/bookings
// @Method POST
export const createBooking: RequestHandler = async (req, res) => {
  const booking = await Bookings.create({ ...req.body });
  return res
    .status(200)
    .json(booking);
};


// @Desc Get all bookings current user
// @Route /api/bookings/me
// @Method GET
export const myBookings = asyncHandler(async (req: IUserRequest, res: Response) => {
  const bookings = await Bookings.findAll({
    where: {
      userId: req.userId
    }
  })

  if (!bookings) {
    res.status(401);
    throw new Error("Bookings not found");
  }

  res.status(201).json(bookings);

});


// @Desc Check room is available for booking
// @Route /api/bookings/check
// @Method POST
export const checkRoomIsAvailble: RequestHandler = async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.body;

  const checkInDateR = new Date(checkInDate).toISOString().split('T')[0]
  const checkOutDateR = new Date(checkOutDate).toISOString().split('T')[0]

  checkInDate = checkInDateR;
  checkOutDate = checkOutDateR;

  const booking = await Bookings.findAll({
    where: {
      roomId: roomId,
      checkInDate,
      checkOutDate

    }
  });

  let roomAvailable;

  if (booking) {
    roomAvailable = true;
  } else {
    roomAvailable = false;
    res.status(500).json(roomAvailable);
    return;
  }

  res.status(201).json(roomAvailable);

};


// @Desc Get booked dates
// Route /api/bookings/dates/:roomId
// @Route GET
export const getBookedDates: RequestHandler = async (req, res) => {
  const { roomId } = req.params

  const bookings = await Bookings.findAll({ where: { roomId } });

  let bookedDates: {}[] = [];
  const moment = extendMoment(Moment);
  const timeDiffernece = moment().utcOffset() / 60;

  if (!bookings) {
    res.status(401);
    throw new Error("Bookings not found");
  } else {
    bookings.forEach((booking) => {

      const checkInDate = moment(booking.checkInDate).add(timeDiffernece, 'hours')
      const checkOutDate = moment(booking.checkOutDate).add(timeDiffernece, 'hours')

      const range = moment.range(moment(checkInDate), moment(checkOutDate));

      const dates = Array.from(range.by('day'));
      bookedDates = bookedDates.concat(dates);
    })

    res.status(200).json(bookedDates);
  }

};

export const deleteBooking: RequestHandler = async (req, res) => {
  const { bookingId } = req.params;
  const deletedBooking: Bookings | null = await Bookings.findByPk(bookingId);
  await Bookings.destroy({ where: { bookingId } });
  return res
    .status(200)
    .json({ message: "Booking deleted successfully", data: deletedBooking });
};

export const getAllBookings: RequestHandler = async (req, res) => {
  const allBookings: Bookings[] = await Bookings.findAll();
  return res
    .status(200)
    .json({ message: "Bookings fetched successfully", data: allBookings });
};

export const getBookingById: RequestHandler = async (req, res) => {
  const { bookingId } = req.params;
  const bookings: Bookings | null = await Bookings.findByPk(bookingId);
  return res
    .status(200)
    .json({ message: "Booking fetched successfully", data: bookings });
};

export const updateBooking: RequestHandler = async (req, res, next) => {
  const { bookingId } = req.params;
  await Bookings.update({ ...req.body }, { where: { bookingId } });
  const updatedBookings: Bookings | null = await Bookings.findByPk(bookingId);
  return res
    .status(200)
    .json({ message: "Booking updated successfully", data: updatedBookings });
};

