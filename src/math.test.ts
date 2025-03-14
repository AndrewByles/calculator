import { describe, it, expect } from 'vitest';
import { add, subtract, divide, multiply, doMath } from './math';
import { actionTypes } from './button-types';

describe('Math functions', () => {
    it('should add two numbers correctly', () => {
        expect(add(1, 2)).toBe(3);
    });

    it('should subtract two numbers correctly', () => {
        expect(subtract(5, 3)).toBe(2);
    });

    it('should divide two numbers correctly', () => {
        expect(divide(6, 2)).toBe(3);
    });

    it('should multiply two numbers correctly', () => {
        expect(multiply(3, 4)).toBe(12);
    });

    it('should return the correct result for doMath function', () => {
        expect(doMath(actionTypes.ADD, 1, 2)).toBe(3);
        expect(doMath(actionTypes.SUBTRACT, 5, 3)).toBe(2);
        expect(doMath(actionTypes.DIVIDE, 6, 2)).toBe(3);
        expect(doMath(actionTypes.MULTIPLY, 3, 4)).toBe(12);
        expect(doMath(actionTypes.UNKNOWN, 3, 4)).toBe(0);
    });
});