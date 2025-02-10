import mongoose from "mongoose";
import UserModel from "./userModel.js";
import ChatroomModel from "./chatroomModel.js";
import AdminModel from "./adminModel.js";

const MessageSchema = new mongoose.Schema(
  {
    chatter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.isAdmin ? AdminModel : UserModel;
      },
      required: true,
    },
    isAdmin: Boolean,
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
