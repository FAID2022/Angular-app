import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {user} from "@angular/fire/auth";
import {LignePanier} from "./products/pani.model";
import {Product} from "./products/prod.model";
import { ObjectId } from 'mongodb'
import {AuthserviceService} from "./authservice.service";
import {Router} from "@angular/router";

export interface order {
  // State field
  panier:LignePanier[];
  date : Date;
  total: number;
}

export interface RegisterForm {
  username: string; // Username field
  email: string;    // Email field
  password: string; // Password field
  address: string;  // Address field
  city: string;     // City field
  state: string;    // State field
  panier:LignePanier[];
  orders:order[];
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  product:boolean=false;
  auth = inject(AuthserviceService)
  selectedpro!:LignePanier;
  public httpClient = inject(HttpClient);
  router = inject(Router);
  public user: RegisterForm = {
    username: 'user',      // Default empty string
    email: '',         // Default empty string
    password: '',      // Default empty string
    address: '',       // Default empty string
    city: '',          // Default empty string
    state: '',         // Default empty string
    panier: [] ,
    orders: []
    // Empty array for LignePanier items
  };
  addUser(user: RegisterForm) {
      this.httpClient.post("http://localhost:3000/addUser",user).subscribe((res)=>{this.user=user}, (err)=> {console.log(err)});
  }
  getUser(email: string) {
      this.httpClient.post("http://localhost:3000/getUser",{
        "email": email
      }).subscribe(
      (response:any) => {this.user=response;
        console.log(response);},
      (error:any) => {console.log(error);}
    )
  }

  save() {
    if (this.auth.logged) {
      this.httpClient.put('http://localhost:3000/putUser', this.user)
        .subscribe({
          next: (res) => {
            console.log("User updated successfully:", res);
            // Optionally, trigger a success message or UI update here
          },
          error: (err) => {
            console.error("Failed to update user:", err);
            // Optionally, display an error message to the user here
          }
        });
    } else {
      this.router.navigate(['/register']);
    }
  }}



