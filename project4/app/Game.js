import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

class Game {

  constructor({playersCards, dealersCards, player}) {
    this.player = player;
    this.dealer = new Player("Krupier");
    this.playersCards = playersCards;
    this.dealersCards = dealersCards;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.dealCards();
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      const card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.playersCards.appendChild(card1.render());

      const card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.dealersCards.appendChild(card2.render());
    }
  }
}

const player = new Player("Jan");
const game = new Game({
  player,
  playersCards: document.getElementById('playersCards'),
  dealersCards: document.getElementById('dealersCards'),
});
game.run();