import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!login.trim() || !password.trim() || password.trim().length < 9) return;

    const res = await axios.post("/admin/login", {
      username: login,
      password,
    });
    if (!res.status === 201) return;

    setUserData({ userId: res.data.id, username: login, isAdmin: true });
    navigate("/admin");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <section>
      <div className="login-page">
        <h1>Login Page</h1>
        <input
          type="text"
          name="login"
          id="login"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          placeholder="Nazwa użytkownika"
          onKeyDown={handleKeyPress}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Hasło"
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleLogin}>Zaloguj się</button>
      </div>
    </section>
  );
}
