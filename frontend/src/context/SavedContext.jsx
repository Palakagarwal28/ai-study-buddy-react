import React, { createContext, useContext, useState } from "react";

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [savedItems, setSavedItems] = useState([]);

  const saveItem = (item) => {
    setSavedItems((prev) => [...prev, item]);
  };

  return (
    <SavedContext.Provider value={{ savedItems, saveItem }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}



export function useSaved() {
  const context = useContext(SavedContext);

  if (!context) {
    throw new Error("useSaved must be used inside SavedProvider");
  }

  return context;
}



