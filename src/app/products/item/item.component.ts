import { Component,Input,Output,EventEmitter } from '@angular/core';
import {Product} from "../prod.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() product !: Product;
  @Output() prodselected = new EventEmitter<Product>()
  ajouter(){
    this.prodselected.emit(this.product);
  }
  get State(): string {
    return this.product.stock === 0 ? "EN RUPTURE DE STOCK" : "EN STOCK";
  }


  get Col(): string {
    return this.product.stock === 0 ? "red" : "green";
  }
  get stock():boolean {
    return this.product.stock === 0 ? false : true;
  }
}
