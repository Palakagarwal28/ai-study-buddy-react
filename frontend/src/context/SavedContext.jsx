import React, { createContext, useState } from "react";

export const SavedContext = createContext(null);

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



