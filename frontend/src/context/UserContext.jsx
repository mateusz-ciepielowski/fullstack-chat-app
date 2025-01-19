import { useState, useEffect, createContext } from "react";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const UserContext = createContext({
  userId: "",
  username: "",
  setUserData: () => {},
});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getChatter = async () => {
      const { data } = await axios.get("/chatter");
      setUserData(data);
    };
    getChatter();
  }, []);
  const userContext = {
    userId: userData.userId,
    username: userData.username,
    setUserData,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

export default UserContext;
