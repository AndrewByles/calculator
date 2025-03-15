import {button, buttonsContainer, calculatorContainer, display, displayContainer, subDisplay} from './elements.ts';
import {actionTypes, Button, ButtonAndAction, buttonValues} from './button-types.ts';
import {doMath, isNanOrInfinity} from './math.ts';
import {
    actionButtonKeyCodes, getActionTypeFromKeyCode,
    getOperationSymbol,
    isTooWideDisplayValue,
    numberButtonKeyCodes,
    scaleElementFontSizeAndLineHeight
} from './utils.ts';

import './styles/calculator.css'

export default class Calculator {
    #fontSize = 3;
    #buttonValues: Button[] = buttonValues;
    #calculator: HTMLElement;
    #buttons: HTMLElement;
    numberButtons: HTMLCollectionOf<Element>;
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

        this.numberButtons = document.getElementsByClassName('button--number');
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

        this.#initCalculatorEventHandling();
    }

    #buttonEvent(button: Element) {
        const isPreviousEquals = this.actionType === actionTypes.EQUALS;
        const isSecondaryAction =
            this.actionType === actionTypes.PERCENTAGE ||
            this.actionType === actionTypes.SQUARE_ROOT ||
            this.actionType === actionTypes.SQUARE;
        const isDecimal = button.innerHTML === '.';
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
            this.#updateDisplay(button.innerHTML);
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
                ? button.innerHTML
                : this.display.innerHTML + button.innerHTML
        );

        this.#setFontSizeScale();
    }

    #actionButtonEvent (actionType: actionTypes) {
        this.#handelSubTotalAndDisplay(actionType);
        this.#resetFontSize();
    }

    #secondaryActionButtonEvent(actionType: actionTypes) {
        const result = doMath(actionType, parseFloat(this.display.innerHTML));
        this.#updateDisplay(isNanOrInfinity(result) ? 'error' : result.toString());
        this.#resetFontSize();

        if (actionType !== actionTypes.NEGATE) {
            this.actionType = actionType;
        }
    }

    #equalsButtonEvent() {
        if (this.totalValue !== 0) {
            const result = doMath(this.actionType, this.totalValue, parseFloat(this.display.innerHTML));
            this.#updateDisplay(isNanOrInfinity(result) ? 'error' : result.toString());
        }
        this.actionType = actionTypes.EQUALS;
        this.subTotalDisplay.innerHTML = '';
        this.operationSymbol.innerHTML = '';
        this.totalValue = 0;
        this.#resetFontSize();
    }

    #clearButtonEvent(isClearAll: boolean) {
        this.#updateDisplay('0');
        this.#resetFontSize();

        if(isClearAll){
            this.subTotalDisplay.innerHTML = '';
            this.operationSymbol.innerHTML = '';
            this.memoryDisplay.innerHTML = '';
            this.totalValue = 0;
            this.actionType = actionTypes.UNKNOWN;
        }
    }

    #memoryAddremoveButtonEvent() {
        if (this.memoryDisplay.innerHTML === '' || this.display.innerHTML !== '0') {
            this.memoryDisplay.innerHTML = `M ${parseFloat(this.display.innerHTML)}`;
            this.#updateDisplay('0');
            this.#resetFontSize();
            return;
        }

        this.memoryDisplay.innerHTML = '';
    }

    #memoryRecallButtonEvent() {
        if (this.memoryDisplay.innerHTML === '') {
            return;
        }

        const memoryValue = this.memoryDisplay.innerHTML.split(' ')[1];
        this.#updateDisplay(memoryValue);
        this.#setFontSizeScale();
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
        }
    }

    #resetFontSize() {
        this.#fontSize = 3;
        scaleElementFontSizeAndLineHeight(this.display, this.#fontSize);
        this.#setFontSizeScale();
    }

    #initCalculatorEventHandling() {
        Array.from(this.numberButtons).forEach((btn: Element) => {
            btn.addEventListener('click', () => {
                this.#buttonEvent(btn);
            });
        });

        const actionButtonAndAction: ButtonAndAction[] = [{
            button: this.addButton,
            action: actionTypes.ADD,
        }, {
            button: this.subtractButton,
            action: actionTypes.SUBTRACT,
        }, {
            button: this.divideButton,
            action: actionTypes.DIVIDE,
        }, {
            button: this.multiplyButton,
            action: actionTypes.MULTIPLY,
        }];

        actionButtonAndAction.forEach(({ button, action }) => {
            button.addEventListener('click', () => {
                this.#actionButtonEvent(action);
            });
        });

        const secondaryActionButtonsAndActions: ButtonAndAction[] = [{
            button: this.negateButton,
            action: actionTypes.NEGATE,
        }, {
            button: this.percentageButton,
            action: actionTypes.PERCENTAGE,
        }, {
            button: this.squareRootButton,
            action: actionTypes.SQUARE_ROOT,
        }, {
            button: this.squareButton,
            action: actionTypes.SQUARE,
        }]

        secondaryActionButtonsAndActions.forEach(({ button, action }) => {
            button.addEventListener('click', () => {
                this.#secondaryActionButtonEvent(action);
            });
        });

        this.equalsButton.addEventListener('click', () => {
            this.#equalsButtonEvent();
        });


        [this.clearAllButton, this.clearButton].forEach((button, index) => {
            button.addEventListener('click', () => {
                this.#clearButtonEvent(index === 0);
            });
        });

        this.memoryAddremoveButton.addEventListener('click', () => {
            this.#memoryAddremoveButtonEvent();
        });

        this.memoryRecallButton.addEventListener('click', () => {
            this.#memoryRecallButtonEvent();
        });

        window.addEventListener('keydown', (e) => {
            console.log(e.key, e.code);

            if (numberButtonKeyCodes.includes(e.code)) {
                const btn =
                    Array.from(this.numberButtons).find((b) => b.innerHTML === e.key);
                if (btn) {
                    this.#buttonEvent(btn);
                }
            }

            if (actionButtonKeyCodes.includes(e.code)) {
                this.#actionButtonEvent(getActionTypeFromKeyCode(e.code));
            }

            if (e.code === 'Enter' || e.code == 'NumpadEnter') {
                this.#equalsButtonEvent();
            }

            if (e.code === 'Backspace') {
                this.#clearButtonEvent(false);
            }

            if (e.code === 'Escape') {
                this.#clearButtonEvent(true);
            }
        });
    }
}

new Calculator();
