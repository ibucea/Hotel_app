import { Router } from "express";
import { createRoom, getAllRooms } from "../controller/rooms";

const routerRoom = Router();
routerRoom.post('/', createRoom)
routerRoom.get("/", getAllRooms);

export default routerRoom;