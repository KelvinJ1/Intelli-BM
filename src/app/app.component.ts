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

constructor(private authservice: AuthService){}

ngOnInit(){

this.authservice.autoAuthUser();


  
}

}
