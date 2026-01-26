import React, { createContext, useContext, useState } from "react";

const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const [savedItems, setSavedItems] = useState([]);

  function saveItem(item) {
    setSavedItems((prev) => [...prev, item]);
  }

  function removeItem(id) {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <SavedContext.Provider
      value={{
        savedItems,
        saveItem,
        removeItem,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}


export function useSaved() {
  const context = useContext(SavedContext);

  if (!context) {
    throw new Error("useSaved must be used inside SavedProvider");
  }

  return context;
}



