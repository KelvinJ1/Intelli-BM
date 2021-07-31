import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testData=[
  
  {name: "General", value: 45000000},
  {name: "Nómina", value: 5000000},
  {name: "Viáticos", value: 4000000},
  
  ];
  


}
