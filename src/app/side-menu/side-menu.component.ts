
import { Component, OnInit, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AstMemoryEfficientTransformer } from '@angular/compiler';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  isAuth = false;
  private authListenerSub!: Subscription;


  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    //added to inform the renderized component that the token is still on
    this.isAuth=this.authService.getisAuthenticated();
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe((isAuthenticated)=>{
      this.isAuth = isAuthenticated;
     
     
   
    }); 
  }

//para salir
onLogout(): void {
this.authService.logout();
};  




}
