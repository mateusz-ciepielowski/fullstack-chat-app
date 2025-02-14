import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import RegisterModal from "./RegisterModal.jsx";
import UserContext from "../context/UserContext";
import Spinner from "./Spinner";

export default function Chat() {
  const { isAdmin, userId, setUserData } = useContext(UserContext);
  const lastMessageRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const { chatroom } = useParams();
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/message/get/${chatroom}`);

        setAllMessages(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chatroom]);

  useEffect(() => {
    // Connecting to socket.io server
    const socket = io(
      import.meta.env.MODE === "development" ? "http://localhost:8000" : "/"
    );
    socket.connect();

    socket.on("newMessage", (newMessage) => {
      setAllMessages((prev) => [...prev, newMessage]);
    });

    socket.on("deleteMessage", (deletedMessage) => {
      setAllMessages((prev) => {
        return prev.filter((message) => message._id !== deletedMessage._id);
      });
    });
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (lastMessageRef.current && allMessages) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  async function handleSendMessage(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { message } = Object.fromEntries(formData.entries());
      if (!message.trim()) return;
      const res = await axios.post("/message/send", {
        message,
        chatroom,
      });
      document.getElementById("message").value = "";
      if (res.status !== 200) setUserData({ userId: null, username: null });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteMessage(id) {
    try {
      axios.delete(`/message/delete/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {!userId && <RegisterModal chatroom={chatroom} />}
      <div className="chatbox">
        <h2>Czat: {chatroom}</h2>
        <div>
          {isLoading ? (
            <Spinner />
          ) : (
            <ul>
              {allMessages.map((message) => (
                <li key={message._id} ref={lastMessageRef}>
                  <div>
                    <b>{message.chatter.username}</b>: {message.message}
                  </div>
                  {isAdmin && (
                    <button onClick={() => handleDeleteMessage(message._id)}>
                      X
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <form className="form-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Napisz coś..."
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </>
  );
}
