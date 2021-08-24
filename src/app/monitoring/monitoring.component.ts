import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pocket } from '../models/pocket.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  private pocketSub: Subscription;
  userRol='';
  pockets: Pocket[]=[];

  label1='';
  label2='';
  label3='';


  valPocket1=0;
  valPocket2=0;
  valPocket3=0;

  constructor(private authService:AuthService) {
    this.userRol=localStorage.getItem('rol')!;
    this.authService.getPocketsValues()
    this.pocketSub = this.authService.getPocketsUpdateListener().subscribe((pockets:Pocket[])=>{
      this.pockets = pockets
      this.setValues()
    })
  }

  ngOnInit(): void {
    this.userRol=localStorage.getItem('rol')!;
    this.authService.getPocketsValues()
    this.pocketSub = this.authService.getPocketsUpdateListener().subscribe((pockets:Pocket[])=>{
      this.pockets = pockets
      this.setValues()
    })
  }

  isAdmin(){
    if(this.userRol=='user'){
      return false
    }else{
      return true
    }
  }

  setValues(){

    this.label1=this.pockets[0].name
    this.label2=this.pockets[1].name
    if(this.userRol=='admin'){
      this.label3=this.pockets[2].name
    }

    this.valPocket1= Number(this.pockets[0].saldo)
    this.valPocket2= Number(this.pockets[1].saldo)
    if(this.userRol=='admin'){
      this.valPocket3= Number(this.pockets[2].saldo)
    }
  }

  testData=[

    {name: "General", value: this.valPocket1},
    {name: "Nómina", value: this.valPocket2},
    {name: "Viáticos", value: this.valPocket3},

    ];



}
