import {Component, inject, OnInit} from '@angular/core';
import {ProdService} from "../products/prod.service";
import {RouterLink} from "@angular/router";
import {LignePanier} from "../products/pani.model";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public prodservice = inject(ProdService)
  panier(){
    this.prodservice.isPanier = true;
    this.prodservice.isProduct = false
  }
  panier1(){

    this.prodservice.isProduct = true;
  }
  categories !: Array<String> ;
  ngOnInit(): void {
    this.prodservice.getCategories()
      .subscribe(
        (response: any) => {
          this.categories = response.products;

        },
        (error) => {
          console.error('Error fetching products', error);
        }
      );

    // Fetch products by category if needed

  }
}
