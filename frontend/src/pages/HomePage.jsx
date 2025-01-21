import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [allChatrooms, setAllChatrooms] = useState([]);
  useEffect(() => {
    const getAllChatrooms = async () => {
      const { data } = await axios.get(`/chatroom`);
      setAllChatrooms(data);
    };
    getAllChatrooms();
  }, []);

  return (
    <div className="homepage">
      <h1>NM Chat</h1>
      <h2>Lista wszystkich czatów:</h2>
      <ul>
        {allChatrooms.map((chatroom) => (
          <li key={chatroom._id}>
            <Link to={`/${chatroom.name}`}>{chatroom.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
