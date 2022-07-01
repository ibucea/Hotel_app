import { RequestHandler } from "express";

import { Rooms } from "../models/rooms";

export const createRoom: RequestHandler = async (req, res) => {
    const room = await Rooms.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "Room created successfully", data: room });
  };


export const getAllRooms: RequestHandler = async (req, res) => {
    const allRooms: Rooms[] = await Rooms.findAll();
    return res
      .status(200)
      .json({ message: "Rooms fetched successfully", data: allRooms });
  };
  