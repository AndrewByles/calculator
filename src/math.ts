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

export const negate = (a: number): number => {
    return a * -1;
}

export const percentage = (a: number): number => {
    return a / 100;
}

export const squareRoot = (a: number): number => {
    return Math.sqrt(a);
}

export const square = (a: number): number => {
    return a * a;
}

export const isNanOrInfinity = (value: number): boolean => {
    return isNaN(value) || !isFinite(value);
}

export const doMath = (actionType: actionTypes, a: number, b: number = 0): number => {
    switch (actionType) {
        case actionTypes.ADD:
            return add(a, b);
        case actionTypes.SUBTRACT:
            return subtract(a, b);
        case actionTypes.DIVIDE:
            return divide(a, b);
        case actionTypes.MULTIPLY:
            return multiply(a, b);
        case actionTypes.NEGATE:
            return negate(a);
        case actionTypes.PERCENTAGE:
            return percentage(a);
        case actionTypes.SQUARE_ROOT:
            return squareRoot(a);
        case actionTypes.SQUARE:
            return square(a);
        default:
            return 0;
    }
}