import * as Operators from './operator';

export type OperatorName = keyof typeof Operators;

export type Operator = (typeof Operators)[OperatorName];

export const OperatorToName: {
  '==': 'Equal';
  '!=': 'NotEqual';
  '>': 'GreaterThan';
  '>=': 'GreaterThanOrEqual';
  '<': 'LessThan';
  '<=': 'LessThanOrEqual';
  // Arithmetic
  '+': 'Add';
  '-': 'Subtract';
  '*': 'Multiply';
  '/': 'Divide';
  '%': 'Modulo';
  // Logical
  '!': 'Not';
  '&&': 'And';
  '||': 'Or';
  // Conditional
  '?:': 'IfThenElse';
  // Set
  In: 'In';
  '!In': 'NotIn';
} = {} as any;

Object.keys(Operators).forEach((name: any) => {
  (OperatorToName as any)[(Operators as any)[name]] = name;
});
