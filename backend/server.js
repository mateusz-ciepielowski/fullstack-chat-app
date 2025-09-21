import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import express from "express";

import chatterRouter from "./routes/chatter.js";
import messageRouter from "./routes/message.js";
import chatroomRouter from "./routes/chatroom.js";
import adminRouter from "./routes/admin.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL);

const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://fullstack-chat-app.vercel.app/"], // możliwa zmiana
  })
);

app.use(cookieParser());

app.use("/api", chatterRouter);
app.use("/api/message", messageRouter);
app.use("/api/chatroom", chatroomRouter);
app.use("/api/admin", adminRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
