import mongoose from "mongoose";
import UserModel from "./userModel.js";

const ChatroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    chatters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
      },
    ],
  },
  { timestamps: true }
);

const ChatroomModel = mongoose.model("Chatroom", ChatroomSchema);

export default ChatroomModel;
