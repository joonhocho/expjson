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
import { compileExpression, evaluateExpression, IfThenElse, In, Not } from 'expjson';


evaluateExpression(
  // expression to evaluate
  [
    IfThenElse, // same as '?:'
    [In, 'admin', '$roles'], // test if "admin" is in "roles" context variable
    [Not, '$postDeleted'], // true if context variable "postDeleted" is false
    '$unauthorized', // context variable "unauthorized"
  ],
  // execution context
  {
    postDeleted: false,
    roles: ['user', 'admin'],
    unauthorized: 'Unauthorized Error',
  }
) === true


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
) === false


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
) === 'Unauthorized Error'


const compiled1 = compileExpression([
  IfThenElse, // same as '?:'
  [In, 'admin', '$roles'], // test if "admin" is in "roles" context variable
  [Not, '$postDeleted'], // true if context variable "postDeleted" is false
  '$unauthorized', // context variable "unauthorized"
]);

compiled1({
  postDeleted: false,
  roles: ['user', 'admin'],
  unauthorized: 'Unauthorized Error',
}) === true


const compiled2 = compileExpression([
  '?:', // same as IfThenElse
  ['In', 'admin', '$roles'], // test if "admin" is in "roles" context variable
  ['!', '$postDeleted'], // true if context variable "postDeleted" is false
  '$unauthorized', // context variable "unauthorized"
]);

compiled2({
  postDeleted: true,
  roles: ['user', 'admin'],
  unauthorized: 'Unauthorized Error',
}) === false


const compiled3 = compileExpression([
  IfThenElse, // same as '?:'
  [In, 'admin', '$roles'], // test if "admin" is in "roles" context variable
  [Not, '$postDeleted'], // true if context variable "postDeleted" is false
  '$unauthorized', // context variable "unauthorized"
]);

compiled3({
  postDeleted: false,
  roles: ['user', 'guest'],
  unauthorized: 'Unauthorized Error',
}) === 'Unauthorized Error'
```

## License
[MIT License](https://github.com/joonhocho/expjson/blob/master/LICENSE)
