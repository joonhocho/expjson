# expjson
Super lightweight, fast, and optimized evaluate-able and compilable expressions in JSON written in TypeScript

[![npm version](https://badge.fury.io/js/expjson.svg)](https://badge.fury.io/js/expjson)
[![npm](https://img.shields.io/npm/dw/expjson.svg)](https://www.npmjs.com/package/expjson)
![npm type definitions](https://img.shields.io/npm/types/expjson.svg)
[![Build Status](https://travis-ci.org/joonhocho/expjson.svg?branch=master)](https://travis-ci.org/joonhocho/expjson)
[![Dependency Status](https://david-dm.org/joonhocho/expjson.svg)](https://david-dm.org/joonhocho/expjson)
[![GitHub](https://img.shields.io/github/license/joonhocho/expjson.svg)](https://github.com/joonhocho/expjson/blob/master/LICENSE)

## Get Started
```
npm install -D expjson
```
or
```
yarn add -D expjson
```

## How to Use
`compileExpression` and running it later is much faster if compiled expression is evaluated multiple times on many execution contexts.

`evaluateExpression` is faster if the expression is evaluated only once.

functionalities are exactly same for both.

```typescript
import {
  compileExpression,
  evaluateExpression,
  // operators
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
  Var,
} from 'expjson';

// evaluateExpression: evaluate without compile
expect(
  evaluateExpression(
    [
      IfThenElse, // same as '?:'
      [In, 'admin', [Var, 'roles']], // test if "admin" is in "roles" context variable
      [Not, [Var, 'postDeleted']], // true if context variable "postDeleted" is false
      [Var, 'unauthorized'], // context variable "unauthorized"
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
      ['In', 'admin', [Var, 'roles']], // test if "admin" is in "roles" context variable
      ['!', [Var, 'postDeleted']], // true if context variable "postDeleted" is false
      [Var, 'unauthorized'], // context variable "unauthorized"
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
      [In, 'admin', [Var, 'roles']], // test if "admin" is in "roles" context variable
      [Not, [Var, 'postDeleted']], // true if context variable "postDeleted" is false
      [Var, 'unauthorized'], // context variable "unauthorized"
    ],
    {
      postDeleted: false,
      roles: ['user', 'guest'],
      unauthorized: 'Unauthorized Error',
    }
  )
).toBe('Unauthorized Error');

// compileExpression: compile then evaluate
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
```

## License
[MIT License](https://github.com/joonhocho/expjson/blob/master/LICENSE)
