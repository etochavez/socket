import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 5, 50], label: 'Tests'}
  ];

  public barChartLabels:string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8'];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.getData();
    this.listenSocket();
  }

  public getData() {
    this.http.get("http://localhost:5000/graph/bar")
    .subscribe( (data: any) => this.barChartData = data)
  }

  private listenSocket() {
    this.wsService.listen('bar-graph-data')
    .subscribe((data: any) => {
      this.barChartData = data;
    });
  }

}
