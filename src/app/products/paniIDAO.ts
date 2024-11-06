

export class LignePanierDAO{
  id :number;
  Qte :number = 0;
  constructor(id: number = 0, Qte: number = 0) {
    this.id = id;
    this.Qte = Qte;
  }
}
