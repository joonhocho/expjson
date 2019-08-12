import { compileExpression } from '_src/compileExpression';
import { evaluateExpression } from '_src/evaluateExpression';
import { Expression } from '_src/ts';
import { BitwiseOr } from './BitwiseOr';

test('BitwiseOr evaluate', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(evaluateExpression(exp, context)).toBe(expected);

  runTest([BitwiseOr, 1, 1], {}, 1);
  runTest([BitwiseOr, 1, 2], {}, 3);
  runTest([BitwiseOr, 2, 1], {}, 3);
  runTest([BitwiseOr, 3, 1], {}, 3);
  runTest([BitwiseOr, 1, '1'], {}, NaN);
});

test('BitwiseOr compile', () => {
  const runTest = (exp: Expression, context: any, expected: any): any =>
    expect(compileExpression(exp)(context)).toBe(expected);

  runTest([BitwiseOr, 1, 1], {}, 1);
  runTest([BitwiseOr, 1, 2], {}, 3);
  runTest([BitwiseOr, 2, 1], {}, 3);
  runTest([BitwiseOr, 3, 1], {}, 3);
  runTest([BitwiseOr, 1, '1'], {}, NaN);
});
