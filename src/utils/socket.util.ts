import { io } from 'socket.io-client';

export const initializingSocket = () => {
  const socket = io('http://localhost:5000');

  return socket;
};
