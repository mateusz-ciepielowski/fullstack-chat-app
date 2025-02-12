import ChatroomModel from "../models/chatroomModel.js";

export const createChatroom = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(401).json("Unauthorized!");
    return;
  }
  const { chatroomName: name } = req.body;
  try {
    const allChatrooms = await ChatroomModel.find();
    if (allChatrooms.length > 9) return;

    const newChatroom = await ChatroomModel.create({ name, messages: [] });

    newChatroom.save();
    res.status(200).json("Chatroom created");
  } catch (err) {
    console.log(err);
  }
};

export const getChatrooms = async (req, res) => {
  try {
    const allChatrooms = await ChatroomModel.find();

    res.json(allChatrooms);
  } catch (err) {
    console.log(err);
  }
};

export const deleteChatroom = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(401).json("Unauthorized!");
    return;
  }
  try {
    const { chatroom } = req.body;

    await ChatroomModel.findOneAndDelete(chatroom);

    res.status(200).json("Chatroom deleted!");
  } catch (err) {
    console.error(err);
  }
};

export const updateChatroom = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(401).json("Unauthorized!");
    return;
  }
  try {
    const { chatroom, newName } = req.body;

    if (newName.length === 0) {
      res.status(400).json("Chatroom name cannot be empty");
      return;
    }

    await ChatroomModel.findOne(chatroom).updateOne({
      name: newName,
    });

    res.status(200).json("Chatroom updated!");
  } catch (err) {
    console.error(err);
  }
};

export const chatroomAttendance = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(401).json("Unauthorized!");
    return;
  }
  try {
    const { chatroom } = req.body;

    const selectedChatroom = await ChatroomModel.findOne(chatroom).populate(
      "chatters"
    );

    res.status(200).json(selectedChatroom.chatters);
  } catch (err) {
    console.error(err);
  }
};
