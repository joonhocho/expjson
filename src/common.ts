import { Operator, OperatorToName } from './operatorMap';
import { Expression } from './ts';

export const isOperator = (op: unknown): op is Operator =>
  typeof op === 'string' && OperatorToName.hasOwnProperty(op);

export const isExpression = (exp: unknown): exp is Expression =>
  Array.isArray(exp) && isOperator(exp[0]);
