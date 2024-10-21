import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthserviceService} from "../authservice.service";
import {Router} from "@angular/router";
import {ProdService} from "../products/prod.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  auth = inject(AuthserviceService)
  router = inject(Router)
  prodservice = inject(ProdService)
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  onSubmit():void{
    const raw = this.form.getRawValue();
    this.auth.login(raw.email,raw.password).subscribe(()=>this.prodservice.login=true)
  }
}
