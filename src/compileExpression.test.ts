// tslint:disable no-console
import { compileExpression } from './compileExpression';
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

test('compileExpression', () => {
  expect(compileExpression([Add, 1, 2])({})).toBe(3);
  expect(compileExpression([Add, 2, 1])({})).toBe(3);
  expect(compileExpression([Add, 2, 1, 4] as any)({})).toBe(3);
  expect(compileExpression([Add, 2] as any)({})).toBe(NaN);
  expect(compileExpression([Add, 2, ''] as any)({})).toBe(NaN);
});

test.skip('benchmark', () => {
  const t1 = Date.now();
  const exp = [And, false, [In, '$a', ['b', 'c']]];
  for (let i = 0; i < 1000000; i += 1) {
    compileExpression(exp as any)(null as any);
  }
  const t2 = Date.now();
  const parsed = compileExpression(exp as any);
  for (let i = 0; i < 1000000; i += 1) {
    parsed(null as any);
  }
  const t3 = Date.now();
  console.log(t3 - t2, t2 - t1, (t2 - t1) / (t3 - t2));
});

test('Equal', () => {
  expect(compileExpression([Equal, 1, 1])({})).toBe(true);
  expect(compileExpression(['==' as any, 1, 1])({})).toBe(true);
  expect(compileExpression([Equal, 1, 2])({})).toBe(false);
  expect(compileExpression([Equal, 1, '1'])({})).toBe(false);
});

test('NotEqual', () => {
  expect(compileExpression([NotEqual, 1, 1])({})).toBe(false);
  expect(compileExpression([NotEqual, 1, 2])({})).toBe(true);
  expect(compileExpression([NotEqual, 1, '1'])({})).toBe(true);
});

test('GreaterThan', () => {
  expect(compileExpression([GreaterThan, 1, 1])({})).toBe(false);
  expect(compileExpression([GreaterThan, 1, 2])({})).toBe(false);
  expect(compileExpression([GreaterThan, 2, 1])({})).toBe(true);
  expect(compileExpression([GreaterThan, 1, '1'])({})).toBe(false);
});

test('GreaterThanOrEqual', () => {
  expect(compileExpression([GreaterThanOrEqual, 1, 1])({})).toBe(true);
  expect(compileExpression([GreaterThanOrEqual, 1, 2])({})).toBe(false);
  expect(compileExpression([GreaterThanOrEqual, 2, 1])({})).toBe(true);
  expect(compileExpression([GreaterThanOrEqual, 1, '1'])({})).toBe(false);
});

test('LessThan', () => {
  expect(compileExpression([LessThan, 1, 1])({})).toBe(false);
  expect(compileExpression([LessThan, 1, 2])({})).toBe(true);
  expect(compileExpression([LessThan, 2, 1])({})).toBe(false);
  expect(compileExpression([LessThan, 1, '1'])({})).toBe(false);
});

test('LessThanOrEqual', () => {
  expect(compileExpression([LessThanOrEqual, 1, 1])({})).toBe(true);
  expect(compileExpression([LessThanOrEqual, 1, 2])({})).toBe(true);
  expect(compileExpression([LessThanOrEqual, 2, 1])({})).toBe(false);
  expect(compileExpression([LessThanOrEqual, 1, '1'])({})).toBe(false);
});

test('Subtract', () => {
  expect(compileExpression([Subtract, 1, 1])({})).toBe(0);
  expect(compileExpression([Subtract, 1, 2])({})).toBe(-1);
  expect(compileExpression([Subtract, 2, 1])({})).toBe(1);
  expect(compileExpression([Subtract, 1, '1'])({})).toBe(NaN);
});

test('Multiply', () => {
  expect(compileExpression([Multiply, 1, 1])({})).toBe(1);
  expect(compileExpression([Multiply, 1, 2])({})).toBe(2);
  expect(compileExpression([Multiply, 2, 1])({})).toBe(2);
  expect(compileExpression([Multiply, 1, '1'])({})).toBe(NaN);
});

test('Divide', () => {
  expect(compileExpression([Divide, 1, 1])({})).toBe(1);
  expect(compileExpression([Divide, 1, 2])({})).toBe(1 / 2);
  expect(compileExpression([Divide, 2, 1])({})).toBe(2);
  expect(compileExpression([Divide, 1, '1'])({})).toBe(NaN);
});

test('Modulo', () => {
  expect(compileExpression([Modulo, 1, 1])({})).toBe(0);
  expect(compileExpression([Modulo, 1, 2])({})).toBe(1);
  expect(compileExpression([Modulo, 2, 1])({})).toBe(0);
  expect(compileExpression([Modulo, 1, '1'])({})).toBe(NaN);
});

test('Not', () => {
  expect(compileExpression([Not, 1])({})).toBe(false);
  expect(compileExpression([Not, true])({})).toBe(false);
  expect(compileExpression([Not, 0])({})).toBe(true);
  expect(compileExpression([Not, false])({})).toBe(true);
});

test('And', () => {
  expect(compileExpression([And, 1])({})).toBe(true);
  expect(compileExpression([And, true])({})).toBe(true);
  expect(compileExpression([And, 0])({})).toBe(false);
  expect(compileExpression([And, false])({})).toBe(false);
  expect(compileExpression([And, 1, 1])({})).toBe(true);
  expect(compileExpression([And, 1, 0])({})).toBe(false);
  expect(compileExpression([And, 0, 1])({})).toBe(false);
  expect(compileExpression([And, 0, 0])({})).toBe(false);
  expect(compileExpression([And, 1, 1, 1])({})).toBe(true);
  expect(compileExpression([And, 1, 1, 0])({})).toBe(false);
  expect(compileExpression([And, 1, 0, 0])({})).toBe(false);
  expect(compileExpression([And, 0, 0, 0])({})).toBe(false);
});

