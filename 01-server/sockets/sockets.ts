import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UserList } from "../classes/users-list";
import { User } from "../classes/user";

export const conectedUser = new UserList();

export const conectClient = (client: Socket, io: socketIO.Server) => {
  const user = new User(client.id);
  conectedUser.addUser(user);
};

export const disconnect = (client: Socket, io: socketIO.Server) => {
  client.on("disconnect", () => {
    conectedUser.deleteUser(client.id);
    io.emit('active-users', conectedUser.getList());
  });
};

// Escuchar mensajes
export const message = (client: Socket, io: socketIO.Server) => {
  client.on("message", (payload: { from: string; text: string }) => {
    console.log("Message received", payload);

    io.emit("new-message", payload);
  });

  client.on("config-user", (payload: { name: string }, callback: Function) => {
    conectedUser.updateName(client.id, payload.name);

    io.emit('active-users', conectedUser.getList());

    callback({
      error: false,
      message: `User ${payload.name}, configured`
    });
  });
};
