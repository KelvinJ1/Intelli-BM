import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

interface options{
  name: string,
  value: string
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() messageId!: string;


  private userSub!: Subscription
  user!:User;
  close=true;
  lista:options[]=[{name:'User',value:'user'},{name:'Admin',value:'admin'}];
  seleccionado!:string;


  constructor(private authSevice:AuthService) {
    this.authSevice.getUserEdit(this.messageId);
    this.userSub=this.authSevice.getUserUpdateListener().subscribe((user:User)=>{
      this.user=user;
      this.getSeleccionado(user.rol)

    })
   }

  ngOnInit(): void {

    this.authSevice.getUserEdit(this.messageId);
    this.userSub=this.authSevice.getUserUpdateListener().subscribe((user:User)=>{
      this.user=user;
      this.getSeleccionado(user.rol)

    })

  }

  updatedUser(form:NgForm){

    this.authSevice.editUser(this.user.id,form.value.rol,form.value.name,form.value.password,form.value.phone,form.value.email,form.value.accNumber,form.value.address)
  }


  closeModal(){

    return this.close=!this.close;


    }

  getSeleccionado(value:string){
    if(value&&value===this.lista[0].value){
      this.seleccionado = this.lista[0].value
    }else{
      this.seleccionado = this.lista[1].value
    }
  }


}
