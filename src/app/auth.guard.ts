import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import {AuthserviceService} from "./authservice.service"; // This service will manage authentication

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.logged) {
      return true;  // Allow access to the route
    } else {
      this.router.navigate(['/register']);  // Redirect to login if not authenticated
      return false;
    }
  }
}

