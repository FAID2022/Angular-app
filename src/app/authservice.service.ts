import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {Commande} from "./products/Commande.model";

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  fireAuth = inject(Auth);
  firestore = inject(Firestore);
  public email !: string;
  public username !: string;
  logged : boolean = false;
  user_Id !: string | undefined;
  register(
    email: string,
    username: string,
    password: string
  ):Observable<void> {
    this.email = email;
    this.username = username;
    const promise = createUserWithEmailAndPassword(this.fireAuth, email, password).then((res)=>{this.logged=true});
    return from(promise);
  }
  login(
    email: string,
    password: string
  ):Observable<void> {
    const promise = signInWithEmailAndPassword(this.fireAuth, email, password).then(()=>{this.logged=true;
    this.user_Id=this.fireAuth.currentUser?.uid});
    return from(promise);
  }
  constructor() { }
  async saveCommande(commande: Commande): Promise<void> {
    try {
      const commandesRef = collection(this.firestore, 'commandesDAO');
      await addDoc(commandesRef, { ...commande });
      console.log('Commande stored successfully!');
    } catch (error) {
      console.error('Error storing commande:', error);
    }
  }
}
