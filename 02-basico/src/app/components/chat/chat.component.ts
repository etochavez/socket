import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  text = '';

  constructor( public chatService: ChatService) { }

  ngOnInit() {
  }

  send() {
    console.log(this.text);
    this.chatService.sendMessage(this.text);
    this.text = '';
  }

}
