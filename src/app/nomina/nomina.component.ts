import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent implements OnInit {

  private usersSub: Subscription

  show=false;
  showEdit=false;
  users: User[]=[];
  close=true;
  userEditId=''

  constructor(private authService: AuthService) {
    this.authService.getUsersValues()
    this.usersSub=this.authService.getUsersUpdateListener().subscribe((users:User[])=>{
      this.users=users
    })

   }

  ngOnInit(): void {
    this.authService.getUsersValues()
    this.usersSub=this.authService.getUsersUpdateListener().subscribe((users:User[])=>{
      this.users=users
    })
  }
  deleteUser(id:string){
    this.authService.deleteUser(id)
    this.usersSub=this.authService.getUsersUpdateListener().subscribe((users:User[])=>{
      this.users=users
    })
  }

  viaticos(id:string){
    this.authService.viaticos(id);
  }

  pagoUsers(){
    this.authService.pagoUsers();
  }



  showModal(){

    return this.show=!this.show;
  }

  showModalEdit(id:string){
    this.userEditId= id
    return this.showEdit=!this.showEdit
  }

}