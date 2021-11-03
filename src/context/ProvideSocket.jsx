import React, { createContext, useContext } from 'react';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const ProvideSocket = ({ socket, children }) => (
  <SocketContext.Provider value={socket}>
    { children }
  </SocketContext.Provider>
);

export default ProvideSocket;
