import { Component , Input} from '@angular/core';
import {LignePanier} from "../pani.model";

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  @Input()  products !: LignePanier;
}
