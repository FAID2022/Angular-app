import { Product } from "./prod.model";

export class LignePanier{
    produit !:Product
    Qte :number = 0;
    total : number = this.produit.price * this.Qte;
}
