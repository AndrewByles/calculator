import { describe, it, expect } from 'vitest';
import {add, subtract, divide, multiply, doMath, negate, percentage, squareRoot, square, isNanOrInfinity} from './math';
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

    it('should negate a number correctly', () => {
        expect(negate(5)).toBe(-5);
        expect(negate(-5)).toBe(5);
    });

    it('should calculate percentage correctly', () => {
        expect(percentage(50)).toBe(0.5);
    });

    it('should calculate square root correctly', () => {
        expect(squareRoot(9)).toBe(3);
    });

    it('should calculate square correctly', () => {
        expect(square(3)).toBe(9);
    });

    it('should return true for NaN', () => {
        expect(isNanOrInfinity(NaN)).toBe(true);
    });

    it('should return true for Infinity', () => {
        expect(isNanOrInfinity(Infinity)).toBe(true);
    });

    it('should return true for -Infinity', () => {
        expect(isNanOrInfinity(-Infinity)).toBe(true);
    });

    it('should return false for finite numbers', () => {
        expect(isNanOrInfinity(0)).toBe(false);
        expect(isNanOrInfinity(1)).toBe(false);
        expect(isNanOrInfinity(-1)).toBe(false);
        expect(isNanOrInfinity(1.5)).toBe(false);
    });

    it('should return the correct result for doMath function', () => {
        expect(doMath(actionTypes.ADD, 1, 2)).toBe(3);
        expect(doMath(actionTypes.SUBTRACT, 5, 3)).toBe(2);
        expect(doMath(actionTypes.DIVIDE, 6, 2)).toBe(3);
        expect(doMath(actionTypes.MULTIPLY, 3, 4)).toBe(12);
        expect(doMath(actionTypes.NEGATE, 5)).toBe(-5);
        expect(doMath(actionTypes.PERCENTAGE, 50)).toBe(0.5);
        expect(doMath(actionTypes.SQUARE_ROOT, 9)).toBe(3);
        expect(doMath(actionTypes.SQUARE, 3)).toBe(9);
        expect(doMath(actionTypes.UNKNOWN, 3, 4)).toBe(0);
    });
});