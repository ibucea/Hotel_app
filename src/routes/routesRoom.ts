import { Router } from "express";
import { createRoom, getAllRooms } from "../controller/rooms";

const routerRoom = Router();
routerRoom.post('/room', createRoom)
routerRoom.get("/rooms", getAllRooms);

export default routerRoom;