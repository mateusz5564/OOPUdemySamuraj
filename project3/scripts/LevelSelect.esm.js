import { Common, HIDDEN_SCREEN } from "./Common.esm.js";

const gameLevels = [
  {
    level: 1,
  },
  {
    level: 2,
  },
];

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
    // show game screen
  }
}

export const levelSelect = new LevelSelect();
