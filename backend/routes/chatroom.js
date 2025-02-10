import express from "express";
import {
  createChatroom,
  deleteChatroom,
  getChatrooms,
} from "../controllers/chatroomController.js";
import tokenVerification from "../middleware/tokenVerification.js";

const router = express.Router();

router.get("/", getChatrooms);

router.post("/create", tokenVerification, createChatroom);

router.delete("/delete", tokenVerification, deleteChatroom);

export default router;
