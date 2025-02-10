import express from "express";
import { login, register, logout } from "../controllers/adminController.js";
import tokenVerification from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/register", tokenVerification, register);

router.post("/login", login);

router.post("/logout", tokenVerification, logout);

export default router;
