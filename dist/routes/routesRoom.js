"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_1 = require("../controller/rooms");
const routerRoom = (0, express_1.Router)();
routerRoom.post('/room', rooms_1.createRoom);
routerRoom.get("/rooms", rooms_1.getAllRooms);
exports.default = routerRoom;
