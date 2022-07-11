import { Router } from "express";
import { createBooking, getAllBookings } from "../controller/bookings";

const routerRoom = Router();
routerRoom.post('/booking', createBooking)
routerRoom.get("/bookings", getAllBookings);

export default routerRoom;