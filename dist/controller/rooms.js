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
exports.updateRoom = exports.getRoomById = exports.getAllRooms = exports.deleteRoom = exports.createRoom = exports.getAll = void 0;
const rooms_1 = require("../models/rooms");
// @Desc Get All Rooms
// @Route /api/rooms
// @Method GET
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
        ]
    }
        : {};
    const numOfBeds = req.query.numOfBeds ? { numOfBeds: req.query.numOfBeds } : {};
    const category = req.query.roomType ? { category: req.query.roomType } : {};
    const count = yield rooms_1.Rooms.count();
    const rooms = yield rooms_1.Rooms.findAll();
    res.status(201).json({
        rooms,
        page,
        pages: Math.ceil(count / pageSize),
        count
    });
});
exports.getAll = getAll;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield rooms_1.Rooms.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: "Room created successfully", data: room });
});
exports.createRoom = createRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const deletedRoom = yield rooms_1.Rooms.findByPk(roomId);
    yield rooms_1.Rooms.destroy({ where: { roomId } });
    return res
        .status(200)
        .json({ message: "Room deleted successfully", data: deletedRoom });
});
exports.deleteRoom = deleteRoom;
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allRooms = yield rooms_1.Rooms.findAll();
    return res
        .status(200)
        .json({ message: "Rooms fetched successfully", data: allRooms });
});
exports.getAllRooms = getAllRooms;
// @Desc Get Room By Id
// @Route /api/rooms/:id
// @Method GET
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params;
    const room = yield rooms_1.Rooms.findByPk(roomId.id);
    return res
        .status(200)
        .json(room);
});
exports.getRoomById = getRoomById;
const updateRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    yield rooms_1.Rooms.update(Object.assign({}, req.body), { where: { roomId } });
    const updatedRooms = yield rooms_1.Rooms.findByPk(roomId);
    return res
        .status(200)
        .json({ updatedRooms });
});
exports.updateRoom = updateRoom;
