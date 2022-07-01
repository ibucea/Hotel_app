import { Router } from "express";
import { createUser, getAllUsers } from "../controller/users";

const routerUser = Router();

routerUser.post('/', createUser)
routerUser.get('/', getAllUsers);

export default routerUser;
