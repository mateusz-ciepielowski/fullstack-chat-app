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

  async function handleLogout() {
    await axios.post("/admin/logout");
    navigate("/");
    navigate(0);
  }

  return (
    <>
      <h2>Stwórz pokój</h2>
      <div>
        <form onSubmit={handleCreateChatroom}>
          <input
            value={chatroomName}
            onChange={(e) => setChatroomName(e.target.value)}
            required
          />
          <button type="submit">Stwórz</button>
        </form>
        <button onClick={handleLogout}>Wyloguj się</button>
      </div>
    </>
  );
}
