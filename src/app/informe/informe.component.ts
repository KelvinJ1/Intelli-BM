import { Element } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Type } from '@angular/core';
import * as html2pdf from "html2pdf.js";

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})


export class InformeComponent implements OnInit {

close=true;
VALUE= "3000";
fecha= Date();
testData=[
  
  {name: "General", value: 45000000},
  {name: "Nómina", value: 5000000},
  {name: "Viáticos", value: 4000000},
  
  ];
  

  constructor() {

    
   }

  ngOnInit(): void {
  }

  

  closeModal(){
    return this.close=!this.close;
    }
    

PDF(){
  const options={
    filename:'REPORT_Intelli-BM',
    image:{type: 'jpeg'},
    html2canvas:{},
    jsPDF:{orientation: 'portrait'},
    format:[900, 1700 ]
  };
  const content = document.getElementById("invoice"); 
  html2pdf()
  .from(content)
  .set(options)
  .save();

}


}
