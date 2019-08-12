import { isExpression } from './common';
import { evaluators } from './operatorMap';
import './operators';
import { ExecutionContext, Expression } from './ts';

export const evaluateOperand = (
  operand: unknown,
  context: ExecutionContext
): unknown =>
  isExpression(operand) ? evaluateExpression(operand, context) : operand;

export const evaluateExpression = <
  Context extends ExecutionContext = ExecutionContext
>(
  exp: Expression,
  context: Context
): unknown => evaluators[exp[0]](exp, context);
