import {Component, inject} from '@angular/core';
import {ProdService} from "../products/prod.service";
import {UserService} from "../user.service";
import {LignePanier} from "../products/pani.model";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  prodservice = inject(ProdService);
  userservice = inject(UserService);
  total !: number ;


  save() {
    this.userservice.save();
  }

  buyll() {



  }


  buy() {

  }
}
