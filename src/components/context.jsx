import React, { useState, createContext } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(getLocalStorageSessionId);
  function getLocalStorageSessionId() {
    return localStorage.getItem("session_id");
  }
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem("session_id", sessionId);
      fetch(
        `https://api.themoviedb.org/3/account?api_key=70ce45fdad1824ccc3dad6c68ef34779&session_id=${sessionId}`
      )
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setUser(data);
        });
    }
  }, [sessionId]);
  function logout() {
    localStorage.clear();
    setUser(null);
    setSessionId(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, setSessionId, logout }}>
      {children}
    </UserContext.Provider>
  );
}
