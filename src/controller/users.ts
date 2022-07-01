import { RequestHandler } from "express";

import { Users } from "../models/users";

export const createUser: RequestHandler = async (req, res) => {
    const user = await Users.create({ ...req.body });
    return res
      .status(200)
      .json({ message: "User created successfully", data: user });
  };


export const getAllUsers: RequestHandler = async (req, res) => {
    const allUsers: Users[] = await Users.findAll();
    return res
      .status(200)
      .json({ message: "Users fetched successfully", data: allUsers });
  };
  