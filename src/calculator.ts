import {calculatorContainer, buttonsContainer, button, display, subDisplay} from './elements.ts';
import {actionTypes, Button, buttonValues} from './button-types.ts';
import {doMath} from './math.ts';
import {getOperationSymbol} from './utils.ts';

import './styles/calculator.css'

export default class Calculator {
    #buttonValues: Button[] = buttonValues;
    #calculator: HTMLElement;
    #buttons: HTMLElement;
    #numberButtons: HTMLCollectionOf<Element>;

    display: HTMLElement;
    subTotalDisplay: HTMLElement;
    operationSymbol: HTMLElement;
    memoryDisplay: HTMLElement;

    equalsButton: HTMLElement;
    addButton: HTMLElement;
    subtractButton: HTMLElement;
    divideButton: HTMLElement;
    multiplyButton: HTMLElement;

    clearAllButton: HTMLElement;
    clearButton: HTMLElement;

    memoryAddremoveButton: HTMLElement;
    memoryRecallButton: HTMLElement;

    actionType: actionTypes = actionTypes.UNKNOWN;
    totalValue: number = 0;
    constructor() {
        document.body.innerHTML = calculatorContainer;
        this.#calculator = document.getElementById('calculator')!;
        this.#calculator.innerHTML = subDisplay + display + buttonsContainer;
        this.#buttons = document.getElementById('buttons')!;

        this.#buttonValues.forEach((btn) => {
            this.#buttons.innerHTML += button(btn.value, btn.className, btn.id);
        });

        this.#buttons.innerHTML = this.#buttonValues.map((btn) => button(btn.value, btn.className, btn.id)).join('');

        this.#numberButtons = document.getElementsByClassName('button--number');
        this.memoryDisplay = document.getElementById('memory')!;
        this.subTotalDisplay = document.getElementById('sub-total')!;
        this.operationSymbol = document.getElementById('operation-symbol')!;
        this.display = document.getElementById('display')!;
        this.display.innerHTML = '0';

        this.equalsButton = document.getElementById('equals')!;
        this.addButton = document.getElementById('add')!;
        this.subtractButton = document.getElementById('subtract')!;
        this.divideButton = document.getElementById('divide')!;
        this.multiplyButton = document.getElementById('multiply')!;

        this.clearAllButton = document.getElementById('clear-all')!;
        this.clearButton = document.getElementById('clear')!;

        this.memoryAddremoveButton = document.getElementById('memory-add-remove')!;
        this.memoryRecallButton = document.getElementById('memory-recall')!;

        this.#setupButtons();
    }

    #setupButtons() {
        this.#setupNumberButtons();
        this.#setupActionButton(this.addButton, actionTypes.ADD);
        this.#setupActionButton(this.subtractButton, actionTypes.SUBTRACT);
        this.#setupActionButton(this.divideButton, actionTypes.DIVIDE);
        this.#setupActionButton(this.multiplyButton, actionTypes.MULTIPLY);
        this.#setupEqualsButton();
        this.#setupClearButton(this.clearAllButton, true);
        this.#setupClearButton(this.clearButton, false);
        this.#setupMemoryAddRemoveButton();
        this.#setupMemoryRecallButton();
    }

    #setupNumberButtons() {
        Array.from(this.#numberButtons).forEach((btn: Element) => {
            btn.addEventListener('click', () => {

                const isPreviousEquals = this.actionType === actionTypes.EQUALS;
                const isDecimal = btn.innerHTML === '.';
                const isAlreadyDecimal = this.display.innerHTML.includes('.');
                const isZero = this.display.innerHTML === '0';

                console.log(isPreviousEquals, isZero, isDecimal, isAlreadyDecimal)

                if (isPreviousEquals && isDecimal) {
                    this.#updateDisplay('0.');
                    this.actionType = actionTypes.UNKNOWN;
                    return;
                }

                if (isPreviousEquals) {
                    this.#updateDisplay(btn.innerHTML);
                    this.actionType = actionTypes.UNKNOWN;
                    return;
                }

                if (isZero && isDecimal) {
                    this.#updateDisplay('0.');
                    return;
                }

                if (isDecimal && isAlreadyDecimal) {
                    return;
                }

                this.#updateDisplay(
                    this.display.innerHTML === '0' || this.display.innerHTML === 'error'
                        ? btn.innerHTML
                        : this.display.innerHTML + btn.innerHTML
                );
            });
        });
    }

    #setupActionButton(button: HTMLElement, actionType: actionTypes) {
        button.addEventListener('click', () => {
            console.log(button.innerHTML);
            this.#handelSubTotalAndDisplay(actionType);
        });
    }

    #setupEqualsButton() {
        this.equalsButton.addEventListener('click', () => {
            console.log(this.totalValue, parseFloat(this.display.innerHTML))
            if (this.totalValue > 0) {
                console.log('here', this.actionType);
                const result = doMath(this.actionType, this.totalValue, parseFloat(this.display.innerHTML));
                this.#updateDisplay(result === Infinity ? 'error' : result.toString());
            }
            this.actionType = actionTypes.EQUALS;
            this.subTotalDisplay.innerHTML = '';
            this.operationSymbol.innerHTML = '';
            this.totalValue = 0;
        });
    }

    #setupClearButton(button: HTMLElement, clearAll: boolean) {
        button.addEventListener('click', () => {
            this.#updateDisplay('0');
            if (clearAll) {
                this.actionType = actionTypes.UNKNOWN;
                this.subTotalDisplay.innerHTML = '';
                this.operationSymbol.innerHTML = '';
                this.memoryDisplay.innerHTML = '';
                this.totalValue = 0;
            }
        });
    }

    #updateDisplay(value: string) {
        this.display.innerHTML = value;
    }

    #handelSubTotalAndDisplay(actionType: actionTypes) {
        if (this.totalValue && this.display.innerHTML !== '0') {
            this.totalValue = doMath(this.actionType, this.totalValue, parseFloat(this.display.innerHTML));
        } else if (!this.totalValue && this.display.innerHTML !== '0') {
            this.totalValue = parseFloat(this.display.innerHTML);
        }

        this.actionType = actionType;
        this.subTotalDisplay.innerHTML = this.totalValue.toString();
        this.operationSymbol.innerHTML = getOperationSymbol(this.actionType);
        this.#updateDisplay('0');
    }

    #setupMemoryAddRemoveButton() {
        this.memoryAddremoveButton.addEventListener('click', () => {
            if (this.memoryDisplay.innerHTML === '' || this.display.innerHTML !== '0') {
                this.memoryDisplay.innerHTML = `M ${this.display.innerHTML}`;
                this.#updateDisplay('0');
                return;
            }

            this.memoryDisplay.innerHTML = '';
        })
    }

    #setupMemoryRecallButton() {
        this.memoryRecallButton.addEventListener('click', () => {
            if (this.memoryDisplay.innerHTML === '') {
                return;
            }

            const memoryValue = this.memoryDisplay.innerHTML.split(' ')[1];
            this.#updateDisplay(memoryValue);
        })
    }
}

new Calculator();