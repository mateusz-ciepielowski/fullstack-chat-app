import express from "express";
import {
  chatroomAttendance,
  createChatroom,
  deleteChatroom,
  getChatrooms,
  updateChatroom,
} from "../controllers/chatroomController.js";
import tokenVerification from "../middleware/tokenVerification.js";

const router = express.Router();

router.get("/", getChatrooms);

router.post("/create", tokenVerification, createChatroom);

router.delete("/delete", tokenVerification, deleteChatroom);

router.patch("/edit", tokenVerification, updateChatroom);

router.post("/attendance", tokenVerification, chatroomAttendance);

export default router;
