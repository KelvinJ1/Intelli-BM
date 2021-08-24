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
pockets: Pocket[]=[];
users: User[]=[];
user!: User;
private token: string;
private URL = "http://localhost:3000/api";
private authStatusListener = new Subject<boolean>();
private isAuthenticated = false;
pocketUpdated = new Subject<Pocket[]>();
usersUpdated = new Subject<User[]>();
userUpdated = new Subject<User>();




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
  this.http.post<{token:string, expiresIn:number,rol:string}>(this.URL + "/signin", {email,password})
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
      this.saveAuthData(this.token, expirationDate, response.rol);
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

private saveAuthData (token: string, expirationDate: Date, rol:string){
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expirationDate.toISOString());
  localStorage.setItem("rol", rol );
}

private clearAuthData (){
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("rol");
}

private getAuthData(){
const token = localStorage.getItem("token");
const expirationDate = new Date(localStorage.getItem("expiration")!);
const rolStorage = localStorage.getItem('rol')
if (!token ||!expirationDate||!rolStorage) {
  return;
}
return{token: token, expirationDate: expirationDate,rol:rolStorage};
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
    this.pockets = dataTrasformed;
    this.pocketUpdated.next([...this.pockets]);
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
      this.router.navigateByUrl('/monitoring', {skipLocationChange: true}).then(()=>
      this.router.navigate(["payroll"]));
    })
  }

  makeOperation(id1:string,valor:number,id2?:string){

    this.http.put(this.URL+'/pockets/makeOperation',{id1:id1,valor:valor,id2:id2}).subscribe((result)=>{
      console.log(result)
      this.getPocketsValues()

      this.router.navigateByUrl('/monitoring', {skipLocationChange: true}).then(()=>
      this.router.navigate(["managment"]));
    })

  }

  getUserEdit(id:string){
    this.http.post<any>(this.URL +'/getUserEdit',{id:id}).subscribe((result)=>{
      const userEd={
        id:result._id,
        rol: result.rol,
        name:result.name,
        password:result.password,
        phone:result.phone,
        email:result.email,
        accNumber: result.accNumber,
        address: result.address}
      this.user =userEd
      this.userUpdated.next(this.user)
    })


  }
  getUserUpdateListener(){
    return this.userUpdated.asObservable();
  }

  editUser(id: string, rol: string, name:string, password:string, phone:string, email:string, accNumber: number, address: string){
    this.http.put<any>(this.URL+'/editUser',{id,rol,name,password,phone,email,accNumber,address}).subscribe((result)=>{
      const userEd={
        id:result._id,
        rol: result.rol,
        name:result.name,
        password:result.password,
        phone:result.phone,
        email:result.email,
        accNumber: result.accNumber,
        address: result.address}
      this.user=userEd;
      this.userUpdated.next(this.user)
      this.router.navigateByUrl('/monitoring', {skipLocationChange: true}).then(()=>
      this.router.navigate(["payroll"]));

    })
  }

  viaticos(id:string){
    this.http.put(this.URL+"/pockets/viaticos",{id:id}).subscribe((result)=>{
      alert('Pago efectuado.')

    })

  }

  pagoUsers(){
    this.http.put(this.URL+"/pockets/pagoUsers",{rol:'user'}).subscribe((result)=>{
      alert('Pago efectuado.')

    })

  }
}
