import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthserviceService} from "../authservice.service";
import {Router} from "@angular/router";
import {ProdService} from "../products/prod.service";
import {order, UserService} from "../user.service";
import {LignePanier} from "../products/pani.model";

export interface User {
  username: string; // Username field
  email: string;    // Email field
  password: string; // Password field
  address: string;  // Address field
  city: string;     // City field
  state: string;    // State field
  panier: LignePanier[];
  orders:order[];
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  fb = inject(FormBuilder)
  auth = inject(AuthserviceService)
  router = inject(Router)
  userserv = inject(UserService)
  prodservice = inject(ProdService)
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
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], // Optional: Added email validation
    password: ['', Validators.required],
    address: ['', Validators.required], // Add address field
    city: ['', Validators.required],    // Add city field
    state: ['', Validators.required],    // Add state field
  });
  onSubmit():void{
    const raw = this.form.getRawValue();
    this.auth.register(raw.email,raw.username,raw.password).subscribe(()=>this.prodservice.login=true)
    this.user.username=raw.username;
    this.user.email=raw.email;
    this.user.password=raw.password;
    this.user.address=raw.address;
    this.user.city=raw.city;
    this.user.state=raw.state;

    this.userserv.addUser(this.user)
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
