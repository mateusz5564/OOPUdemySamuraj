import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";

class Game {

  constructor({hitBtn, standBtn, table, player}) {
    this.hitBtn = hitBtn,
    this.standBtn = standBtn,
    this.player = player;
    this.dealer = new Player("Krupier");
    this.table = table
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitBtn.addEventListener("click", (e) => this.hitCard());
    this.standBtn.addEventListener("click", (e) => this.dealerPlays());
    this.dealCards();
  }

  hitCard(e) {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.table.showPlayerPoints(this.player.calculatePoints());
  }

  dealerPlays(e) {
    while( this.dealer.points < this.player.points && this.dealer.points < 21 && this.player.points <= 21) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealerPoints(this.dealer.calculatePoints());
    }
  }

  dealCards() {
    for (let i = 0; i < 2; i++) {
      const card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.table.showPlayersCard(card1);

      const card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.showDealersCard(card2);
    }

    this.table.showPlayerPoints(this.player.calculatePoints());
    this.table.showDealerPoints(this.dealer.calculatePoints());
  }
}

const table = new Table(document.getElementById('dealersCards'), document.getElementById('playersCards'), document.getElementById('dealerPoints'), document.getElementById('playerPoints'));
const player = new Player("Jan");
const game = new Game({
  hitBtn: document.getElementById("hit"),
  standBtn: document.getElementById("stand"),
  player,
  table
});
game.run();