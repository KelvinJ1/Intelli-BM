import { Injectable } from '@angular/core';
import {  HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

private token: string;
private URL = "http://localhost:3000/api";
private authStatusListener = new Subject<boolean>();
private isAuthenticated = false;


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


}