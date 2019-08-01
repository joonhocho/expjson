// tslint:disable no-console
import { evaluateExpression } from './evaluateExpression';
import {
  Add,
  And,
  Divide,
  Equal,
  GreaterThan,
  GreaterThanOrEqual,
  IfThenElse,
  In,
  LessThan,
  LessThanOrEqual,
  Modulo,
  Multiply,
  Not,
  NotEqual,
  NotIn,
  Or,
  Subtract,
} from './operator';

test('evaluateExpression', () => {
  expect(evaluateExpression([Add, 1, 2], {})).toBe(3);
  expect(evaluateExpression([Add, 2, 1], {})).toBe(3);
  expect(evaluateExpression([Add, 2, 1, 4] as any, {})).toBe(3);
  expect(evaluateExpression([Add, 2] as any, {})).toBe(NaN);
  expect(evaluateExpression([Add, 2, ''] as any, {})).toBe(NaN);
});

test.skip('benchmark', () => {
  const t1 = Date.now();
  const exp = [And, false, [In, '$a', ['b', 'c']]];
  for (let i = 0; i < 1000000; i += 1) {
    evaluateExpression(exp as any, null as any);
  }
  const t2 = Date.now();
  console.log(t2 - t1);
});

test('Equal', () => {
  expect(evaluateExpression([Equal, 1, 1], {})).toBe(true);
  expect(evaluateExpression(['==' as any, 1, 1], {})).toBe(true);
  expect(evaluateExpression([Equal, 1, 2], {})).toBe(false);
  expect(evaluateExpression([Equal, 1, '1'], {})).toBe(false);
});

test('NotEqual', () => {
  expect(evaluateExpression([NotEqual, 1, 1], {})).toBe(false);
  expect(evaluateExpression([NotEqual, 1, 2], {})).toBe(true);
  expect(evaluateExpression([NotEqual, 1, '1'], {})).toBe(true);
});

test('GreaterThan', () => {
  expect(evaluateExpression([GreaterThan, 1, 1], {})).toBe(false);
  expect(evaluateExpression([GreaterThan, 1, 2], {})).toBe(false);
  expect(evaluateExpression([GreaterThan, 2, 1], {})).toBe(true);
  expect(evaluateExpression([GreaterThan, 1, '1'], {})).toBe(false);
});

test('GreaterThanOrEqual', () => {
  expect(evaluateExpression([GreaterThanOrEqual, 1, 1], {})).toBe(true);
  expect(evaluateExpression([GreaterThanOrEqual, 1, 2], {})).toBe(false);
  expect(evaluateExpression([GreaterThanOrEqual, 2, 1], {})).toBe(true);
  expect(evaluateExpression([GreaterThanOrEqual, 1, '1'], {})).toBe(false);
});

test('LessThan', () => {
  expect(evaluateExpression([LessThan, 1, 1], {})).toBe(false);
  expect(evaluateExpression([LessThan, 1, 2], {})).toBe(true);
  expect(evaluateExpression([LessThan, 2, 1], {})).toBe(false);
  expect(evaluateExpression([LessThan, 1, '1'], {})).toBe(false);
});

test('LessThanOrEqual', () => {
  expect(evaluateExpression([LessThanOrEqual, 1, 1], {})).toBe(true);
  expect(evaluateExpression([LessThanOrEqual, 1, 2], {})).toBe(true);
  expect(evaluateExpression([LessThanOrEqual, 2, 1], {})).toBe(false);
  expect(evaluateExpression([LessThanOrEqual, 1, '1'], {})).toBe(false);
});

test('Subtract', () => {
  expect(evaluateExpression([Subtract, 1, 1], {})).toBe(0);
  expect(evaluateExpression([Subtract, 1, 2], {})).toBe(-1);
  expect(evaluateExpression([Subtract, 2, 1], {})).toBe(1);
  expect(evaluateExpression([Subtract, 1, '1'], {})).toBe(NaN);
});

test('Multiply', () => {
  expect(evaluateExpression([Multiply, 1, 1], {})).toBe(1);
  expect(evaluateExpression([Multiply, 1, 2], {})).toBe(2);
  expect(evaluateExpression([Multiply, 2, 1], {})).toBe(2);
  expect(evaluateExpression([Multiply, 1, '1'], {})).toBe(NaN);
});

test('Divide', () => {
  expect(evaluateExpression([Divide, 1, 1], {})).toBe(1);
  expect(evaluateExpression([Divide, 1, 2], {})).toBe(1 / 2);
  expect(evaluateExpression([Divide, 2, 1], {})).toBe(2);
  expect(evaluateExpression([Divide, 1, '1'], {})).toBe(NaN);
});

test('Modulo', () => {
  expect(evaluateExpression([Modulo, 1, 1], {})).toBe(0);
  expect(evaluateExpression([Modulo, 1, 2], {})).toBe(1);
  expect(evaluateExpression([Modulo, 2, 1], {})).toBe(0);
  expect(evaluateExpression([Modulo, 1, '1'], {})).toBe(NaN);
});

test('Not', () => {
  expect(evaluateExpression([Not, 1], {})).toBe(false);
  expect(evaluateExpression([Not, true], {})).toBe(false);
  expect(evaluateExpression([Not, 0], {})).toBe(true);
  expect(evaluateExpression([Not, false], {})).toBe(true);
});

