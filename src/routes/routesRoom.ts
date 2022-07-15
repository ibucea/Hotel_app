import { Router } from "express";
import { createRoom, getAll, getRoomById } from "../controller/rooms";

const routerRoom = Router();

routerRoom.route('/createRoom').post(createRoom);
routerRoom.route("/").get(getAll);
routerRoom.route("/:id").get(getRoomById);

export default routerRoom;