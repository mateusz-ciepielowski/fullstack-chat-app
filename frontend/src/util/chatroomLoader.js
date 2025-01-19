import axios from "axios";
import { redirect } from "react-router-dom";

export default async function chatroomLoader({ params }) {
  try {
    const { data } = await axios.get("/chatroom/");

    const chatroomExists = data.find((item) => item.name === params.chatroom);
    if (!chatroomExists) {
      return redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
}
