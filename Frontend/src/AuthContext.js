import React, { createContext, useState } from 'react';

// Create the AuthContext and AuthProvider
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle login
  const login = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  // Use the AuthContext to provide values to children
  const authValues = {
    user,
    loggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext values
const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
