import {Component, inject} from '@angular/core';
import {ProdService} from "../products/prod.service";
import {LignePanier} from "../products/pani.model";
import {NgFor} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthserviceService} from "../authservice.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../login/login.component";
import {Commande} from "../products/Commande.model";
import {LignePanierDAO} from "../products/paniIDAO";

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
  public c1 = new Commande('', new Date(), [], 0);
  buyll() {
    console.log('Starting buyAll process'); // Log to confirm function is called
  //  const total = this.userserv.user.panier.reduce((acc, item) => {
   //   return acc + item.total; // Accumulate the total from each LignePanier item
   // }, 0);
 this.c1.date=new Date();
 /*this.c1.items = this.userserv.user.panier.map(item => ({
      id: item.produit.id,
      Qte: item.Qte
    }));*/
 this.c1.total=30;
 this.c1.userId=this.auth.user_Id
  /*  this.userserv.user.orders.push({
      panier: this.userserv.user.panier,
      date: new Date(),
      total : this.userserv.user.panier.reduce((acc, item) => acc + item.total, 0)// Assign the accumulated total here
    });*/

    console.log('Prepared commande:', this.c1);
    this.auth.saveCommande(this.c1).then(() => {
      console.log('Commande saved!');
    }).catch(error => {
      console.error('Error saving commande:', error);
    });
  }

  buyll2() {
  const c2 = new Commande('', new Date(), [], 0);
    console.log('Starting buyAll process');
    const panierDAO: LignePanierDAO[] = this.userserv.user.panier.map(item => ({
      id: item.produit.id,
      Qte: item.Qte // Ensure this matches the exact property name in `LignePanierDAO`
    }));

    this.userserv.save()

    c2.items=panierDAO;
    c2.userId=this.auth.user_Id;
    c2.total=parseFloat(this.userserv.user.panier.reduce((acc, item) => acc + item.total, 0).toFixed(2))
    console.log('Prepared commande:', c2);

    // Save the commande with error handling
    this.auth.saveCommande(c2)
      .then(() => {
        console.log('Commande saved!');
      })
      .catch(error => {
        console.error('Error saving commande:', error);
      });
  }

  buyone() {
    console.log('Starting buyAll process');
    this.userserv.user.orders.push({
      // State field
      panier:[this.userserv.selectedpro],
      date : new Date(),
      total: this.userserv.selectedpro.total
    })
    this.userserv.save();
  }
}
