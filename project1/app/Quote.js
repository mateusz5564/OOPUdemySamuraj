export class Quote {
  constructor(text) {
    this.text = text;
    this.guessed = [];
  }

  getContent() {
    let content = "";

    for (const char of this.text) {
      if (char === " " || this.guessed.includes(char)) {
        content += char;
      } else {
        content += "_";
      }
    }

    return content;
  }

  guess(char) {
    if(!this.text.includes(char)) {
      return false;
    } 
    
    this.guessed.push(char);
    return true
  }
}
