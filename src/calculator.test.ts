import { describe, it, expect, beforeEach } from 'vitest';
import Calculator from './calculator';
import { actionTypes } from './button-types';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="calculator">
              <div id="buttons"></div>
            </div>
        `;

        calculator = new Calculator();
    });

    it('should initialize with default values', () => {
        expect(calculator.displayValue).toBe(0);
        expect(calculator.subTotalValue).toBe(0);
        expect(calculator.actionType).toBe(actionTypes.UNKNOWN);
    });

    it('should update display when number button is clicked', async () => {
        calculator.buttons.numberButtons[0].dispatchEvent(new MouseEvent('click'));
        expect(calculator.displayValue).toBe(7);
    });

    it('should perform addition correctly', () => {
        calculator.subTotalValue = 5;
        calculator.buttons.addButton.click();
        calculator.displayValue = 3;
        calculator.buttons.equalsButton.click();
        expect(calculator.displayValue).toBe(8);
    });

    it('should perform subtraction correctly', () => {
        calculator.subTotalValue = 5;
        calculator.buttons.subtractButton.click();
        calculator.displayValue = 3;
        calculator.buttons.equalsButton.click();
        expect(calculator.displayValue).toBe(2);
    });

    it('should perform division correctly', () => {
        calculator.subTotalValue = 6;
        calculator.buttons.divideButton.click();
        calculator.displayValue = 3;
        calculator.buttons.equalsButton.click();
        expect(calculator.displayValue).toBe(2);
    });

    it('should perform multiplication correctly', () => {
        calculator.subTotalValue = 5;
        calculator.buttons.multiplyButton.click();
        calculator.displayValue = 3;
        calculator.buttons.equalsButton.click();
        expect(calculator.displayValue).toBe(15);
    });

    it('should negate the number correctly', () => {
        calculator.displayValue = 5;
        calculator.buttons.negateButton.click();
        expect(calculator.displayValue).toBe(-5);
    })

    it('should calculate percentage correctly', () => {
        calculator.displayValue = 5;
        calculator.buttons.percentageButton.click();
        expect(calculator.displayValue).toBe(0.05);
    })

    it('should calculate square root correctly', () => {
        calculator.displayValue = 25;
        calculator.buttons.squareRootButton.click();
        expect(calculator.displayValue).toBe(5);
    })

    it('should calculate square correctly', () => {
        calculator.displayValue = 5;
        calculator.buttons.squareButton.click();
        expect(calculator.displayValue).toBe(25);
    })

    it('should correctly show sub-total after operator click', () => {
        calculator.displayValue = 5;
        calculator.buttons.addButton.click();
        expect(calculator.subTotalValue).toBe(5);
    });

    it('should correctly show operator symbol after click', () => {
        calculator.subTotalValue = 5;
        calculator.buttons.addButton.click();
        expect(calculator.display.getOperationSymbol()).toBe('+');
    });

    it('should clear display and reset values when clear button is clicked', () => {
        calculator.displayValue = 5;
        calculator.buttons.clearButton.click();
        expect(calculator.displayValue).toBe(0);
        expect(calculator.subTotalValue).toBe(0);
        expect(calculator.actionType).toBe(actionTypes.UNKNOWN);
    });

    it('should clear all and reset values when clear all button is clicked', () => {
        calculator.subTotalValue = 10;
        calculator.displayValue = 5;
        calculator.memoryValue = 1;
        calculator.buttons.addButton.click();
        calculator.actionType = actionTypes.ADD;
        calculator.buttons.clearAllButton.click();
        expect(calculator.displayValue).toBe(0);
        expect(calculator.subTotalValue).toBe(0);
        expect(calculator.memoryValue).toBe(0);
        expect(calculator.display.getOperationSymbol()).toBe('');
        expect(calculator.actionType).toBe(actionTypes.UNKNOWN);
    });

    it('should handle memory add/remove correctly', () => {
        calculator.displayValue = 5;
        calculator.buttons.memoryAddremoveButton.click();
        expect(calculator.memoryValue).toBe(5);
        calculator.buttons.memoryAddremoveButton.click();
        expect(calculator.memoryValue).toBe(0);
    });

    it('should recall memory correctly', () => {
        calculator.memoryValue = 5;
        calculator.buttons.memoryRecallButton.click();
        expect(calculator.displayValue).toBe(5);
    });
});