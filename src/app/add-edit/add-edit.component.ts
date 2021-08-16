import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

close=true;
user:User;
  constructor(private authService: AuthService ) { 

    this.user={id:'',rol:'',name:'',email:"", password:"",phone:'',accNumber:0,address:''}

  }

  ngOnInit(): void {
  }

  addUser(form: NgForm) {
    if (form.invalid) {
      return console.log("formulario inválido");
    }
    this.authService.addUser( form.value.rol, form.value.name, form.value.password, form.value.phone, form.value.email,
      form.value.accNumber, form.value.address);
    }
    

closeModal(){
return this.close=!this.close;
}



}
