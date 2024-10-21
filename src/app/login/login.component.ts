import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthserviceService} from "../authservice.service";
import {Router} from "@angular/router";
import {ProdService} from "../products/prod.service";

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
  prodservice = inject(ProdService)
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  onSubmit():void{
    const raw = this.form.getRawValue();
    this.auth.register(raw.email,raw.username,raw.password).subscribe(()=>this.prodservice.login=true)
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
