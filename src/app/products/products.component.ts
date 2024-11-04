import {Component, inject, OnInit} from '@angular/core';
import {ItemComponent} from "./item/item.component";
import {PanierComponent} from "./panier/panier.component";
import {Product} from "./prod.model";
import{ProdService} from "./prod.service";
import {LignePanier} from "./pani.model";
import {Observable,of} from "rxjs";
import {Subscription} from "rxjs";
import {RouterLink} from "@angular/router";
import {NgFor} from "@angular/common";
export interface Category {
  _id: string;
  category: string;
}
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ItemComponent, PanierComponent, RouterLink,NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public prodservice = inject(ProdService)
  productselected: Array<Product> = [];

  products!: Array<Product>;
  filtered: Product[] = this.products;
  categories !: string[];
  selectedcategory !:string;
  ngOnInit(): void {
    this.prodservice.getCategories1()
      .subscribe(
        (response: string[]) => {
          console.log(response);
          // If you only need category names
          this.categories = response;

          // If you need the entire response as objects
          // this.categories = response;
        },
        (error) => {
          console.error('Error fetching categories', error);
        }
      );
    // Fetch products from the service
    this.prodservice.getProducts2()
      .subscribe(
        (response: any) => {

          this.filtered = response;
          this.products = response;

        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );


    // Fetch products by category if needed

  }
  onCategoryChange(selectedCategory: string) {
    // Logic to handle category selection
    console.log('Selected Category:', selectedCategory);
  }
  filter(query: string): void {
    // Adjusted to search by 'nom' and 'categorie'
    this.filtered = (query) ?
      this.products.filter(p =>
        p.title.toUpperCase().includes(query.toUpperCase())
      ) :
      this.products;
  }

  getAll(): Observable<Product[]> {
    return of(this.products);
  }
  /* ajouter1(p : Product){
    this.productselected.push({produit : p, Qte : 1})
    console.log(p)
  }
  ajouter2(p: Product) {
    // Recherche d'un produit existant dans productselected
    const existingProduct = this.productselected.find(item => item.produit.id === p.id);

    if (existingProduct) {
      // Si le produit existe, incrémenter la quantité
      existingProduct.Qte += 1;

    } else {
      // Sinon, ajouter le produit avec une quantité initiale de 1
      this.prodservice.productselected.push({ produit: p, Qte: 1,total : 1 });
    }

    console.log(this.productselected);
    this.prodservice.ajouter2(p)
  }*/
ajouter3(p : Product) {
  this.prodservice.ajouter2(p)
}

  ajouter4(category: string) {
    this.productselected = this.products.filter(product => product.category === category);
    this.prodservice.isProduct= false;
  }
}
