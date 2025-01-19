import { io } from "../lib/socket.js";
import ChatroomModel from "../models/chatroomModel.js";
import MessageModel from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.user;
    const { message, chatroom } = req.body;

    const { _id: chatroomId } = await ChatroomModel.findOne({ name: chatroom });

    const newMessage = await MessageModel.create({
      chatter: userId,
      message,
      chatroom: chatroomId,
    });

    const fullDataMessage = await newMessage.populate("chatter");

    io.emit("newMessage", fullDataMessage);

    res.status(200).json("Message sent");
  } catch (err) {
    res.status(401);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatroom } = req.params;
    const { _id: chatroomId } = await ChatroomModel.findOne({ name: chatroom });
    const messages = await MessageModel.find({ chatroom: chatroomId }).populate(
      "chatter"
    );
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};
