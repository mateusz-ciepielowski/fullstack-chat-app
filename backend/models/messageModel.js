import mongoose from "mongoose";
import UserModel from "./userModel.js";
import ChatroomModel from "./chatroomModel.js";

const MessageSchema = new mongoose.Schema(
  {
    chatter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    message: { type: String, required: true, maxLength: 255 },
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ChatroomModel,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
