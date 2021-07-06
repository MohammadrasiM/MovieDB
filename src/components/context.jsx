import React, { useState, createContext } from "react";

export const ContextContext = createContext();

export default function ContextProvider({ children }) {
  const [value, setValue] = useState(true);
  return (
    <ContextContext.Provider value={{ value, setValue }}>
      {children}
    </ContextContext.Provider>
  );
}
