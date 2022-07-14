import { Router } from "express";
import { createBooking, getAllBookings, myBookings, checkRoomIsAvailble, getBookedDates } from "../controller/bookings";
import { extractJWT } from "../middleware/auth";

const routerBooking = Router();

routerBooking.route("/me").get(myBookings);
routerBooking.route("/check").post(checkRoomIsAvailble);
routerBooking.route("/dates/:roomId").get(getBookedDates);
routerBooking.route('/booking').post(createBooking)


export default routerBooking;