import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [chatroomName, setChatroomName] = useState("");
  const formattedChatroomName = chatroomName
    .replaceAll(" ", "")
    .trim()
    .toLowerCase();
  const navigate = useNavigate();

  async function handleCreateChatroom(e) {
    e.preventDefault();
    axios.post("/chatroom/create", {
      chatroomName: formattedChatroomName,
      chatters: [],
    });
    setTimeout(() => {
      navigate(`/${formattedChatroomName}`);
    }, 100);
  }

  return (
    <>
      <h2>Stwórz pokój</h2>
      <form onSubmit={handleCreateChatroom}>
        <input
          value={chatroomName}
          onChange={(e) => setChatroomName(e.target.value)}
          required
        />
        <button type="submit">Stwórz</button>
      </form>
    </>
  );
}
