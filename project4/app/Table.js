export class Table {
  constructor(dealersCards, playersCards, dealerPoints, playerPoints) {
    this.dealersCards = dealersCards;
    this.playersCards = playersCards;
    this.dealerPoints = dealerPoints;
    this.playerPoints = playerPoints;
  }

  showPlayersCard(card) {
    this.playersCards.appendChild(card.render());
  }

  showDealersCard(card) {
    this.dealersCards.appendChild(card.render());
  }

  showPlayerPoints(points) {
    this.playerPoints.innerHTML = points;
  }

  showDealerPoints(points) {
    this.dealerPoints.innerHTML = points;
  }
}