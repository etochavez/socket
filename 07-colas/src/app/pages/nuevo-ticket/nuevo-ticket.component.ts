import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  styleUrls: ['./nuevo-ticket.component.css']
})
export class NuevoTicketComponent implements OnInit {
  ticketActual: number = 0;
  /**
   * Esta es la variable para imprimir un ticket
   * resuelve el problema de asignacion cuando se toca en dos pantallas
   * al mismo tiempo
   */
  ticketToPrint: number;

  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
    ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('container');

    this.currentTicket();
    this.listenSocket();
  }

  private newTicket() {
    this.http.get("http://localhost:5000/newTicket")
    .subscribe( (result: {error: boolean, ticket: number}) => {
      this.ticketToPrint = result.ticket;
    });
  }

  private currentTicket() {
    this.http.get("http://localhost:5000/currentTicket")
    .subscribe( (result: {error: boolean, ticket: number}) => {
      this.ticketActual = result.ticket;
    });
  }

  private listenSocket() {
    this.wsService.listen('last-ticket')
    .subscribe((ticket: number) => {
      console.log;
      this.ticketActual = ticket;
    });
  }
}
