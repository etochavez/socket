import { User } from './user';
export class UserList {
  private list: User[] = [];
  constructor() {}

  public addUser(user: User) {
    this.list.push(user);
    console.log(this.list);
    return user;
  }

  public updateName(id: string, name: string) {
    const user = this.getUser(id);
    if (user) {
      user.name = name;
    }

    console.log('Update user name');
    console.log(this.list);
  }

  // Get user list
  public getList() {
    return this.list;
  }

  public getUser(id: string) {
    return this.list.find(e => e.id === id);
  }

  public getAllRoomUsers(room: string) {
    return this.list.filter(e => e.room === room)
  }

  public deleteUser(id: string) {
    const temUser = this.getUser(id);

    this.list = this.list.filter(e => e.id !== id);

    return temUser;
  }
}
