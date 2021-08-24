import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pocket } from '../models/pocket.model';
import { AuthService } from '../services/auth.service';


interface Bolsillos{
   name: string,
   value: Number
 }


@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {


  show=false;
  private pocketSub: Subscription;
  pockets: Pocket[]=[];
   valGen=0;
   valNom=0;
   valVia=0;
   testData2:Bolsillos[]=[];

  isAuthenticated=false;

  constructor(private authService:AuthService) {
    // this.authService.getPocketsValues()
    this.isAuthenticated=this.authService.getisAuthenticated();
    this.pocketSub = this.authService.getPocketsUpdateListener().subscribe((pockets:Pocket[])=>{
      this.pockets = pockets
      this.setValues()
      
    })
  }
    
  ngOnInit(): void {
    this.authService.getPocketsValues()
    this.isAuthenticated=this.authService.getisAuthenticated();
    this.pocketSub = this.authService.getPocketsUpdateListener().subscribe((pockets:Pocket[])=>{
      this.pockets = pockets
      // this.setValues()  
    })
  
  }

  setValues(){
    this.valGen= Number(this.pockets[0].saldo)
    this.valVia= Number(this.pockets[1].saldo)
    this.valNom= Number(this.pockets[2].saldo)
     this.testData2.push({name:"General", value:this.valGen},
     {name:"Viaticos", value:this.valVia},
    {name:"Nomina", value:this.valNom},)
     this.testData2=[...this.testData2]
   

  }




    showModal(){

      return this.show=!this.show;
      
      }

      


}