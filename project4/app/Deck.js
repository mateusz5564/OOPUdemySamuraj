import { Card, Weights, Types } from "./Card.js";

export class Deck {
  cards = [];

  constructor() {
    Types.forEach((type) => {
      Weights.forEach((weight) => {
        this.cards.push(new Card(weight, type));
      });
    });
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0 ; i--) {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      const cardInRandomPlace = this.cards[randomIndex];
      this.cards[randomIndex] = this.cards[i];;
      this.cards[i] = cardInRandomPlace;
    }
  }

  pickOne() {
    return this.cards.pop();
  }
}
