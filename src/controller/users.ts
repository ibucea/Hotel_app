import { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import { generateToken } from "../middleware/auth";
import { Users } from "../models/users";


export const validateToken: RequestHandler = (req, res) => {
  console.log("Token validated, user authorized.");

  return res.status(200).json({
    message: "Token(s) validated",
  });
};

export const register: RequestHandler = async (req, res) => {
  let { username, password, email } = req.body;

  password = await bcryptjs.hashSync(password);

  const createdUser = await Users.create({ username, password, email });
  const id = (createdUser.userId).toString([2]);

  return res
    .status(200)
    .json({
      user: {
        userId: createdUser.userId,
        username: createdUser.username,
        email: createdUser.email,
        session: generateToken(id),
        token: generateToken(id)
      }
    });
};

export const login: RequestHandler = async (req, res, next) => {
  const user = await Users.findOne({ where: { email: req.body.email } });
  if (user) {
    const password_valid = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
    const id = (user.userId).toString([2]);

      res.status(200).json({ user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        session: generateToken(id),
        token: generateToken(id)
      } });
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
