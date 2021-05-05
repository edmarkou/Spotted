import io from 'socket.io-client';
let socket;

export const initiateSocket = (room) => {
  socket = io('http://192.168.1.234:5000');
  console.log(`Connecting socket...`);
  if (socket && room) {
    socket.emit('join', room);
  }
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) {
    socket.disconnect();
  }
};