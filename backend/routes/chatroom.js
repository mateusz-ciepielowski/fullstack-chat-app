import express from "express";
import {
  createChatroom,
  getChatrooms,
} from "../controllers/chatroomController.js";

const router = express.Router();

router.get("/", getChatrooms);

router.post("/create", createChatroom);

export default router;
