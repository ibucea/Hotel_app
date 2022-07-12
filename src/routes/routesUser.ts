import { Router } from "express";
import {
  createUser,
  getAllUsers,
  login,
  register,
  validateToken,
} from "../controller/users";
import { extractJWT } from "../middleware/auth";

const routerUser = Router();

routerUser.route("/validate").get(extractJWT, validateToken);
routerUser.route("/register").post(register);
routerUser.route("/login").post(login);
routerUser.route("/getAllUsers").get(getAllUsers);

export default routerUser;
