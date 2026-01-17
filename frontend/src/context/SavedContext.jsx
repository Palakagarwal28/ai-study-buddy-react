import React from "react";
import { createContext, useContext, useState } from "react";

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [savedItems, setSavedItems] = useState([]);

  const saveItem = (item) => {
    setSavedItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [item, ...prev];
    });
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
