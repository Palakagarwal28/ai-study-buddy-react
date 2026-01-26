import React, { createContext, useContext, useState } from "react";

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([]);

  const saveItem = (item) => {
    setSaved((prev) => [...prev, item]);
  };

  return (
    <SavedContext.Provider value={{ saved, saveItem }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}


