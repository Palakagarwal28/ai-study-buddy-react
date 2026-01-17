
import React, { createContext, useContext, useState } from "react";

/**
 * AuthContext holds login state for the entire app
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fake login (UI only)
  const login = (email) => {
    setUser({ email });
  };

  // Fake logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
