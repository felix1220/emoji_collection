import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-chart-sample',
  templateUrl: './chart-sample.component.html',
  styleUrls: ['./chart-sample.component.scss']
})
export class ChartSampleComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#8A2BE2' }
  ]

  constructor() { }

  ngOnInit(): void {
  }
  chartClicked(event: any):void {
    console.log('Chart was clicked => ', event.active[0]._view.label);
  }

}
