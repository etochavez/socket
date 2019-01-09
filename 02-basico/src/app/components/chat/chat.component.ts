import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  text = '';
  messageSubscription: Subscription;

  constructor( public chatService: ChatService) { }

  ngOnInit() {
    this.messageSubscription = this.chatService.getMessages().subscribe(msg => {
      console.log(msg);
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  send() {
    console.log(this.text);
    this.chatService.sendMessage(this.text);
    this.text = '';
  }

}
