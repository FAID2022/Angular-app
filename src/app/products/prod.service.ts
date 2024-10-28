import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Product} from "./prod.model";
import {LignePanier} from "./pani.model";
export interface Category {
  _id: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdService  {

  constructor(private http: HttpClient ) {}
  productselected: Array<LignePanier> = [];
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://dummyjson.com/products');
  }
  getProducts2(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  getCategories(): Observable<Object> {
    return this.http.get('https://dummyjson.com/products/category-list')

  }
  getCategories1(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories')
      .pipe(
        catchError(error => {
          console.error('HTTP error:', error); // Additional logging
          return throwError(() => new Error('Error fetching categories'));
        })
      );
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
    const existingProduct = this.productselected.find(item => item.produit.id === p.id);

    if (existingProduct) {
      // Si le produit existe, incrémenter la quantité
      existingProduct.Qte += 1;
      existingProduct.total += p.price;
    } else {
      // Sinon, ajouter le produit avec une quantité initiale de 1
      this.productselected.push({ produit: p, Qte: 1,total:p.price });
    }

    console.log(this.productselected);
  }
  decrementer(p: Product) {
    // Recherche d'un produit existant dans productselected
    const existingProduct = this.productselected.find(item => item.produit.id === p.id);

    if (existingProduct) {
      // Si le produit existe, incrémenter la quantité
      if(existingProduct.Qte>0){
      existingProduct.Qte = existingProduct.Qte-1;
      existingProduct.total = existingProduct.total -  p.price;}
    } else {
      // Sinon, ajouter le produit avec une quantité initiale de 1
      this.productselected.push({ produit: p, Qte: 1,total:p.price });
    }

    console.log(this.productselected);
  }



}
