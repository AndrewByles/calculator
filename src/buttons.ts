import {Button, buttonValues} from "./button-types.ts";
import {button} from "./elements.ts";

export class Buttons {
    #buttonValues: Button[] = buttonValues;
    #buttons: HTMLElement;
    numberButtons: HTMLCollectionOf<Element>;

    equalsButton: HTMLElement;
    addButton: HTMLElement;
    subtractButton: HTMLElement;
    divideButton: HTMLElement;
    multiplyButton: HTMLElement;

    negateButton: HTMLElement;
    percentageButton: HTMLElement;
    squareRootButton: HTMLElement;
    squareButton: HTMLElement;

    clearAllButton: HTMLElement;
    clearButton: HTMLElement;

    memoryAddremoveButton: HTMLElement;
    memoryRecallButton: HTMLElement;

    constructor() {
        this.#buttons = document.getElementById('buttons')!;
        this.#buttons.innerHTML = this.#buttonValues.map((btn) => button(btn.value, btn.className, btn.id)).join('');
        this.numberButtons = document.getElementsByClassName('button--number');

        this.equalsButton = document.getElementById('equals')!;
        this.addButton = document.getElementById('add')!;
        this.subtractButton = document.getElementById('subtract')!;
        this.divideButton = document.getElementById('divide')!;
        this.multiplyButton = document.getElementById('multiply')!;

        this.negateButton = document.getElementById('negate')!;
        this.percentageButton = document.getElementById('percentage')!;
        this.squareRootButton = document.getElementById('square-root')!;
        this.squareButton = document.getElementById('square')!;

        this.clearAllButton = document.getElementById('clear-all')!;
        this.clearButton = document.getElementById('clear')!;

        this.memoryAddremoveButton = document.getElementById('memory-add-remove')!;
        this.memoryRecallButton = document.getElementById('memory-recall')!;
    }
}