import { RequestHandler } from "express";

import { Bookings } from "../models/bookings";

export const createBooking: RequestHandler = async (req, res) => {
  const booking = await Bookings.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Booking created successfully", data: booking });
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
