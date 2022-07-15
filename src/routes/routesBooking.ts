import { Router } from "express";
import { createBooking, myBookings, checkRoomIsAvailble, getBookedDates } from "../controller/bookings";
import { protect } from "../middleware/auth";

const routerBooking = Router();

routerBooking.route("/me").get(protect, myBookings);
routerBooking.route("/check").post(checkRoomIsAvailble);
routerBooking.route("/dates/:roomId").get(getBookedDates);
routerBooking.route('/').post(createBooking)

export default routerBooking;
