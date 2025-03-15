import {button, buttonsContainer, calculatorContainer, display, displayContainer, subDisplay} from './elements.ts';
import {actionTypes, Button, buttonValues} from './button-types.ts';
import {doMath, isNanOrInfinity} from './math.ts';
import {getOperationSymbol, isTooWideDisplayValue, scaleElementFontSizeAndLineHeight} from './utils.ts';

import './styles/calculator.css'

export default class Calculator {
    #fontSize = 3;
    #buttonValues: Button[] = buttonValues;
    #calculator: HTMLElement;
    #buttons: HTMLElement;
    #numberButtons: HTMLCollectionOf<Element>;
    #displayContainer: HTMLElement;

    display: HTMLElement;
    subTotalDisplay: HTMLElement;
    operationSymbol: HTMLElement;
    memoryDisplay: HTMLElement;

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

    actionType: actionTypes = actionTypes.UNKNOWN;
    totalValue: number = 0;

    constructor() {
        document.body.innerHTML = calculatorContainer;
        this.#calculator = document.getElementById('calculator')!;
        this.#calculator.innerHTML = displayContainer + buttonsContainer;
        this.#displayContainer = document.getElementById('display')!;

        this.#buttons = document.getElementById('buttons')!;
        this.#displayContainer.innerHTML = subDisplay + display;

        this.#buttons.innerHTML = this.#buttonValues.map((btn) => button(btn.value, btn.className, btn.id)).join('');

        this.#numberButtons = document.getElementsByClassName('button--number');
        this.memoryDisplay = document.getElementById('memory')!;
        this.subTotalDisplay = document.getElementById('sub-total')!;
        this.operationSymbol = document.getElementById('operation-symbol')!;
        this.display = document.getElementById('display-value')!;
        this.display.innerHTML = '0';

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

        this.#setupButtons();
    }

    #setupButtons() {
        this.#setupNumberButtons();
        this.#setupActionButtons();
        this.#setupSecondaryActionButtons();
        this.#setupEqualsButton();
        this.#setupClearButtons();
        this.#setupMemoryButtons();
    }

    #setupNumberButtons() {
        Array.from(this.#numberButtons).forEach((btn: Element) => {
            btn.addEventListener('click', () => {
                const isPreviousEquals = this.actionType === actionTypes.EQUALS;
                // this.actionType === actionTypes.NEGATE ||
                const isSecondaryAction =
                    this.actionType === actionTypes.PERCENTAGE ||
                    this.actionType === actionTypes.SQUARE_ROOT ||
                    this.actionType === actionTypes.SQUARE;
                const isDecimal = btn.innerHTML === '.';
                const isAlreadyDecimal = this.display.innerHTML.includes('.');
                const isZero = this.display.innerHTML === '0';

                if (this.display.innerHTML.length >= 15) {
                    return;
                }

                if (isPreviousEquals && isDecimal) {
                    this.#updateDisplay('0.');
                    this.actionType = actionTypes.UNKNOWN;
                    return;
                }

                if (isPreviousEquals || isSecondaryAction) {
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

                this.#setFontSizeScale();
            });
        });
    }

    #setupActionButtons() {
        [this.addButton, this.subtractButton, this.divideButton, this.multiplyButton].forEach((button, index) => {
            button.addEventListener('click', () => {
                this.#handelSubTotalAndDisplay(Object.values(actionTypes)[index]);
                this.#resetFontSize();
            });
        });
    }

    #setupSecondaryActionButtons() {
        [this.negateButton, this.percentageButton, this.squareRootButton, this.squareButton].forEach((button, index) => {
            button.addEventListener('click', () => {
                const actionType = Object.values(actionTypes)[index + 5];
                const result = doMath(actionType, parseFloat(this.display.innerHTML));
                this.#updateDisplay(isNanOrInfinity(result) ? 'error' : result.toString());
                this.#resetFontSize();

                if (actionType !== actionTypes.NEGATE) {
                    this.actionType = actionType;
                }
            });
        });
    }

    #setupEqualsButton() {
        this.equalsButton.addEventListener('click', () => {
            if (this.totalValue !== 0) {
                const result = doMath(this.actionType, this.totalValue, parseFloat(this.display.innerHTML));
                this.#updateDisplay(isNanOrInfinity(result) ? 'error' : result.toString());
            }
            this.actionType = actionTypes.EQUALS;
            this.subTotalDisplay.innerHTML = '';
            this.operationSymbol.innerHTML = '';
            this.totalValue = 0;
            this.#resetFontSize();
        });
    }

    #setupClearButtons() {
        [this.clearAllButton, this.clearButton].forEach((button, index) => {
            button.addEventListener('click', () => {
                this.#updateDisplay('0');
                this.#resetFontSize();
                if (index === 0) {
                    this.actionType = actionTypes.UNKNOWN;
                    this.subTotalDisplay.innerHTML = '';
                    this.operationSymbol.innerHTML = '';
                    this.memoryDisplay.innerHTML = '';
                    this.totalValue = 0;
                }
            });
        });
    }

    #setupMemoryButtons() {
        this.memoryAddremoveButton.addEventListener('click', () => {
            if (this.memoryDisplay.innerHTML === '' || this.display.innerHTML !== '0') {
                this.memoryDisplay.innerHTML = `M ${parseFloat(this.display.innerHTML)}`;
                this.#updateDisplay('0');
                this.#resetFontSize();
                return;
            }

            this.memoryDisplay.innerHTML = '';
        });

        this.memoryRecallButton.addEventListener('click', () => {
            if (this.memoryDisplay.innerHTML === '') {
                return;
            }

            const memoryValue = this.memoryDisplay.innerHTML.split(' ')[1];
            this.#updateDisplay(memoryValue);
            this.#setFontSizeScale();
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

    #setFontSizeScale() {
        if (isTooWideDisplayValue(this.display.offsetWidth, this.#displayContainer.offsetWidth)) {
            this.#fontSize = (this.#displayContainer.offsetWidth / (this.display.offsetWidth + 40)) * this.#fontSize;
            scaleElementFontSizeAndLineHeight(this.display, this.#fontSize);
            return;
        }
    }

    #resetFontSize() {
        this.#fontSize = 3;
        scaleElementFontSizeAndLineHeight(this.display, this.#fontSize);
        this.#setFontSizeScale();
    }
}

new Calculator();