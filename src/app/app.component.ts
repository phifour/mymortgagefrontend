import { Component, OnInit } from '@angular/core';
import { DataServiceService } from "./data-service.service";
// import * as chartsData from './chartjs';
import { ChartDataSets  } from 'chart.js';//ChartOptions
import { Color, Label, MultiDataSet } from 'ng2-charts';
import {  Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dataservice:DataServiceService) {
  }

  cashflow_table:any[] = [];

  loan:any={
    facevalue:400000,
    downpayment:80000,
    total_interest_paid:0,
    total_tax_paid:0,
    r:3,
    t:10,
    rate:-1,
    rate_monthly:-1
  };

  lineChartType:ChartType = 'line';

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Remaining Balance' },
    { data: [], label: 'Interest' },

  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];




  change() {
    console.log('change',this.loan.facevalue);

    this.loan['downpayment'] = this.loan['facevalue']*0.2;

    this.dataservice.loan(this.loan.facevalue-this.loan['downpayment'],this.loan.t,this.loan.r).subscribe((data: any)=>{
      this.barChartData = data['cashflows'];
      this.barChartLabels = data['labels'];

      this.barChartData = data['cashflows'];
      this.barChartLabels = data['labels'];
      this.lineChartLabels =  data['labels'];
      this.cashflow_table = data['cashflow_table'];
      this.lineChartData[0]['data']= [];//data['cashflows'];
      this.lineChartData[1]['data']= [];//data['cashflows'];

      console.log('data',data);
      this.loan['rate'] = data['rate'];
      this.loan['rate_monthly'] = data['rate_monthly'];
      this.loan['total_interest_paid'] = data['total_interest_paid'];

      for (let entry of this.cashflow_table) {
        console.log('entry',entry); // 1, "string", false
        this.lineChartData[0]['data'].push(entry.balance);
        this.lineChartData[1]['data'].push(entry.interest);

      }

      this.doughnutChartData = [[ this.loan['facevalue']-this.loan['downpayment'], this.loan['total_interest_paid'], 0]];

      // console.log('data[cashflow_table]', data['cashflow_table'][0].balance);


    }) ;
 }

  ngOnInit() {
    this.change();
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
  };


  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';

  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Interest' },
    { data: [45, 37, 60, 70, 46, 33], label: 'Principle' }
  ];




doughnutChartLabels: Label[] = ['Pricipal', 'Interext', 'Tax'];
doughnutChartData: MultiDataSet = [[55, 25, 20]];
doughnutChartType: ChartType = 'doughnut';







 

}


