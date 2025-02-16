import { useContext, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

import ModalContext from "../context/ModalContext";

export default function RegisterModal({ chatroom }) {
  const { isClosed, setIsClosed } = useContext(ModalContext);

  const [username, setUsername] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    if (username.length < 5 || username.length > 32) {
      alert(
        "W nazwie muszą być co najmniej 5 liter, a maksymalnie mogą być 32!"
      );
      return;
    }
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
