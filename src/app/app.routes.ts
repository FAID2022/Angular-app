import { Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {PanierComponent} from "./products/panier/panier.component";
import {Panier1Component} from "./panier1/panier1.component";
import {DetailComponent} from "./detail/detail.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {OrdersComponent} from "./orders/orders.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  {
    path : 'produits',
    component : ProductsComponent,
  },

  {
    path : 'panier',
    component : Panier1Component,},
  {
    path : `produits/:id`,
    component : DetailComponent,},
  {
    path : '',
    component : LoginComponent,},
  {
    path : 'login',
    component : RegisterComponent,},
  {
    path : 'register',
    component : LoginComponent,},
  {
    path : 'orders',
    component : OrdersComponent,
    canActivate: [AuthGuard],},

]
