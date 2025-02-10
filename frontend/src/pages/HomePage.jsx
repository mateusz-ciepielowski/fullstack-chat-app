import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/UserContext";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const { isAdmin } = useContext(UserContext);
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <h1>NM Chat</h1>
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
                    <button onClick={() => {}}>
                      <FontAwesomeIcon icon={faUser} />
                    </button>
                    <button onClick={() => {}}>
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
    </div>
  );
}
