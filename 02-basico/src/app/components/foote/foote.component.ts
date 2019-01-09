import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-foote',
  templateUrl: './foote.component.html',
  styleUrls: ['./foote.component.css']
})
export class FooteComponent {

  constructor(public wsService: WebsocketService) { }

}
