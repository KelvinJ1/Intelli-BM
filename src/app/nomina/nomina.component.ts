
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddEditComponent } from '../add-edit/add-edit.component';
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
  users: User[]=[];

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

showModal(){

return this.show=!this.show;

}




}
