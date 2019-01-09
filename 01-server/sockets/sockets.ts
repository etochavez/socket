import { Socket } from "socket.io";

export const disconnect = (client: Socket) => {
  client.on("disconnect", () => {
    console.log("client disconnected");
  });
};

// Escuchar mensajes
export const message = (client: Socket) => {
  client.on("message", (payload: { from: string; text: string }) => {
    console.log("Message received", payload);
  });
};
