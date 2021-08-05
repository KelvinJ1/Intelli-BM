import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  valGen= 45000000;
  valNom= 5000000;
  valVia=3000000;
  
  
  testData=[
  
    {name: "General", value: 45000000},
    {name: "Nómina", value: 5000000},
    {name: "Viáticos", value: 4000000},
    
    ];
    
  
  
}
