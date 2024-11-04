import {Component, inject} from '@angular/core';
import {ProdService} from "../products/prod.service";
import {LignePanier} from "../products/pani.model";
import {NgFor} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthserviceService} from "../authservice.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../login/login.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  prodservice = inject(ProdService);
  productselected: Array<LignePanier> = this.prodservice.productselected;

  calculateTotal(): number {
    return this.userserv.user.panier.reduce((acc, item) => {
      return acc + (item.produit.price * item.Qte);
    }, 0);
  }
  fb = inject(FormBuilder)
  auth = inject(AuthserviceService)
  router = inject(Router)
  userserv = inject(UserService)

  user: User = {
    username: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    panier:[],
    orders : []
  };
  form: FormGroup = this.fb.nonNullable.group({
    username: [this.userserv.user.username, Validators.required],
    email: [this.userserv.user.email, [Validators.required, Validators.email]], // Optional: Added email validation
    password: [this.userserv.user.password, Validators.required],
    address: [this.userserv.user.address, Validators.required], // Add address field
    city: [this.userserv.user.address, Validators.required],    // Add city field
    state: [this.userserv.user.state, Validators.required],    // Add state field
    zip: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });
  buyll() {
    const total = this.userserv.user.panier.reduce((acc, item) => {
      return acc + item.total; // Accumulate the total from each LignePanier item
    }, 0);

    this.userserv.user.orders.push({
      panier: this.userserv.user.panier,
      date: new Date(),
      total: total // Assign the accumulated total here
    });

    this.userserv.save();
  }

  buyone() {
    this.userserv.user.orders.push({
      // State field
      panier:[this.userserv.selectedpro],
      date : new Date(),
      total: this.userserv.selectedpro.total
    })
    this.userserv.save();
  }
}
