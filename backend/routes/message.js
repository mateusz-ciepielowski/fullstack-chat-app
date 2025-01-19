import express from "express";

import { getMessages, sendMessage } from "../controllers/messageController.js";
import tokenVerification from "../middleware/tokenVerification.js";

const router = express.Router();

router.get("/get/:chatroom", getMessages);

router.post("/send", tokenVerification, sendMessage);

export default router;
