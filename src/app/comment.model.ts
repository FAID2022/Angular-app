import { User } from './user.model'; // Assurez-vous de bien importer la classe User

export class Comment {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;

  constructor(rating: number, comment: string, reviewerName: string, reviewerEmail: string) {
    this.rating = rating;
    this.comment = comment;
    this.date = new Date().toISOString(); // Initialise la date avec la date actuelle
    this.reviewerName = reviewerName;
    this.reviewerEmail = reviewerEmail;
  }
}

