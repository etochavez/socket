import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = '';

  constructor(public wsService: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  enter() {
    if (this.name.trim().length === 0) {return;} // Verifico que nombre no este vacio
    this.wsService.loginWS(this.name)
    .then(() => {
      this.router.navigateByUrl('/messages');
    });
  }

}
