import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
name:"",
password:""}

  constructor(private authService: AuthService,
    private router: Router,
    
    ) {  }

  ngOnInit(): void {
  }

  signIn() {

this.authService.signIn(this.user)
.subscribe(
  res => {
  console.log(res)

  localStorage.setItem("token", res.token);
  this.router.navigate(["/monitoring"]);


  }, 
  err=> console.log(err)
  )
}



}
