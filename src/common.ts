import { Operator } from './operator';
import { OperatorMap } from './operatorMap';
import { Expression } from './ts';

export const isOperator = (op: unknown): op is Operator =>
  typeof op === 'string' && OperatorMap[op] === 1;

const { isArray } = Array;

export const isExpression = (exp: unknown): exp is Expression =>
  isArray(exp) && exp.length >= 2 && isOperator(exp[0]);

// tslint:disable-next-line typedef
export const thunk = (x: any) => () => x;
