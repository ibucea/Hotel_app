"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.createUser = exports.login = exports.register = exports.validateToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../middleware/auth");
const users_1 = require("../models/users");
const validateToken = (req, res) => {
    console.log("Token validated, user authorized.");
    return res.status(200).json({
        message: "Token(s) validated",
    });
};
exports.validateToken = validateToken;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password, email } = req.body;
    // session = config.server.token.secret;
    password = yield bcryptjs_1.default.hashSync(password);
    const createdUser = yield users_1.Users.create({ username, password, email });
    const id = (createdUser.userId).toString([2]);
    return res
        .status(200)
        .json({
        user: {
            userId: createdUser.userId,
            username: createdUser.username,
            email: createdUser.email,
            session: (0, auth_1.generateToken)(id),
            token: (0, auth_1.generateToken)(id)
        }
    });
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.Users.findOne({ where: { email: req.body.email } });
    if (user) {
        const password_valid = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (password_valid) {
            const id = (user.userId).toString([2]);
            res.status(200).json({ user: {
                    userId: user.userId,
                    username: user.username,
                    email: user.email,
                    session: (0, auth_1.generateToken)(id),
                    token: (0, auth_1.generateToken)(id)
                } });
        }
        else {
            res.status(400).json({ error: "Password Incorrect" });
        }
    }
    else {
        res.status(404).json({ error: "User does not exist" });
    }
});
exports.login = login;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.Users.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: "User created successfully", data: user });
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const deletedUser = yield users_1.Users.findByPk(userId);
    yield users_1.Users.destroy({ where: { userId } });
    return res
        .status(200)
        .json({ message: "User deleted successfully", data: deletedUser });
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield users_1.Users.findAll();
    return res
        .status(200)
        .json({ message: "Users fetched successfully", data: allUsers });
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield users_1.Users.findByPk(userId);
    return res
        .status(200)
        .json({ message: "User fetched successfully", data: user });
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    yield users_1.Users.update(Object.assign({}, req.body), { where: { userId } });
    const updatedUsers = yield users_1.Users.findByPk(userId);
    return res
        .status(200)
        .json({ message: "User updated successfully", data: updatedUsers });
});
exports.updateUser = updateUser;
