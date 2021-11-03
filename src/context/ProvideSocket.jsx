import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const ProvideSocket = ({ children }) => {
  const socket = io.connect();

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  );
};

export default ProvideSocket;
