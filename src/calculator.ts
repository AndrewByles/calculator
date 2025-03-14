import { button, display } from './elements.ts';
import { actionTypes, Button, buttonValues } from './button-types.ts';
import { add, subtract, divide, multiply } from './math.ts';

import './styles/calculator.css'

class Calculator {
    #buttonValues: Button[] = buttonValues;
    #calculator: HTMLDivElement = document.querySelector<HTMLDivElement>('#calculator')!;
    #buttons: HTMLDivElement = document.querySelector<HTMLDivElement>('#buttons')!;

    #numberButtons: HTMLCollectionOf<Element>;
    #display: HTMLElement;

    #equalsButton: HTMLElement;
    #addButton: HTMLElement;
    #subtractButton: HTMLElement;
    #divideButton: HTMLElement;
    #multiplyButton: HTMLElement;

    #actionType: actionTypes = actionTypes.UNKNOWN;
    #totalValue: number = 0;

    constructor() {
        this.#buttonValues.forEach((btn) => {
            this.#buttons.innerHTML = this.#buttons.innerHTML + button(btn.value, btn.className, btn.id);
        });

        this.#calculator.innerHTML = display + this.#buttons.outerHTML;

        this.#numberButtons = document.getElementsByClassName('button--number');
        this.#display = document.getElementById('display')!;
        this.#display.innerHTML = '0';

        this.#equalsButton = document.getElementById('equals')!;
        this.#addButton = document.getElementById('add')!;
        this.#subtractButton = document.getElementById('subtract')!;
        this.#divideButton = document.getElementById('divide')!;
        this.#multiplyButton = document.getElementById('multiply')!;

        this.#setupNumberButtons();
        this.#setupAddButton();
        this.#setupSubtractButton();
        this.#setupDivideButton();
        this.#setupMultiplyButton();
        this.#setupEqualsButton();
    }

    #setupNumberButtons() {
        Array.from(this.#numberButtons).forEach((btn: Element) => {
            btn.addEventListener('click', () => {
                if (btn.innerHTML === '.' && this.#display.innerHTML.includes('.')) {
                    return;
                }

                this.#display.innerHTML =
                    this.#display.innerHTML === '0' ? btn.innerHTML : this.#display.innerHTML + btn.innerHTML;
            });
        });
    }

    #setupAddButton() {
        this.#addButton.addEventListener('click', () => {
            this.#handelSubTotalAndDisplay(actionTypes.ADD);
        });
    }

    #setupSubtractButton() {
        this.#subtractButton.addEventListener('click', () => {
            this.#handelSubTotalAndDisplay(actionTypes.SUBTRACT);
        });
    }

    #setupDivideButton() {
        this.#divideButton.addEventListener('click', () => {
            this.#handelSubTotalAndDisplay(actionTypes.DIVIDE);
        })
    }

    #setupMultiplyButton() {
        this.#multiplyButton.addEventListener('click', () => {
            this.#handelSubTotalAndDisplay(actionTypes.MULTIPLY);
        })
    }

    #handelSubTotalAndDisplay(actionType: actionTypes) {
        if (this.#totalValue) {
            this.#totalValue = this.#doMath();
        } else {
            this.#totalValue = parseFloat(this.#display.innerHTML);
        }

        this.#actionType = actionType;
        this.#display.innerHTML = '0';
    }

    #doMath(): number {
        console.log(this.#actionType, this.#totalValue, parseFloat(this.#display.innerHTML));
        switch (this.#actionType) {
            case actionTypes.ADD:
                return add(this.#totalValue, parseFloat(this.#display.innerHTML));
            case actionTypes.SUBTRACT:
                return subtract(this.#totalValue, parseFloat(this.#display.innerHTML));
            case actionTypes.DIVIDE:
                return  divide(this.#totalValue, parseFloat(this.#display.innerHTML));
            case actionTypes.MULTIPLY:
                return multiply(this.#totalValue, parseFloat(this.#display.innerHTML));
            case actionTypes.UNKNOWN:
            default:
                return 0;
        }
    }

    #setupEqualsButton() {
        this.#equalsButton.addEventListener('click', () => {
            this.#display.innerHTML = this.#doMath().toString();
            this.#totalValue = 0;
        });
    }
}

new Calculator();