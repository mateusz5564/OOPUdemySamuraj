import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";
import { canvas } from "./Canvas.esm.js";
import { loader, DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { game } from "./Game.esm.js";
import { media } from "./Media.esm.js";
import { gameLevels } from "./gameLevels.esm.js";


const LEVEL_SELECT_ID = "js-level-select-screen";
const LEVEL_SELECT_BUTTON_ID = 'level-select__button';

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT_ID);
    gameLevels.forEach(gameLevel => this.createButton(gameLevel.level))
  }

  createButton(value) {
    const button = document.createElement('button');

    button.type = "button";
    button.classList.add(LEVEL_SELECT_BUTTON_ID);
    button.textContent = value;
    button.value = value;
    button.addEventListener('click', (e) => this.buttonOnClickHandler(e));
    this.element.appendChild(button);
  }

  buttonOnClickHandler(e) {
    this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
    this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
    this.loadLevel(e.currentTarget.value);
  }

  loadLevel(level) {
    media.backgroundImage = loader.loadImage("images/levelbackground.png");
    window.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(level));
  }
}

export const levelSelect = new LevelSelect();
