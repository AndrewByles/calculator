import {buttonsContainer, calculatorContainer, displayContainer} from './elements.ts';
import {actionTypes, ButtonAndAction} from './button-types.ts';
import {doMath, isNanOrInfinity} from './math.ts';
import {
    actionButtonKeyCodes, getActionTypeFromKeyCode,
    getOperationSymbol,
    numberButtonKeyCodes,
} from './utils.ts';

import './styles/calculator.css'
import {Display} from "./display.ts";
import {Buttons} from "./buttons.ts";

export default class Calculator {
    #calculator: HTMLElement;
    display: Display;
    buttons: Buttons;

    actionType: actionTypes = actionTypes.UNKNOWN;
    subTotalValue: number = 0;
    displayValue: number = 0;
    memoryValue: number = 0;

    constructor() {
        document.body.innerHTML = calculatorContainer;
        this.#calculator = document.getElementById('calculator')!;
        this.#calculator.innerHTML = displayContainer + buttonsContainer;

        this.display = new Display();
        this.buttons = new Buttons();

        this.#initCalculatorEventHandling();
    }

    #buttonEvent(button: Element) {
        const isPreviousEquals = this.actionType === actionTypes.EQUALS;
        const isSecondaryAction =
            this.actionType === actionTypes.PERCENTAGE ||
            this.actionType === actionTypes.SQUARE_ROOT ||
            this.actionType === actionTypes.SQUARE;
        const isDecimal = button.innerHTML === '.';
        const isAlreadyDecimal = this.display.getDisplayValue().includes('.');
        const isZero = this.display.getDisplayValue() === '0';

        if (this.display.getDisplayValue().length >= 15 || (!isPreviousEquals && isDecimal && isAlreadyDecimal)) {
            return;
        }

        if (isDecimal && (isPreviousEquals || isZero)) {
            if (isPreviousEquals) {
                this.actionType = actionTypes.UNKNOWN;
            }
            this.display.updateDisplay('0.');
            return;
        }

        if (isPreviousEquals || isSecondaryAction) {
            this.display.updateDisplay(button.innerHTML);
            this.displayValue = parseFloat(button.innerHTML);
            this.actionType = actionTypes.UNKNOWN;
            return;
        }

        if (this.displayValue === 0 || isNanOrInfinity(this.displayValue)) {
            this.displayValue = parseFloat(button.innerHTML);
            this.display.updateDisplay(button.innerHTML);
            return;
        }

        this.displayValue = parseFloat(this.display.getDisplayValue() + button.innerHTML);
        this.display.updateDisplay(this.display.getDisplayValue() + button.innerHTML);
    }

    #actionButtonEvent (actionType: actionTypes) {
        if (this.subTotalValue !== 0 && this.displayValue !== 0) {
            this.subTotalValue = doMath(this.actionType, this.subTotalValue, this.displayValue);
        } else if (this.subTotalValue === 0 && this.displayValue !== 0) {
            this.subTotalValue = this.displayValue;
        }

        this.actionType = actionType;
        this.display.updateSubTotalDisplay(this.subTotalValue.toString());
        this.display.updateOperationSymbol(getOperationSymbol(this.actionType));
        this.display.resetFontSize();
        this.display.updateDisplay('0');
        this.displayValue = 0;
    }

    #secondaryActionButtonEvent(actionType: actionTypes) {
        const result = doMath(actionType, this.displayValue);
        this.display.updateDisplay(isNanOrInfinity(result) ? 'error' : result.toString());
        this.displayValue = result;
        console.log(this.displayValue);
        this.display.resetFontSize();

        if (actionType !== actionTypes.NEGATE) {
            this.actionType = actionType;
        }
    }

    #equalsButtonEvent() {
        if (this.subTotalValue) {
            const result = doMath(this.actionType, this.subTotalValue, this.displayValue);
            this.display.updateDisplay(isNanOrInfinity(result) ? 'error' : result.toString());
            this.displayValue = result;
        }
        this.actionType = actionTypes.EQUALS;
        this.display.updateSubTotalDisplay('');
        this.display.updateOperationSymbol('');
        this.subTotalValue = 0;
        this.display.resetFontSize();
    }

    #clearButtonEvent(isClearAll: boolean) {
        this.display.updateDisplay('0');
        this.displayValue = 0;
        this.display.resetFontSize();

        if(isClearAll){
            this.display.updateSubTotalDisplay('');
            this.display.updateOperationSymbol('');
            this.display.updateMemoryDisplay('');
            this.subTotalValue = 0;
            this.memoryValue = 0;
            this.actionType = actionTypes.UNKNOWN;
        }
    }

    #memoryAddRemoveButtonEvent() {
        if (this.memoryValue === 0 || this.displayValue !== 0) {
            console.log('here');
            this.display.updateMemoryDisplay(this.displayValue.toString());
            this.display.updateDisplay('0');
            this.memoryValue = this.displayValue;
            this.displayValue = 0;
            this.display.resetFontSize();
            return;
        }

        this.display.updateMemoryDisplay('');
        this.display.updateMemoryDisplay('')
        this.memoryValue = 0
    }

    #memoryRecallButtonEvent() {
        if (this.memoryValue === 0) {
            return;
        }

        this.displayValue = this.memoryValue;
        this.display.updateDisplay(this.memoryValue.toString());
    }

    #initCalculatorEventHandling() {
        Array.from(this.buttons.numberButtons).forEach((btn: Element) => {
            btn.addEventListener('click', () => {
                this.#buttonEvent(btn);
            });
        });

        const actionButtonAndAction: ButtonAndAction[] = [{
            button: this.buttons.addButton,
            action: actionTypes.ADD,
        }, {
            button: this.buttons.subtractButton,
            action: actionTypes.SUBTRACT,
        }, {
            button: this.buttons.divideButton,
            action: actionTypes.DIVIDE,
        }, {
            button: this.buttons.multiplyButton,
            action: actionTypes.MULTIPLY,
        }];

        actionButtonAndAction.forEach(({ button, action }) => {
            button.addEventListener('click', () => {
                this.#actionButtonEvent(action);
            });
        });

        const secondaryActionButtonsAndActions: ButtonAndAction[] = [{
            button: this.buttons.negateButton,
            action: actionTypes.NEGATE,
        }, {
            button: this.buttons.percentageButton,
            action: actionTypes.PERCENTAGE,
        }, {
            button: this.buttons.squareRootButton,
            action: actionTypes.SQUARE_ROOT,
        }, {
            button: this.buttons.squareButton,
            action: actionTypes.SQUARE,
        }]

        secondaryActionButtonsAndActions.forEach(({ button, action }) => {
            button.addEventListener('click', () => {
                this.#secondaryActionButtonEvent(action);
            });
        });

        this.buttons.equalsButton.addEventListener('click', () => {
            this.#equalsButtonEvent();
        });


        [this.buttons.clearAllButton, this.buttons.clearButton].forEach((button, index) => {
            button.addEventListener('click', () => {
                this.#clearButtonEvent(index === 0);
            });
        });

        this.buttons.memoryAddremoveButton.addEventListener('click', () => {
            this.#memoryAddRemoveButtonEvent();
        });

        this.buttons.memoryRecallButton.addEventListener('click', () => {
            this.#memoryRecallButtonEvent();
        });

        window.addEventListener('keydown', (e) => {
            if (numberButtonKeyCodes.includes(e.code)) {
                const btn =
                    Array.from(this.buttons.numberButtons).find((b) => b.innerHTML === e.key);
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
