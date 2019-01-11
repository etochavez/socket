import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  public lineChartData: Array<any> = [
    {data: [0, 0, 0, 0], label: 'Sells'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April'];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.getData();
    this.listenSocket();
  }

  public getData() {
    this.http.get("http://localhost:5000/graph")
    .subscribe( (data: any) => this.lineChartData = data)
  }

  private listenSocket() {
    this.wsService.listen('graph-data')
    .subscribe((data: any) => {
      console.log;
      this.lineChartData = data;
    });
  }

}
