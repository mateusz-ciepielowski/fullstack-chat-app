import UserModel from "../models/userModel.js";
import ChatroomModel from "../models/chatroomModel.js";

import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

export const getChatterData = (req, res) => {
  const userData = req.user;
  res.json(userData);
};

export const registerUser = async (req, res, next) => {
  const { username, chatroom: name } = req.body;
  try {
    const createdUser = await UserModel.create({ username });

    const chatroom = await ChatroomModel.findOne({ name });

    const token = jwt.sign({ userId: createdUser._id, username }, jwtSecret);

    chatroom.chatters.push(createdUser._id);
    chatroom.save();
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ id: createdUser._id });
    next();
  } catch (err) {
    console.log(err);
  }
};
