import {actionTypes} from "./button-types.ts";

export const getOperationSymbol = (actionType: actionTypes): string => {
    switch (actionType) {
        case actionTypes.ADD:
            return '&#43;';
        case actionTypes.SUBTRACT:
            return '&#8722;';
        case actionTypes.DIVIDE:
            return '&#247;';
        case actionTypes.MULTIPLY:
            return '&#215;';
        default:
            return '';
    }
}

export const isTooWideDisplayValue = (displayValueWidth: number, displayWidth: number): boolean =>
    (displayValueWidth + 20) > displayWidth;

export const scaleElementFontSizeAndLineHeight = (element: HTMLElement, size: number): void => {
    element.style.fontSize = `${size}rem`;
}

export const numberButtonKeyCodes: string[] = [
    '.', 'Period', 'NumpadDecimal', '0', 'Numpad0', 'Digit0', '1', 'Numpad1', 'Digit1', '2', 'Numpad2', 'Digit2',
    '3', 'Numpad3', 'Digit3', '4', 'Numpad4', 'Digit4', '5', 'Numpad5', 'Digit5', '6', 'Numpad6', 'Digit6',
    '7', 'Numpad7', 'Digit7', '8', 'Numpad8', 'Digit8', '9', 'Numpad9', 'Digit9',
];

const addKeyCode = 'NumpadAdd'
const subtractKeyCode = 'NumpadSubtract';
const divideKeyCode = 'NumpadDivide';
const multiplyKeyCode = 'NumpadMultiply';

export const actionButtonKeyCodes: string[] = [addKeyCode, divideKeyCode, multiplyKeyCode, subtractKeyCode]

export const getActionTypeFromKeyCode = (keyCode: string) => {
    switch (keyCode) {
        case addKeyCode:
            return actionTypes.ADD;
        case subtractKeyCode:
            return actionTypes.SUBTRACT;
        case divideKeyCode:
            return actionTypes.DIVIDE;
        case multiplyKeyCode:
            return actionTypes.MULTIPLY;
        default:
            return actionTypes.UNKNOWN;
    }
}