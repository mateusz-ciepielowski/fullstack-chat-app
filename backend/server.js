import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import chatterRouter from "./routes/chatter.js";
import messageRouter from "./routes/message.js";
import chatroomRouter from "./routes/chatroom.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);

app.use(cookieParser());

app.use("/api", chatterRouter);
app.use("/api/message", messageRouter);
app.use("/api/chatroom", chatroomRouter);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
