import express from "express";

import tokenVerification from "../middleware/tokenVerification.js";
import {
  getChatterData,
  registerUser,
} from "../controllers/chatterController.js";

const router = express.Router();

router.get("/chatter", tokenVerification, getChatterData);

router.post("/register", registerUser);

export default router;
