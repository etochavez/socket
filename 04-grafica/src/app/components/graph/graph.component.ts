import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      const newData = [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ];
      this.lineChartData = [
        { data: newData, label: 'Sells'}
      ];
    }, 1500);
  }

}
