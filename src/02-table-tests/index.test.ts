// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 6, b: 3, action: Action.Add, expected: 9 },
  { a: 6, b: 3, action: Action.Subtract, expected: 3 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },
  { a: 6, b: 3, action: Action.Exponentiate, expected: 216 },
  { a: 6, b: 3, action: 'e', expected: null },
  { a: 6, b: '3', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'correctly perform the operation with the parameters of the %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
