import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnout-chart',
  templateUrl: './doughnout-chart.component.html',
  styleUrls: ['./doughnout-chart.component.scss']
})
export class DoughnoutChartComponent implements OnInit {

  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
  
  constructor() { }

  ngOnInit(): void {
  }

}
