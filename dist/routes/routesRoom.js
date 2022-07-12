"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rooms_1 = require("../controller/rooms");
const routerRoom = (0, express_1.Router)();
routerRoom.route('/createRoom').post(rooms_1.createRoom);
routerRoom.route("/").get(rooms_1.getAll);
exports.default = routerRoom;
