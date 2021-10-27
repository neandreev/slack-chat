import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const ProvideSocket = ({ children, socket }) => {
  const connect = socket || io();

  return (
    <SocketContext.Provider value={connect}>
      { children }
    </SocketContext.Provider>
  );
};

export default ProvideSocket;
