import { Socket } from "socket.io";
import socketIO from 'socket.io';

export const disconnect = (client: Socket) => {
  client.on("disconnect", () => {
    console.log("client disconnected");
  });
};

// Escuchar mensajes
export const message = (client: Socket, io: socketIO.Server) => {
  client.on("message", (payload: { from: string; text: string }) => {
    console.log("Message received", payload);

    io.emit('new-message', payload);
  });

  client.on("config-user", (payload: {name: string}, callback: (arg:{error: boolean, message: string}) => {}) => {
    console.log(payload.name);

    callback({
      error: false,
      message: `User ${payload.name}, configured`
    });

  });
};
