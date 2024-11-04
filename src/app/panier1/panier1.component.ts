import {Component, inject, NgModule, OnInit} from '@angular/core';
import {ProdService} from "../products/prod.service";
import {LignePanier} from "../products/pani.model";
import {PanierComponent} from "../products/panier/panier.component";
import {NgFor} from "@angular/common";
import {UserService} from "../user.service";
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-panier1',
  standalone: true,
  imports: [
RouterLink,
    NgFor,
  ],
  templateUrl: './panier1.component.html',
  styleUrl: './panier1.component.css'
})
export class Panier1Component implements OnInit{
isHovering: boolean = false;
router = inject(Router);
prodservice = inject(ProdService);
userservice = inject(UserService);
productselected: Array<LignePanier> = this.prodservice.productselected;
total !: number ;
  ngOnInit(): void {
    this.total = 0; // Initialize total to zero
    this.prodservice.productselected.forEach((item: LignePanier) => {
      this.total += item.total; // Add each item's total to the overall total
    });
  }

  save() {
    this.userservice.save();
  }

  buyll() {

this.userservice.product=false;

  }


  buy(item:LignePanier) {
this.userservice.product=true;
this.userservice.selectedpro = item;

  }
}
