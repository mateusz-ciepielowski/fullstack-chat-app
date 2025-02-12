import { useContext, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

import ModalContext from "../context/ModalContext";

export default function RegisterModal({ chatroom }) {
  const { isClosed, setIsClosed } = useContext(ModalContext);

  const [username, setUsername] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    axios.post(
      "/register",
      {
        username,
        chatroom,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsClosed(true);
  }

  return createPortal(
    <>
      {!isClosed && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <p>Wprowadź imię i nazwisko</p>
            <form onSubmit={handleRegister}>
              <input
                onChange={(ev) => setUsername(ev.target.value)}
                value={username}
                placeholder="Imię i nazwisko"
              />
              <button type="submit">Ok</button>
            </form>
          </div>
        </>
      )}
    </>,
    document.getElementById("modal")
  );
}
