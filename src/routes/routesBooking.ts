import { Router } from "express";
import { createBooking, getAllBookings } from "../controller/bookings";

const routerRoom = Router();
routerRoom.post('/', createBooking)
routerRoom.get("/", getAllBookings);

export default routerRoom;