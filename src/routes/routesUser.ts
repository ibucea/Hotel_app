import { Router } from "express";
import {
  getAllUsers,
  login,
  register,
} from "../controller/users";
import { protect } from "../middleware/auth";

const routerUser = Router();

routerUser.route("/register").post(register);
routerUser.route("/login").post(login);
routerUser.route("/getAllUsers").get(protect, getAllUsers);

export default routerUser;
