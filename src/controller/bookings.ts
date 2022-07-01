import { RequestHandler } from "express";

import { Bookings } from "../models/bookings";

export const createBooking: RequestHandler = async (req, res) => {
    const booking = await Bookings.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "Booking created successfully", data: booking });
  };


export const getAllBookings: RequestHandler = async (req, res) => {
    const allBookings: Bookings[] = await Bookings.findAll();
    return res
      .status(200)
      .json({ message: "Bookings fetched successfully", data: allBookings });
  };
  