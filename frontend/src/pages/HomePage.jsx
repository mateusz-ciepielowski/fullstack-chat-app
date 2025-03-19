import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/UserContext";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPencil,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ModalContext from "../context/ModalContext";
import EditModal from "../components/EditModal";
import AttendanceModal from "../components/AttendanceModal";

import logo from "./nmlogo.png";
import exportMessages from "../util/exportMessages";

export default function HomePage() {
  const { isAdmin } = useContext(UserContext);
  const modalCtx = useContext(ModalContext);
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chosenChatroom, setChosenChatroom] = useState(null);

  useEffect(() => {
    const getAllChatrooms = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/chatroom`);
      setAllChatrooms(data);
      setIsLoading(false);
    };
    getAllChatrooms();
  }, []);

  function handleDeleteChatroom(chatroom) {
    const confirmation = confirm("Czy na pewno chcesz usunąć pokój?");

    if (!confirmation) return;
    const deleteChatroom = async () => {
      await axios.delete("/chatroom/delete", {
        data: {
          chatroom,
        },
      });
    };
    deleteChatroom();
    alert("Pokój został usunięty!");
    location.reload();
  }

  return (
    <div className="homepage">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={logo} className="logo" />
        {!isAdmin ? (
          <Link to={"/login"}>Login</Link>
        ) : (
          <Link to={"/admin"}>Admin Page</Link>
        )}
      </div>
      <h2>Lista wszystkich czatów:</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {allChatrooms.map((chatroom) => (
            <li key={chatroom._id}>
              <div className="chatroom-list">
                <Link to={`/${chatroom.name}`}>{chatroom.name}</Link>
                {isAdmin && (
                  <>
                    <button
                      onClick={() => {
                        setChosenChatroom(chatroom);
                        modalCtx.setIsAttendanceClosed((prev) => !prev);
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </button>
                    <button
                      onClick={() => {
                        setChosenChatroom(chatroom);
                        exportMessages(chatroom.name);
                      }}
                    >
                      <FontAwesomeIcon icon={faComments} />
                    </button>
                    <button
                      onClick={() => {
                        setChosenChatroom(chatroom);
                        modalCtx.setIsEditing((prev) => !prev);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteChatroom(chatroom)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {modalCtx.isEditing && <EditModal chatroom={chosenChatroom} />}
      {modalCtx.isAttendanceClosed && (
        <AttendanceModal chatroom={chosenChatroom} />
      )}
    </div>
  );
}
