import React, {useState} from 'react';
import {useContext, createContext} from 'react';
import io from 'socket.io-client';
const SOCKET_URL = 'https://app.fitnco.fit:5005';
//const SOCKET_URL = 'https://mysterious-refuge-01396.herokuapp.com/';
const socket = io(SOCKET_URL);
const SocketContext = createContext({
  socket,
});

function SocketProvider(props) {
  const [sender, setSender] = useState('');
  const [token, setToken] = useState('');
  return (
    <SocketContext.Provider
      value={{
        socket,
        setSender,
        sender,
        setToken,
        token,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;
