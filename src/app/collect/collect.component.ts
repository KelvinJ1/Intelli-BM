import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {

  userRol='';
  dis=false;
  via= false;
@Input() dataEntrante:any;

  constructor(private authService: AuthService) {
    this.userRol=localStorage.getItem('rol')!;
   }

  ngOnInit(): void {
    this.userRol=localStorage.getItem('rol')!;
  }
  makeOperation(form: NgForm,pocketId:string){
    this.authService.makeOperation(pocketId,form.value.valor)

  }
  showVia(){
    this.via = !this.via;
    if(this.dis==true){
      this.dis=false;
    }
  }
  showDis(){
    this.dis = !this.dis;
    if(this.via==true){
      this.via=false;
    }

  }


}