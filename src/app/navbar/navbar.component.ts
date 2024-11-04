import {Component, inject, OnInit} from '@angular/core';
import {ProdService} from "../products/prod.service";
import {RouterLink} from "@angular/router";
import {LignePanier} from "../products/pani.model";
import {UserService} from "../user.service";
import {NgForOf} from "@angular/common";
import {AuthserviceService} from "../authservice.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  public prodservice = inject(ProdService)
  public userservice = inject(UserService)
  public auth = inject(AuthserviceService)
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

  logout() {
    this.auth.logged=false;
    this.userservice.user = {
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
  }
}
