import { Deck } from "./Deck.js";
import { Message } from "./Message.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";

class Game {

  constructor({hitBtn, standBtn, table, player, messageBox}) {
    this.hitBtn = hitBtn,
    this.standBtn = standBtn,
    this.player = player;
    this.messageBox = messageBox;
    this.dealer = new Player("Krupier");
    this.table = table
    this.deck = new Deck();
    this.deck.shuffle();
    this.hitCard = this.hitCard.bind(this);
    this.dealerPlays = this.dealerPlays.bind(this);
  }

  run() {
    this.hitBtn.addEventListener("click", this.hitCard);
    this.standBtn.addEventListener("click", this.dealerPlays);
    this.dealCards();
  }

  hitCard(e) {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
    this.table.showPlayerPoints(this.player.calculatePoints());
  }

  endGame() {
    this.hitBtn.removeEventListener("click", this.hitCard);
    this.standBtn.removeEventListener("click", this.dealerPlays);

    this.hitBtn.style.display = "none";
    this.standBtn.style.display = "none";

    if(this.player.points <= 21 && this.player.points == this.dealer.points) {
      this.messageBox.setText("Remis").show();
      return;
    }

    if(this.player.points > 21) {
      this.messageBox.setText("Dealer wygrywa").show();
      return;
    }

    if(this.dealer.points > 21) {
      this.messageBox.setText("Gracz wygrywa").show();
      return;
    }

    if(this.player.points < this.dealer.points) {
      this.messageBox.setText("Dealer wygrywa").show();
      return;
    }

  }

  dealerPlays(e) {
    while( this.dealer.points < this.player.points && this.dealer.points < 21 && this.player.points <= 21) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.showDealerPoints(this.dealer.calculatePoints());
    }

    this.endGame();
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
const messageBox = new Message(document.getElementById("message"));
const player = new Player("Jan");
const game = new Game({
  hitBtn: document.getElementById("hit"),
  standBtn: document.getElementById("stand"),
  player,
  table,
  messageBox
});
game.run();