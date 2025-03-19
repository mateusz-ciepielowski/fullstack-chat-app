import express from "express";

import {
  deleteMessage,
  exportMessages,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";
import tokenVerification from "../middleware/tokenVerification.js";

const router = express.Router();

router.get("/get/:chatroom", getMessages);

router.post("/send", tokenVerification, sendMessage);

router.delete("/delete/:id", tokenVerification, deleteMessage);

router.post("/get/:chatroom", tokenVerification, exportMessages);

export default router;
