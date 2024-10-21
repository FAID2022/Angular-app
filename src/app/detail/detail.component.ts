import {Component, inject, Input, OnInit} from '@angular/core';
import {LignePanier} from "../products/pani.model";
import {Product} from "../products/prod.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProdService} from "../products/prod.service";
import {NgClass, NgFor} from "@angular/common";
import {AuthserviceService} from "../authservice.service";
import {FormsModule} from "@angular/forms";
import {Comment} from "../comment.model";
import {User} from "../user.model";



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  imports: [NgClass, NgFor, RouterLink, FormsModule],
  standalone: true,
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product !: Product | undefined ;  // Product to display
  products: Array<Product> = []; // Store all products
  auth = inject(AuthserviceService)
  newComment !: Comment;
  u!:User
  constructor(
    private route: ActivatedRoute,
    private productService: ProdService // Inject service to get product details
  ) {}
  reviews !:{ rating: number; comment: string; date: string; reviewerName: string; reviewerEmail: string }[] | undefined ;
  ngOnInit(): void {


    const productId: number = +this.route.snapshot.paramMap.get('id')!; // Get 'id' from route parameters and convert to number

    // Fetch products from the service
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response.products; // Assign the fetched products

        // Find the product with the matching 'id'
        this.product = this.products.find(product => product.id === productId);
        this.reviews = this.product?.reviews;
        if (!this.product) {
          console.error('Product not found');
        }
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );

  }

  submitComment() {
    this.newComment.reviewerName = this.auth.username;
    this.newComment.reviewerEmail = this.auth.username;
    this.newComment.date = new Date().toISOString();
    if(this.product){
    this.product.reviews.push(this.newComment);}
  }
}

