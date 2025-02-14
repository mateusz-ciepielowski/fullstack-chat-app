import { io } from "../lib/socket.js";
import ChatroomModel from "../models/chatroomModel.js";
import MessageModel from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.user;

    const isAdmin = req.user?.isAdmin;

    const { message, chatroom } = req.body;

    const { _id: chatroomId } = await ChatroomModel.findOne({ name: chatroom });

    const newMessage = await MessageModel.create({
      isAdmin: isAdmin,
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

export const deleteMessage = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(401).json("Unauthorized!");
    return;
  }
  try {
    const { id } = req.params;

    const deletedMessage = await MessageModel.findOneAndDelete({ _id: id });

    io.emit("deleteMessage", deletedMessage);

    res.status(200).json("Message deleted!");
  } catch (error) {
    console.error(error);
  }
};
