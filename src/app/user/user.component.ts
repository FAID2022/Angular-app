import {Component, inject} from '@angular/core';
import {ProdService} from "../products/prod.service";
import {LignePanier} from "../products/pani.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthserviceService} from "../authservice.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../login/login.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
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

  });
  buyll() {
    this.userserv.user.username=this.form.getRawValue().username;
    this.userserv.user.email=this.form.getRawValue().email;
    this.userserv.user.address=this.form.getRawValue().address;
    this.userserv.user.city=this.form.getRawValue().city;
    this.userserv.user.state=this.form.getRawValue().state;
    this.userserv.save();
  }


}
