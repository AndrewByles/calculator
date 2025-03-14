import { actionTypes } from './button-types.ts';

export const add = (a: number, b: number): number => {
    return a + b;
}

export const subtract = (a: number, b: number): number => {
    return a - b;
}

export const divide = (a: number, b: number): number => {
    return a / b;
}

export const multiply = (a: number, b: number): number => {
    return a * b;
}

export const doMath = (actionType: actionTypes, totalValue: number, currentValue: number): number => {
    switch (actionType) {
        case actionTypes.ADD:
            return add(totalValue, currentValue);
        case actionTypes.SUBTRACT:
            return subtract(totalValue, currentValue);
        case actionTypes.DIVIDE:
            return divide(totalValue, currentValue);
        case actionTypes.MULTIPLY:
            return multiply(totalValue, currentValue);
        default:
            return 0;
    }
}