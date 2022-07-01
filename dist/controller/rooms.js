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
exports.getAllRooms = void 0;
const rooms_1 = require("../models/rooms");
const getAllRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allRooms = yield rooms_1.Rooms.findAll();
    return res
        .status(200)
        .json({ message: "Rooms fetched successfully", data: allRooms });
});
exports.getAllRooms = getAllRooms;