test('And', () => {
  expect(evaluateExpression([And, 1], {})).toBe(true);
  expect(evaluateExpression([And, true], {})).toBe(true);
  expect(evaluateExpression([And, 0], {})).toBe(false);
  expect(evaluateExpression([And, false], {})).toBe(false);
  expect(evaluateExpression([And, 1, 1], {})).toBe(true);
  expect(evaluateExpression([And, 1, 0], {})).toBe(false);
  expect(evaluateExpression([And, 0, 1], {})).toBe(false);
  expect(evaluateExpression([And, 0, 0], {})).toBe(false);
  expect(evaluateExpression([And, 1, 1, 1], {})).toBe(true);
  expect(evaluateExpression([And, 1, 1, 0], {})).toBe(false);
  expect(evaluateExpression([And, 1, 0, 0], {})).toBe(false);
  expect(evaluateExpression([And, 0, 0, 0], {})).toBe(false);
});

test('Or', () => {
  expect(evaluateExpression([Or, 1], {})).toBe(true);
  expect(evaluateExpression([Or, true], {})).toBe(true);
  expect(evaluateExpression([Or, 0], {})).toBe(false);
  expect(evaluateExpression([Or, false], {})).toBe(false);
  expect(evaluateExpression([Or, 1, 1], {})).toBe(true);
  expect(evaluateExpression([Or, 1, 0], {})).toBe(true);
  expect(evaluateExpression([Or, 0, 1], {})).toBe(true);
  expect(evaluateExpression([Or, 0, 0], {})).toBe(false);
  expect(evaluateExpression([Or, 1, 1, 1], {})).toBe(true);
  expect(evaluateExpression([Or, 1, 1, 0], {})).toBe(true);
  expect(evaluateExpression([Or, 1, 0, 0], {})).toBe(true);
  expect(evaluateExpression([Or, 0, 0, 0], {})).toBe(false);
});

test('IfThenElse', () => {
  expect(evaluateExpression([IfThenElse, 1, 2, 3], {})).toBe(2);
  expect(evaluateExpression([IfThenElse, 0, 2, 3], {})).toBe(3);
});

test('In', () => {
  expect(evaluateExpression([In, 1, [2, 3]], {})).toBe(false);
  expect(evaluateExpression([In, 1, [1, 2, 3]], {})).toBe(true);
  expect(evaluateExpression([In, 1, [2, 3, 1]], {})).toBe(true);
  expect(evaluateExpression([In, 2, [2, 3, 1]], {})).toBe(true);
  expect(evaluateExpression([In, 3, [2, 3, 1]], {})).toBe(true);
  expect(evaluateExpression([In, 4, [2, 3, 1]], {})).toBe(false);
});

test('NotIn', () => {
  expect(evaluateExpression([NotIn, 1, [2, 3]], {})).toBe(true);
  expect(evaluateExpression([NotIn, 1, [1, 2, 3]], {})).toBe(false);
  expect(evaluateExpression([NotIn, 1, [2, 3, 1]], {})).toBe(false);
  expect(evaluateExpression([NotIn, 2, [2, 3, 1]], {})).toBe(false);
  expect(evaluateExpression([NotIn, 3, [2, 3, 1]], {})).toBe(false);
  expect(evaluateExpression([NotIn, 4, [2, 3, 1]], {})).toBe(true);
});

test('Recursive Expression', () => {
  expect(evaluateExpression([And, true, [Not, true]], {})).toBe(false);
  expect(evaluateExpression([And, true, [Not, false]], {})).toBe(true);
  expect(evaluateExpression([And, [Not, true], [Not, false]], {})).toBe(false);
  expect(evaluateExpression([And, [Not, [Not, true]], [Not, false]], {})).toBe(
    true
  );
  expect(
    evaluateExpression([And, [Not, [Not, [Not, true]]], [Not, false]], {})
  ).toBe(false);
});

test('context', () => {
  expect(evaluateExpression([In, 'a', ['b', 'c']], {})).toBe(false);
  expect(evaluateExpression([In, '$a', ['b', 'c']], {})).toBe(false);
  expect(evaluateExpression([In, '$a', ['b', 'c']], { a: 'a' })).toBe(false);
  expect(evaluateExpression([In, '$a', ['b', 'c']], { a: 'b' })).toBe(true);
  expect(evaluateExpression([In, '$a', ['b', 'c']], { a: 'c' })).toBe(true);
  expect(evaluateExpression([In, '$a', ['b', 'c']], { a: 'd' })).toBe(false);
  expect(evaluateExpression([In, '$a', ['$b', 'c']], { a: 'd', b: 'd' })).toBe(
    true
  );
});

test('escape $', () => {
  expect(evaluateExpression([IfThenElse, 1, '\\$a', null], {})).toBe('$a');
});

test('complex', () => {
  expect(
    evaluateExpression(
      [
        IfThenElse, // same as '?:'
        [In, 'admin', '$roles'], // test if "admin" is in "roles" context variable
        [Not, '$postDeleted'], // true if context variable "postDeleted" is false
        '$unauthorized', // context variable "unauthorized"
      ],
      {
        postDeleted: false,
        roles: ['user', 'admin'],
        unauthorized: 'Unauthorized Error',
      }
    )
  ).toBe(true);

  expect(
    evaluateExpression(
      [
        '?:', // same as IfThenElse
        ['In', 'admin', '$roles'], // test if "admin" is in "roles" context variable
        ['!', '$postDeleted'], // true if context variable "postDeleted" is false
        '$unauthorized', // context variable "unauthorized"
      ],
      {
        postDeleted: true,
        roles: ['user', 'admin'],
        unauthorized: 'Unauthorized Error',
      }
    )
  ).toBe(false);

  expect(
    evaluateExpression(
      [
        IfThenElse, // same as '?:'
        [In, 'admin', '$roles'], // test if "admin" is in "roles" context variable
        [Not, '$postDeleted'], // true if context variable "postDeleted" is false
        '$unauthorized', // context variable "unauthorized"
      ],
      {
        postDeleted: false,
        roles: ['user', 'guest'],
        unauthorized: 'Unauthorized Error',
      }
    )
  ).toBe('Unauthorized Error');
});
