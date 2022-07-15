import { RequestHandler } from "express";
import { Rooms } from "../models/rooms";

// @Desc Get All Rooms
// @Route /api/rooms
// @Method GET
export const getAll :RequestHandler = async(req, res) => {

  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? {
      $or: [
          {name: { $regex: req.query.keyword, $options: "i" }},
          {description: { $regex: req.query.keyword, $options: "i" }},
      ]
  }
  : {};

  const numOfBeds = req.query.numOfBeds ? {numOfBeds: req.query.numOfBeds} : {};

  const category = req.query.roomType ? {category: req.query.roomType} : {};

  const count = await Rooms.count();

  const rooms = await Rooms.findAll();
  res.status(201).json({
      rooms,
      page,
      pages: Math.ceil(count / pageSize),
      count
  });
};


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


// @Desc Get Room By Id
// @Route /api/rooms/:id
// @Method GET

export const getRoomById: RequestHandler = async (req, res) => {
  const roomId = req.params;
  const room = await Rooms.findByPk(roomId.id);
  return res
    .status(200)
    .json(room);
};


export const updateRoom: RequestHandler = async (req, res, next) => {
  const { roomId } = req.params;
  await Rooms.update({ ...req.body }, { where: { roomId } });
  const updatedRooms: Rooms | null = await Rooms.findByPk(roomId);
  return res
    .status(200)
    .json({ updatedRooms });
};
