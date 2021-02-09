import { Quote } from './Quote.js';

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: "pan tadeusz",
      category: "Utwor literacki",
    },
    {
      text: "zielona mila",
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

  guess(event, char) {
    event.target.disabled = true;
    if (this.quote.guess(char)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      this.drawOutput();
      if(this.currentStep == this.lastStep) {
        this.losing();
      } 
    }
  }

  drawOutput() {
    document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
  }

  drawQuote() {
    const content = this.quote.getContent()
    this.wordWrapper.innerHTML = content;
    if(!content.includes("_")) {
      this.winning();
    }
  }

  drawLetters() {
    for (let i = 10; i < 36; i++) {
      const char = i.toString(36);
      const button = document.createElement("button");
      button.addEventListener("click", (event) => this.guess(event, char));
      button.innerHTML = char;
      this.lettersWrapper.append(button);
    }
  }

  start() {
    this.drawOutput();
    this.drawLetters();
    this.drawQuote();
  }

  winning() {
    this.wordWrapper.innerHTML = "Gratulacje! Wygrałeś!";
    this.lettersWrapper.innerHTML = "";
  }
  
  losing(){
    this.wordWrapper.innerHTML = "Przegrałeś!";
    this.lettersWrapper.innerHTML = "";
  }
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});

game.start();

