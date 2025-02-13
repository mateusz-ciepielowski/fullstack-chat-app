import { useContext, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

import ModalContext from "../context/ModalContext";

export default function EditModal({ chatroom }) {
  const { setIsEditing } = useContext(ModalContext);

  const [newName, setNewName] = useState(chatroom.name);

  async function handleEditName(e) {
    e.preventDefault();
    await axios.patch(`/chatroom/edit`, {
      chatroom,
      newName,
    });

    setIsEditing((prev) => !prev);
    location.reload();
  }

  return createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className="modal modal-editing">
        <div className="modal-header">
          <p>Wprowadź nową nazwę:</p>
          <button onClick={() => setIsEditing(false)}>X</button>
        </div>
        <form onSubmit={handleEditName}>
          <input
            onChange={(ev) => setNewName(ev.target.value)}
            value={newName}
            placeholder={chatroom.name}
          />
          <button type="submit">Ok</button>
        </form>
      </div>
    </>,
    document.getElementById("modal")
  );
}
