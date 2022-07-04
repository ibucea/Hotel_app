import { Router } from "express";
import { createUser, getAllUsers, login, register, validateToken } from "../controller/users";
import { extractJWT } from "../middleware/auth";

const routerUser = Router();

routerUser.get('./validate', extractJWT, validateToken)
routerUser.post('/register', register)
routerUser.post('/login', login)
routerUser.get('/getAllUsers', getAllUsers);

export default routerUser;
