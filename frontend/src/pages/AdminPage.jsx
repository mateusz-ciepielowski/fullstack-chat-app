import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [chatroomName, setChatroomName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
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

  async function handleCreateAdmin(e) {
    e.preventDefault();
    try {
      await axios.post("/admin/register", {
        username: adminName,
        password: adminPassword,
      });

      alert("Administrator został stworzony pomyślnie.");
      setAdminName("");
      setAdminPassword("");
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  async function handleLogout() {
    await axios.post("/admin/logout");
    navigate("/");
    navigate(0);
  }

  return (
    <div className="admin-page">
      <div className="create-chatroom">
        <h2>Stwórz pokój</h2>
        <form onSubmit={handleCreateChatroom}>
          <input
            value={chatroomName}
            onChange={(e) => setChatroomName(e.target.value)}
            required
            placeholder="Nazwa"
          />
          <button type="submit">Stwórz</button>
        </form>
      </div>
      <div className="create-admin">
        <h2>Stwórz konto administratora</h2>
        <form onSubmit={handleCreateAdmin}>
          <input
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
            placeholder="Login"
          />
          <input
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
            placeholder="Hasło"
          />
          <button type="submit">Stwórz</button>
        </form>
      </div>
      <button onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
}
