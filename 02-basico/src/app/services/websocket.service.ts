import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public user: User;

  constructor( private socket: Socket) {
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected to server');
      this.socketStatus = false;
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  // OUT
  loginWS(name: string) {
    return new Promise((resolve, reject) => {
      this.emit('config-user', {name}, resp => {
        if (resp.error) {
          reject();
        } else {
          this.user = new User(name);
          this.saveStorage();
          resolve();
        }
      });
    });
  }

  getUser() {
    return this.user;
  }

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage(){
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

}
