import { Injectable } from '@angular/core';
import {  HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

private token: string;
private URL = "http://localhost:3000/api";


  constructor(private http:HttpClient) { 

      this.token = "";

  }


getToken(){

  return this.token;

}

signIn(email:string, password:string){
 this.http.post<{token:string}>(this.URL + "/signin", {email,password})
 .subscribe((response)=>{


  this.token = response.token;
 });

}


}