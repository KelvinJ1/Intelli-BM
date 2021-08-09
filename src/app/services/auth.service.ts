import { Injectable } from '@angular/core';
import {  HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { Pocket } from '../models/pocket.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
users: User[]=[]
private token: string;
private URL = "http://localhost:3000/api";
private authStatusListener = new Subject<boolean>();
private isAuthenticated = false;
pocketUpdated = new Subject<Pocket[]>();
usersUpdated = new Subject<User[]>();




  constructor(private http:HttpClient,  private router: Router) {
      this.token = "";
  }


getToken(){
  return this.token;
}


getAuthStatusListener(){

return this.authStatusListener.asObservable();

}

getisAuthenticated(){

return this.isAuthenticated;

}




signIn(email:string, password:string){
  this.http.post<{token:string, expiresIn:number}>(this.URL + "/signin", {email,password})
    .subscribe((response)=>{
    this.token = response.token;
    if (this.token) {
      const expirationInDuration = response.expiresIn;
      this.setAuthTimer(response.expiresIn);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime()+expirationInDuration*1000);
      console.log(expirationDate);
      this.saveAuthData(this.token, expirationDate);
      this.router.navigate(["/monitoring"])


    }
    });
}

logout(){
  this.token=" ";
  this.isAuthenticated= false;
  this.authStatusListener.next(false);
  this.clearAuthData ();
  this.router.navigate(["/"])
}

private saveAuthData (token: string, expirationDate: Date){
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate.toISOString());
}

private clearAuthData (){
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}

private getAuthData(){
const token = localStorage.getItem("token");
const expirationDate = new Date(localStorage.getItem("expiration")!);
if (!token ||!expirationDate) {
  return;
}
return{token: token, expirationDate: expirationDate};
}

private setAuthTimer(duration:number){
  setTimeout(()=>{this.logout();}, duration*1000);
}

//levantar ult sesion (si no se deslogueó )
autoAuthUser(){
const authInfo = this.getAuthData();
if (!authInfo) {
  return;
}
const now=new Date();
const expiresIn = authInfo.expirationDate.getTime()- now.getTime();
if (expiresIn>0) {

    this.token = localStorage.getItem("token")!;
    this.isAuthenticated = true;
    this.setAuthTimer(expiresIn/1000);
    this.authStatusListener.next(true);
    this.router.navigate(["/monitoring"])


}

}
getPocketsValues(){
  this.http.get<any>(this.URL+'/pockets/getPockets').pipe(map((pocketData)=>{
    return pocketData.map((pocket:{_id: string,name: string,saldo: string,duenio: string})=>{
      return{
        id: pocket._id,
        name: pocket.name,
        saldo: Number(pocket.saldo),
        duenio: pocket.duenio

      }
    })
  })).subscribe((dataTrasformed)=>{
    const pockets = dataTrasformed;
    this.pocketUpdated.next([...pockets]);
  })
}

getPocketsUpdateListener(){
  return this.pocketUpdated.asObservable();
}

getUsersValues(){
  this.http.get<any>(this.URL+'/getUsers').pipe(map((userData)=>{
    return userData.map((user:{_id: string,rol: string,name: string,password: string, phone:string, email:string,accNumber:number,
    address: string,})=>{
      return{
        id: user._id,
        name: user.name,
        password: user.password,
        phone: user.phone,
        email: user.email,
        accNumber: user.accNumber,
        address: user.address,

      }
    })
  })).subscribe((dataTrasformed)=>{
    this.users = dataTrasformed;
    this.usersUpdated.next([...this.users]);
  })
}
getUsersUpdateListener(){
  return this.usersUpdated.asObservable();
}

  deleteUser(id:string){
    this.http.delete(this.URL+'/deleteUser',{body:{id:id}}).subscribe((result)=>{
      const updatedUser = this.users.filter(user=>user.id!==id);
      this.users = updatedUser;
      console.log(this.users)
      this.usersUpdated.next([...this.users])
      this.router.navigate(['/payroll'])
    })
  }
}
