import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";

const LOADER_ELEMENT_ID = "js-loading-screen";
const LOAD_CURRENT_ELEMENT_ID = "js-loading-screen-current";
const LOAD_TOTAL_ELEMENT_ID = "js-loading-screen-total";

export const DATALOADED_EVENT_NAME = "dataloaded";

class Loader extends Common {
  constructor() {
    super(LOADER_ELEMENT_ID);
    this.bindToElements();
    this.clearFlags();
  }

  bindToElements() {
    this.currentElement = this.bindToElement(LOAD_CURRENT_ELEMENT_ID);
    this.totalElement = this.bindToElement(LOAD_TOTAL_ELEMENT_ID);
  }

  loadImage(imageUrl) {
    this.changeVisibilityScreen(this.element, VISIBLE_SCREEN);
    this.isAllLoaded = false;
    this.totalCounter++;
    this.totalElement = this.totalCounter;
    const image = new Image();

    image.src = imageUrl;
    image.addEventListener('load', e => this.itemLoaded(e), false);

    return image;
  }

  itemLoaded(e) {
    e.target.removeEventListener(e.type, this.itemLoaded, false);
    this.loadedCounter++;
    this.currentElement.textContent = this.loadedCounter;

    if (this.loadedCounter === this.totalCounter) {
      this.clearFlags();
      this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
      window.dispatchEvent(new CustomEvent(DATALOADED_EVENT_NAME));
    }
  }

  clearFlags() {
    this.loadedCounter = 0;
    this.totalCounter = 0;
    this.isAllLoaded = true;
  }

}

export const loader = new Loader();