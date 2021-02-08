import { Quote } from './Quote.js';

class Game {
  quotes = [
    {
      text: "pan tadeusz",
      category: "Utwor literacki",
    },
    {
      text: "gladiator",
      category: "Film",
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    
    const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text);
  }

  guess(char) {
    console.log(char);
  }

  drawLetters() {
    for (let i = 10; i < 36; i++) {
      const char = i.toString(36);
      const button = document.createElement("button");
      button.addEventListener("click", () => this.guess(char));
      button.innerHTML = char;
      this.lettersWrapper.append(button);
    }
  }

  start() {
    this.drawLetters();

  }
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});

game.start();

