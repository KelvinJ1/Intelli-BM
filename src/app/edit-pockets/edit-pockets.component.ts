import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pocket } from '../models/pocket.model';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pockets',
  templateUrl: './edit-pockets.component.html',
  styleUrls: ['./edit-pockets.component.css']
})
export class EditPocketsComponent implements OnInit {

  private pocketSub: Subscription;
  pockets: Pocket[]=[];
  userRol='';
  valGen=0;
  valNom=0;
  valVia=0;



  constructor(private authService:AuthService) {
    this.authService.getPocketsValues()
    this.userRol=localStorage.getItem('rol')!;
    this.pocketSub = this.authService.getPocketsUpdateListener().subscribe((pockets:Pocket[])=>{
      this.pockets = pockets
      this.setValues()
    })
   }

  ngOnInit(): void {
    this.authService.getPocketsValues()
    this.userRol=localStorage.getItem('rol')!;
    this.pocketSub = this.authService.getPocketsUpdateListener().subscribe((pockets:Pocket[])=>{
      this.pockets = pockets
      this.setValues()
    })
  }
  setValues(){
    this.valGen= Number(this.pockets[0].saldo)
    this.valVia= Number(this.pockets[1].saldo)
    if(this.userRol=='admin'){
      this.valNom= Number(this.pockets[2].saldo)
    }
  }

  
    


  makeOperation(form: NgForm,pocketId:string){
    this.authService.makeOperation(this.pockets[0].id,form.value.valor,pocketId)
  }

  

  isAdmin(){
    if(this.userRol=='user'){
      return false
    }else{
      return true
    }
  }


}