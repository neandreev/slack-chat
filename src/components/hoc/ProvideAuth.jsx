import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ProvideAuth = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <AuthContext.Provider value={state}>
      { children }
    </AuthContext.Provider>
  );
};

export default ProvideAuth;
