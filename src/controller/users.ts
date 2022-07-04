import { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import connection from "../db/config";
import { signJWT } from "../middleware/auth";

import { Users } from "../models/users";

export const validateToken: RequestHandler = (req, res) => {
  console.log("Token validated, user authorized.");

  return res.status(200).json({
    message: "Token(s) validated",
  });
};

export const register: RequestHandler = async (req, res) => {
  const salt = await bcryptjs.genSalt(10);
  var user = {
    username: req.body.username,
    email: req.body.email,
    session: '',
    password: await bcryptjs.hash(req.body.password, salt),
  };

  await bcryptjs.hash(user.password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(401).json({
        message: hashError.message,
        error: hashError,
      });
    }
  });
  const cteatedUser = await Users.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "User created successfully", data: cteatedUser });
};

export const login: RequestHandler = async (req, res, next) => {
  const user = await Users.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      const token = signJWT(user, (_error, token) => {
        if (_error) {
          return res.status(401).json({
            message: "Unable to Sign JWT",
            error: _error,
          });
        } else if (token) {
          return res.status(200).json({
            message: "Auth Successful",
            token,
            user: user,
          });
        }
      });
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }
  } else {
    res.status(404).json({ error: "User does not exist" });
  }
};

export const createUser: RequestHandler = async (req, res) => {
  const user = await Users.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "User created successfully", data: user });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const deletedUser: Users | null = await Users.findByPk(userId);
  await Users.destroy({ where: { userId } });
  return res
    .status(200)
    .json({ message: "User deleted successfully", data: deletedUser });
};

export const getAllUsers: RequestHandler = async (req, res) => {
  const allUsers: Users[] = await Users.findAll();
  return res
    .status(200)
    .json({ message: "Users fetched successfully", data: allUsers });
};

export const getUserById: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const user: Users | null = await Users.findByPk(userId);
  return res
    .status(200)
    .json({ message: "User fetched successfully", data: user });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { userId } = req.params;
  await Users.update({ ...req.body }, { where: { userId } });
  const updatedUsers: Users | null = await Users.findByPk(userId);
  return res
    .status(200)
    .json({ message: "User updated successfully", data: updatedUsers });
};
