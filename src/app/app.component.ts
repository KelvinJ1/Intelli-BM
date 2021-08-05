import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';


@Component({
  //nombre a utilizar para llamar el componente en el index
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'Intelli-BM';

  isAuth=false;
constructor(private authservice: AuthService){}

ngOnInit( ){
  
  //listener on/off sidebar
this.authservice.getAuthStatusListener().subscribe(resp=>{ 
    if (!this.authservice.getisAuthenticated()) { 
      
      return this.isAuth=resp
    }
    return this.isAuth=resp;
  });

  //levantar sesión
this.authservice.autoAuthUser();



  }


}

