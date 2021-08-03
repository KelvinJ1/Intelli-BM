import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

VALUE= "3000";

testData=[
  
  {name: "General", value: 45000000},
  {name: "Nómina", value: 5000000},
  {name: "Viáticos", value: 4000000},
  
  ];
  

  constructor() { }

  ngOnInit(): void {
  }

}
