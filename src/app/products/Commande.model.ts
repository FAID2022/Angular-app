import { LignePanier } from './pani.model';
import {LignePanierDAO} from "./paniIDAO";

export class Commande {
  userId: string | undefined;       // User ID associated with the order
  date: Date;           // Date of the order
  items: LignePanierDAO[]; // Array of items in the order
  total: number;        // Total price of the order

  constructor(userId: string, date: Date, items: LignePanierDAO[], total: number) {
    this.userId = userId;
    this.date = date;
    this.items = items;
    this.total = total;
  }
}

