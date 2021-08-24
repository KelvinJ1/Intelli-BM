import { Element } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Type, Input } from '@angular/core';
import * as html2pdf from "html2pdf.js";

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})


export class InformeComponent implements OnInit {
@Input() dataEntrante:any;

close=true;
VALUE= "3000";
fecha= Date();

  

  constructor() {

    
   }

  ngOnInit(): void {

    console.log(this.dataEntrante)

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
