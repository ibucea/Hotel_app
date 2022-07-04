import { RequestHandler } from "express";

import { Rooms } from "../models/rooms";

export const createRoom: RequestHandler = async (req, res) => {
  const room = await Rooms.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Room created successfully", data: room });
};

export const deleteRoom: RequestHandler = async (req, res) => {
  const { roomId } = req.params;
  const deletedRoom: Rooms | null = await Rooms.findByPk(roomId);
  await Rooms.destroy({ where: { roomId } });
  return res
    .status(200)
    .json({ message: "Room deleted successfully", data: deletedRoom });
};

export const getAllRooms: RequestHandler = async (req, res) => {
  const allRooms: Rooms[] = await Rooms.findAll();
  return res
    .status(200)
    .json({ message: "Rooms fetched successfully", data: allRooms });
};

export const getRoomById: RequestHandler = async (req, res) => {
  const { roomId } = req.params;
  const rooms: Rooms | null = await Rooms.findByPk(roomId);
  return res
    .status(200)
    .json({ message: "Room fetched successfully", data: rooms });
};

export const updateRoom: RequestHandler = async (req, res, next) => {
  const { roomId } = req.params;
  await Rooms.update({ ...req.body }, { where: { roomId } });
  const updatedRooms: Rooms | null = await Rooms.findByPk(roomId);
  return res
    .status(200)
    .json({ message: "Room updated successfully", data: updatedRooms });
};
