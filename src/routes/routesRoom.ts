import { Router } from "express";
import { createRoom, getAll } from "../controller/rooms";

const routerRoom = Router();
routerRoom.route('/createRoom').post(createRoom)
routerRoom.route("/").get(getAll);

export default routerRoom;