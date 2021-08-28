import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {

  userRol='';
@Input() dataEntrante:any;

  constructor() {
    this.userRol=localStorage.getItem('rol')!;
   }

  ngOnInit(): void {
    this.userRol=localStorage.getItem('rol')!;
  }

  isAdmin(){
    if(this.userRol=='user'){
      return false
    }else{
      return true
    }
  }

}
