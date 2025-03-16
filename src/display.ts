import { isTooWideDisplayValue, scaleElementFontSizeAndLineHeight } from './utils.ts';
import { display, subDisplay } from './elements.ts';

export class Display {
    #fontSize = 3;
    #displayContainer: HTMLElement;
    #display: HTMLElement;
    #subTotalDisplay: HTMLElement;
    #operationSymbol: HTMLElement;
    #memoryDisplay: HTMLElement;

    constructor() {
        this.#displayContainer = document.getElementById('display')!;
        this.#displayContainer.innerHTML = subDisplay + display;

        this.#display = document.getElementById('display-value')!;
        this.#memoryDisplay = document.getElementById('memory')!;
        this.#subTotalDisplay = document.getElementById('sub-total')!;
        this.#operationSymbol = document.getElementById('operation-symbol')!;

        this.#display.innerHTML = '0';
    }

    getDisplayValue() {
        return this.#display.innerHTML;
    }

    updateDisplay(value: string) {
        this.#display.innerHTML = value;
        this.#setFontSizeScale();
    }

    getDisplayOffsetWidth() {
        return this.#display.offsetWidth;
    }

    updateSubTotalDisplay(value: string) {
        this.#subTotalDisplay.innerHTML = value;
    }

    updateOperationSymbol(value: string) {
        this.#operationSymbol.innerHTML = value;
    }

    getOperationSymbol() {
        return this.#operationSymbol.innerHTML;
    }

    updateMemoryDisplay(value: string) {
        this.#memoryDisplay.innerHTML = value.length ? 'M ' + value : value;
    }

    #setFontSizeScale() {
        if (isTooWideDisplayValue(this.getDisplayOffsetWidth(), this.#displayContainer.offsetWidth)) {
            this.#fontSize = (this.#displayContainer.offsetWidth / (this.getDisplayOffsetWidth() + 40)) * this.#fontSize;
            scaleElementFontSizeAndLineHeight(this.#display, this.#fontSize);
        }
    }

    resetFontSize() {
        this.#fontSize = 3;
        scaleElementFontSizeAndLineHeight(this.#display, this.#fontSize);
        this.#setFontSizeScale();
    }
}

