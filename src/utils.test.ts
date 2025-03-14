import { describe, it, expect } from 'vitest';
import { getOperationSymbol } from './utils';
import { actionTypes } from './button-types';

describe('getOperationSymbol', () => {
    it('should return "+" for ADD action type', () => {
        expect(getOperationSymbol(actionTypes.ADD)).toBe('&#43;');
    });

    it('should return "−" for SUBTRACT action type', () => {
        expect(getOperationSymbol(actionTypes.SUBTRACT)).toBe('&#8722;');
    });

    it('should return "÷" for DIVIDE action type', () => {
        expect(getOperationSymbol(actionTypes.DIVIDE)).toBe('&#247;');
    });

    it('should return "×" for MULTIPLY action type', () => {
        expect(getOperationSymbol(actionTypes.MULTIPLY)).toBe('&#215;');
    });

    it('should return an empty string for unknown action type', () => {
        expect(getOperationSymbol(actionTypes.UNKNOWN)).toBe('');
    });
});