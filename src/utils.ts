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