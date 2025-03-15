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
        expect(calculator.display.innerHTML).toBe('0');
        expect(calculator.totalValue).toBe(0);
        expect(calculator.actionType).toBe(actionTypes.UNKNOWN);
    });

    it('should update display when number button is clicked', async () => {
        calculator.numberButtons[0].dispatchEvent(new MouseEvent('click'));
        expect(calculator.display.innerHTML).toBe('7');
    });

    it('should perform addition correctly', () => {
        calculator.totalValue = 5;
        calculator.addButton.click();
        calculator.display.innerHTML = '3';
        calculator.equalsButton.click();
        expect(calculator.display.innerHTML).toBe('8');
    });

    it('should perform subtraction correctly', () => {
        calculator.totalValue = 5;
        calculator.subtractButton.click();
        calculator.display.innerHTML = '3';
        calculator.equalsButton.click();
        expect(calculator.display.innerHTML).toBe('2');
    });

    it('should perform division correctly', () => {
        calculator.totalValue = 6;
        calculator.divideButton.click();
        calculator.display.innerHTML = '3';
        calculator.equalsButton.click();
        expect(calculator.display.innerHTML).toBe('2');
    });

    it('should perform multiplication correctly', () => {
        calculator.totalValue = 5;
        calculator.multiplyButton.click();
        calculator.display.innerHTML = '3';
        calculator.equalsButton.click();
        expect(calculator.display.innerHTML).toBe('15');
    });

    it('should negate the number correctly', () => {
        calculator.display.innerHTML = '5';
        calculator.negateButton.click();
        expect(calculator.display.innerHTML).toBe('-5');
    })

    it('should calculate percentage correctly', () => {
        calculator.display.innerHTML = '5';
        calculator.percentageButton.click();
        expect(calculator.display.innerHTML).toBe('0.05');
    })

    it('should calculate square root correctly', () => {
        calculator.display.innerHTML = '25';
        calculator.squareRootButton.click();
        expect(calculator.display.innerHTML).toBe('5');
    })

    it('should calculate square correctly', () => {
        calculator.display.innerHTML = '5';
        calculator.squareButton.click();
        expect(calculator.display.innerHTML).toBe('25');
    })

    it('should correctly show sub-total after operator click', () => {
        calculator.display.innerHTML = '5';
        calculator.addButton.click();
        expect(calculator.subTotalDisplay.innerHTML).toBe('5');
    });

    it('should correctly show operator symbol after click', () => {
        calculator.totalValue = 5;
        calculator.addButton.click();
        expect(calculator.operationSymbol.innerHTML).toBe('+');
    });

    it('should clear display and reset values when clear button is clicked', () => {
        calculator.display.innerHTML = '5';
        calculator.clearButton.click();
        expect(calculator.display.innerHTML).toBe('0');
        expect(calculator.totalValue).toBe(0);
        expect(calculator.actionType).toBe(actionTypes.UNKNOWN);
    });

    it('should clear all and reset values when clear all button is clicked', () => {
        calculator.totalValue = 10;
        calculator.display.innerHTML = '5';
        calculator.memoryDisplay.innerHTML = 'M 5';
        calculator.operationSymbol.innerHTML = '+';
        calculator.actionType = actionTypes.ADD;
        calculator.clearAllButton.click();
        expect(calculator.display.innerHTML).toBe('0');
        expect(calculator.totalValue).toBe(0);
        expect(calculator.memoryDisplay.innerHTML).toBe('');
        expect(calculator.operationSymbol.innerHTML).toBe('');
        expect(calculator.actionType).toBe(actionTypes.UNKNOWN);
    });

    it('should handle memory add/remove correctly', () => {
        calculator.display.innerHTML = '5';
        calculator.memoryAddremoveButton.click();
        expect(calculator.memoryDisplay.innerHTML).toBe('M 5');
        calculator.memoryAddremoveButton.click();
        expect(calculator.memoryDisplay.innerHTML).toBe('');
    });

    it('should recall memory correctly', () => {
        calculator.memoryDisplay.innerHTML = 'M 5';
        calculator.memoryRecallButton.click();
        expect(calculator.display.innerHTML).toBe('5');
    });
});