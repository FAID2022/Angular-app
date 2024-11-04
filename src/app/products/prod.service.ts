import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Product} from "./prod.model";
import {LignePanier} from "./pani.model";
import {UserService} from "../user.service";
export interface Category {
  _id: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdService  {

  constructor(private http: HttpClient ) {}

  userservice = inject(UserService);
  productselected: Array<LignePanier> = this.userservice.user.panier;
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://dummyjson.com/products');
  }
  getProducts2(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://dummyjson.com/products/category-list');
  }

  getCategories1(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/categories')

  }

  getProductBycategory(categorie: string): Observable<Object> {
    return this.http.get('https://dummyjson.com/products/category-list')

  }
  public isPanier: boolean = false;
  public isProduct: boolean = true;
  public login : boolean = true;
  categories !: Array<string> ;
  ajouter2(p: Product) {
    // Recherche d'un produit existant dans productselected
    const existingProduct = this.userservice.user.panier.find(item => item.produit.id === p.id);

    if (existingProduct) {
      // Si le produit existe, incrémenter la quantité
      existingProduct.Qte += 1;
      existingProduct.total += p.price;
    } else {
      // Sinon, ajouter le produit avec une quantité initiale de 1
      this.userservice.user.panier.push({ produit: p, Qte: 1,total:p.price });
    }

    console.log(this.productselected);
  }
  decrementer(p: Product) {
    // Recherche d'un produit existant dans productselected
    const existingProduct = this.userservice.user.panier.find(item => item.produit.id === p.id);

    if (existingProduct) {
      // Si le produit existe, incrémenter la quantité
      if(existingProduct.Qte>0){
      existingProduct.Qte = existingProduct.Qte-1;
      existingProduct.total = existingProduct.total -  p.price;}
    } else {
      // Sinon, ajouter le produit avec une quantité initiale de 1
      this.userservice.user.panier.push({ produit: p, Qte: 1,total:p.price });
    }

    console.log(this.productselected);
  }



}
