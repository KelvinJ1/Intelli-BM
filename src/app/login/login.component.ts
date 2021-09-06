import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { Swal } from "sweetalert2/dist/sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  user: User;
  isAuth=false;
alerta=false
  constructor(private authService: AuthService,
    // private router: Router,

    ) {this.user={id:'',rol:'',name:'',email:"", password:"",phone:'',accNumber:0,address:''} 
 
 
  }


  ngOnInit(): void {

  }

  signIn(form: NgForm) {
if (form.invalid) {
  return console.log("formulario inválido");

}

this.authService.signIn(form.value.email, form.value.password);
;
}





}