test('Or', () => {
  expect(compileExpression([Or, 1])({})).toBe(true);
  expect(compileExpression([Or, true])({})).toBe(true);
  expect(compileExpression([Or, 0])({})).toBe(false);
  expect(compileExpression([Or, false])({})).toBe(false);
  expect(compileExpression([Or, 1, 1])({})).toBe(true);
  expect(compileExpression([Or, 1, 0])({})).toBe(true);
  expect(compileExpression([Or, 0, 1])({})).toBe(true);
  expect(compileExpression([Or, 0, 0])({})).toBe(false);
  expect(compileExpression([Or, 1, 1, 1])({})).toBe(true);
  expect(compileExpression([Or, 1, 1, 0])({})).toBe(true);
  expect(compileExpression([Or, 1, 0, 0])({})).toBe(true);
  expect(compileExpression([Or, 0, 0, 0])({})).toBe(false);
});

test('IfThenElse', () => {
  expect(compileExpression([IfThenElse, 1, 2, 3])({})).toBe(2);
  expect(compileExpression([IfThenElse, 0, 2, 3])({})).toBe(3);
});

test('In', () => {
  expect(compileExpression([In, 1, [2, 3]])({})).toBe(false);
  expect(compileExpression([In, 1, [1, 2, 3]])({})).toBe(true);
  expect(compileExpression([In, 1, [2, 3, 1]])({})).toBe(true);
  expect(compileExpression([In, 2, [2, 3, 1]])({})).toBe(true);
  expect(compileExpression([In, 3, [2, 3, 1]])({})).toBe(true);
  expect(compileExpression([In, 4, [2, 3, 1]])({})).toBe(false);
});

test('NotIn', () => {
  expect(compileExpression([NotIn, 1, [2, 3]])({})).toBe(true);
  expect(compileExpression([NotIn, 1, [1, 2, 3]])({})).toBe(false);
  expect(compileExpression([NotIn, 1, [2, 3, 1]])({})).toBe(false);
  expect(compileExpression([NotIn, 2, [2, 3, 1]])({})).toBe(false);
  expect(compileExpression([NotIn, 3, [2, 3, 1]])({})).toBe(false);
  expect(compileExpression([NotIn, 4, [2, 3, 1]])({})).toBe(true);
});

test('Recursive Expression', () => {
  expect(compileExpression([And, true, [Not, true]])({})).toBe(false);
  expect(compileExpression([And, true, [Not, false]])({})).toBe(true);
  expect(compileExpression([And, [Not, true], [Not, false]])({})).toBe(false);
  expect(compileExpression([And, [Not, [Not, true]], [Not, false]])({})).toBe(
    true
  );
  expect(
    compileExpression([And, [Not, [Not, [Not, true]]], [Not, false]])({})
  ).toBe(false);
});

test('context', () => {
  expect(compileExpression([In, 'a', ['b', 'c']])({})).toBe(false);
  expect(compileExpression([In, '$a', ['b', 'c']])({})).toBe(false);
  expect(compileExpression([In, '$a', ['b', 'c']])({ a: 'a' })).toBe(false);
  expect(compileExpression([In, '$a', ['b', 'c']])({ a: 'b' })).toBe(true);
  expect(compileExpression([In, '$a', ['b', 'c']])({ a: 'c' })).toBe(true);
  expect(compileExpression([In, '$a', ['b', 'c']])({ a: 'd' })).toBe(false);
  expect(compileExpression([In, '$a', ['$b', 'c']])({ a: 'd', b: 'd' })).toBe(
    true
  );
});

test('escape $', () => {
  expect(compileExpression([IfThenElse, 1, '\\$a', null])({})).toBe('$a');
});

test('complex', () => {
  expect(
    compileExpression([
      IfThenElse, // same as '?:'
      [In, 'admin', '$roles'], // test if "admin" is in "roles" context variable
      [Not, '$postDeleted'], // true if context variable "postDeleted" is false
      '$unauthorized', // context variable "unauthorized"
    ])({
      postDeleted: false,
      roles: ['user', 'admin'],
      unauthorized: 'Unauthorized Error',
    })
  ).toBe(true);

  expect(
    compileExpression([
      '?:', // same as IfThenElse
      ['In', 'admin', '$roles'], // test if "admin" is in "roles" context variable
      ['!', '$postDeleted'], // true if context variable "postDeleted" is false
      '$unauthorized', // context variable "unauthorized"
    ])({
      postDeleted: true,
      roles: ['user', 'admin'],
      unauthorized: 'Unauthorized Error',
    })
  ).toBe(false);

  expect(
    compileExpression([
      IfThenElse, // same as '?:'
      [In, 'admin', '$roles'], // test if "admin" is in "roles" context variable
      [Not, '$postDeleted'], // true if context variable "postDeleted" is false
      '$unauthorized', // context variable "unauthorized"
    ])({
      postDeleted: false,
      roles: ['user', 'guest'],
      unauthorized: 'Unauthorized Error',
    })
  ).toBe('Unauthorized Error');
});
