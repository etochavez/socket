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
  element: HTMLElement;

  messages: any[] = [];

  constructor( public chatService: ChatService) { }

  ngOnInit() {
    this.element = document.getElementById('chat-message');

    this.messageSubscription = this.chatService.getMessages().subscribe(msg => {
      this.messages.push(msg);
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  send() {
    if (this.text.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.text);
    this.text = '';
  }

}
