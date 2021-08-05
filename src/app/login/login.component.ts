import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  user: User;

  isAuth=false;

  constructor(private authService: AuthService,
    // private router: Router,
    
    ) { this.user={email:"", password:""} }

  ngOnInit(): void {

  }

  signIn(form: NgForm) {
    console.log(this.user.email)
if (form.invalid) {
  return console.log("formulario inválido");
  
}
this.authService.signIn(form.value.email, form.value.password);
;
}

message(){

  if (this.authService.getToken()){
    this.isAuth=true; 
  }
  this.isAuth=false;
}



}
