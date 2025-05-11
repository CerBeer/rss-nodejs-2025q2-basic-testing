// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 6,
      b: 3,
      action: Action.Add,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(9);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 6,
      b: 3,
      action: Action.Subtract,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 6,
      b: 3,
      action: Action.Multiply,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(18);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 6,
      b: 3,
      action: Action.Divide,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 6,
      b: 3,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(input);
    expect(result).toBe(216);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 6,
      b: 3,
      action: 'e',
    };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 6,
      b: '0',
      action: Action.Divide,
    };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });
});
