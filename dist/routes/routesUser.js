"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controller/users");
const auth_1 = require("../middleware/auth");
const routerUser = (0, express_1.Router)();
routerUser.route("/validate").get(auth_1.extractJWT, users_1.validateToken);
routerUser.route("/register").post(users_1.register);
routerUser.route("/login").post(users_1.login);
routerUser.route("/getAllUsers").get(auth_1.protect, users_1.getAllUsers);
exports.default = routerUser;
