import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.css']
})
export class PublicoComponent implements OnInit {

  ticketsEscritorios = [];
  currentticketEscritorio = {ticket: 0, escritorio: 0};

  constructor(private http: HttpClient,private wsService: WebsocketService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('container');

    this.listenSocket();
    this.getList();
  }

  private listenSocket() {
    this.wsService.listen('update-attend-tickets')
    .subscribe((ticketsEscritorios: any) => {
      console.log(ticketsEscritorios);
      this.currentticketEscritorio = ticketsEscritorios.pop();
      this.ticketsEscritorios = ticketsEscritorios.reverse();
      this.playAudio();
    });
  }

  private getList() {
    this.http.get("http://localhost:5000/ticketsEscritorios")
    .subscribe( (result: any) => {
      if (!result.error) {
        this.currentticketEscritorio = result.ticketsEscritorios.pop();
        this.ticketsEscritorios = result.ticketsEscritorios.reverse();
      }
    });
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/new-ticket.mp3";
    audio.load();
    audio.play();
  }
}
