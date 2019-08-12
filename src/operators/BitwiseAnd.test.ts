import { compileExpression } from '_src/compileExpression';
import { evaluateExpression } from '_src/evaluateExpression';
import { Expression } from '_src/ts';
import { BitwiseAnd } from './BitwiseAnd';

test('BitwiseAnd evaluate', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(evaluateExpression(exp, context)).toBe(expected);

  runTest([BitwiseAnd, 1, 1], {}, 1);
  runTest([BitwiseAnd, 1, 2], {}, 0);
  runTest([BitwiseAnd, 2, 1], {}, 0);
  runTest([BitwiseAnd, 3, 1], {}, 1);
  runTest([BitwiseAnd, 1, '1'], {}, NaN);
});

test('BitwiseAnd compile', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(compileExpression(exp)(context)).toBe(expected);

  runTest([BitwiseAnd, 1, 1], {}, 1);
  runTest([BitwiseAnd, 1, 2], {}, 0);
  runTest([BitwiseAnd, 2, 1], {}, 0);
  runTest([BitwiseAnd, 3, 1], {}, 1);
  runTest([BitwiseAnd, 1, '1'], {}, NaN);
});
