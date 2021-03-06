// tslint:disable no-console
import { compileExpression } from './compileExpression';
import { Add } from './operators/Add';
import { And } from './operators/And';
import { Divide } from './operators/Divide';
import { Equal } from './operators/Equal';
import { GreaterThan } from './operators/GreaterThan';
import { GreaterThanOrEqual } from './operators/GreaterThanOrEqual';
import { IfThenElse } from './operators/IfThenElse';
import { In } from './operators/In';
import { LessThan } from './operators/LessThan';
import { LessThanOrEqual } from './operators/LessThanOrEqual';
import { Modulo } from './operators/Modulo';
import { Multiply } from './operators/Multiply';
import { Not } from './operators/Not';
import { NotEqual } from './operators/NotEqual';
import { NotIn } from './operators/NotIn';
import { Or } from './operators/Or';
import { Subtract } from './operators/Subtract';
import { Var } from './operators/Var';

test('compileExpression', () => {
  expect(compileExpression([Add, 1, 2])({})).toBe(3);
  expect(compileExpression([Add, 2, 1])({})).toBe(3);
  expect(compileExpression([Add, 2, 1, 4])({})).toBe(7);
  expect(compileExpression([Add] as any)({})).toBe(NaN);
  expect(compileExpression([Add, 2] as any)({})).toBe(2);
  expect(compileExpression([Add, 2, ''] as any)({})).toBe(NaN);
});

test.skip('benchmark', () => {
  const t1 = Date.now();
  const exp = [And, false, [In, [Var, 'a'], ['b', 'c']]];
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

test.skip('benchmark vs code', () => {
  const exp = compileExpression([Not, [In, [Var, 'value'], ['a', 'b']]]);
  let r1 = null;
  let r2 = null;
  const value = 'c' as string;
  const n = 1000000;

  const t1 = Date.now();
  for (let i = 0; i < n; i += 1) {
    r1 = exp({ value }) as any;
  }

  const t2 = Date.now();
  for (let i = 0; i < n; i += 1) {
    r2 = !(value === 'a' || value === 'b');
  }
  const t3 = Date.now();
  console.log(
    'b',
    `${(t2 - t1) / n}ms`,
    `${(t3 - t2) / n}ms`,
    (t2 - t1) / (t3 - t2),
    r1,
    r2
  );
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
  expect(compileExpression([Subtract, 2, 1, 3])({})).toBe(-2);
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
  expect(compileExpression([And, 1] as any)({})).toBe(true);
  expect(compileExpression([And, true] as any)({})).toBe(true);
  expect(compileExpression([And, 0] as any)({})).toBe(false);
  expect(compileExpression([And, false] as any)({})).toBe(false);
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
  expect(compileExpression([Or, 1] as any)({})).toBe(true);
  expect(compileExpression([Or, true] as any)({})).toBe(true);
  expect(compileExpression([Or, 0] as any)({})).toBe(false);
  expect(compileExpression([Or, false] as any)({})).toBe(false);
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
  expect(compileExpression([In, [Var, 'a'], ['b', 'c']])({})).toBe(false);
  expect(compileExpression([In, [Var, 'a'], ['b', 'c']])({ a: 'a' })).toBe(
    false
  );
  expect(compileExpression([In, [Var, 'a'], ['b', 'c']])({ a: 'b' })).toBe(
    true
  );
  expect(compileExpression([In, [Var, 'a'], ['b', 'c']])({ a: 'c' })).toBe(
    true
  );
  expect(compileExpression([In, [Var, 'a'], ['b', 'c']])({ a: 'd' })).toBe(
    false
  );
  expect(
    compileExpression([In, [Var, 'a'], [[Var, 'b'], 'c']])({ a: 'd', b: 'd' })
  ).toBe(true);
});

test('escape $', () => {
  expect(compileExpression([IfThenElse, 1, '$a', null])({})).toBe('$a');
});

test('complex', () => {
  const compiled1 = compileExpression([
    IfThenElse, // same as '?:'
    [In, 'admin', [Var, 'roles']], // test if "admin" is in "roles" context variable
    [Not, [Var, 'postDeleted']], // true if context variable "postDeleted" is false
    [Var, 'unauthorized'], // context variable "unauthorized"
  ]);

  expect(
    compiled1({
      postDeleted: false,
      roles: ['user', 'admin'],
      unauthorized: 'Unauthorized Error',
    })
  ).toBe(true);

  const compiled2 = compileExpression([
    '?:', // same as IfThenElse
    ['In', 'admin', [Var, 'roles']], // test if "admin" is in "roles" context variable
    ['!', [Var, 'postDeleted']], // true if context variable "postDeleted" is false
    [Var, 'unauthorized'], // context variable "unauthorized"
  ]);
  expect(
    compiled2({
      postDeleted: true,
      roles: ['user', 'admin'],
      unauthorized: 'Unauthorized Error',
    })
  ).toBe(false);

  const compiled3 = compileExpression([
    IfThenElse, // same as '?:'
    [In, 'admin', [Var, 'roles']], // test if "admin" is in "roles" context variable
    [Not, [Var, 'postDeleted']], // true if context variable "postDeleted" is false
    [Var, 'unauthorized'], // context variable "unauthorized"
  ]);
  expect(
    compiled3({
      postDeleted: false,
      roles: ['user', 'guest'],
      unauthorized: 'Unauthorized Error',
    })
  ).toBe('Unauthorized Error');

  expect(
    compileExpression([Var, 'post', 'user', 'deleted'])({
      post: { user: { deleted: true } },
    })
  ).toBe(true);

  expect(compileExpression([Var, 'post', 'user', 'deleted'])({})).toBe(null);
});
