/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-const */

import { Server } from 'socket.io';

class Socket {
  constructor(server) {
    const io = new Server(server, {});
    this.io = io;
    this.connectedClients = {};

    io.on('connection', socket => {
      this.connectedClients[socket.handshake.query.userId] = socket.id;
      console.log(this.connectedClients);
      socket.on('disconnect', () => {
        console.log(
          `user ${
            this.connectedClients[socket.handshake.query.userId]
          } disconnected`
        );
        delete this.connectedClients[socket.handshake.query.userId];
        console.log(this.connectedClients);
      });
    });
  }

  generateNotification(userId, message) {
    try {
      this.io.to(this.connectedClients[userId]).emit('notification', message);
      return true;
    } catch (error) {
      return error;
    }
  }
}

export default Socket;
