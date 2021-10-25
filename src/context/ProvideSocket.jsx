import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

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
